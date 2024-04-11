'use server'

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export const handleDuesUser = async (amount : number, merchant : {
    id: number; email: string; name: string | null;
}) => {
    
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if(!userId){
        return {
            message : "Error while depositing"
        };
    }
    await prisma.$transaction(async (tx) => {
        const fromUser = await tx.user.findFirst({
            where : {
                id : Number(userId)
            }
        })
        if(!fromUser){
            return;
        }
        if(fromUser && fromUser.balance < amount){
            return {
                message : "Low Balance"
            }
        }
        //account balance updation
        await tx.user.update({
            where : {
                id : Number(userId)
            },
            data : {
                balance : {
                    decrement : amount
                }
            }
        });

        await tx.merchant.update({
            where : {
                id : merchant.id
            },
            data : {
                balance : {
                    increment : amount
                }
            }
        });

        const merch = await tx.merchant.findFirst({
            where : {
                id : merchant.id
            }
        });
        if(!merch){
            return {
                message : "Merchant doesnt exist"
            }
        }
        console.log("before balanceHistory")
        // balanceHistory updation
        await tx.balanceHistoryMerchant.create({
            data : {
                merchantId : merchant.id,
                balance : merch.balance,
                timestamp : new Date()
            }
        })
        await tx.balanceHistory.create({
            data : {
                userId : Number(userId),
                balance : fromUser.balance - amount,
                timestamp : new Date()
            }
        })

        //
        const due = await tx.duesForUser.findFirst({
            where : {
                userId : Number(userId),
                merchantId : merchant.id,
                dueStatus : "Due"
            }
        });
        if(!due){
            console.log("due doenst exist");
            //check for merchant dues for increment
            const duesForMerchant = await tx.duesForMerchant.findFirst({
                where : {
                    userId : Number(userId),
                    merchantId : merch.id,
                    dueStatus : "Due"
                }
            });
            //dues for merchant incremented or paid
            if(duesForMerchant){
                await tx.duesForMerchant.updateMany({
                    where : {
                        userId : Number(userId),
                        merchantId : merch.id
                    },
                    data : {
                        amount : {
                            increment : amount
                        }
                    }
                });
                console.log("incremented");
            }
            else{
                await tx.duesForMerchant.create({
                    data : {
                        userId : Number(userId),
                        merchantId : merch.id,
                        amount : amount
                    }
                })
            }
            return {
                message : "Amount deposited"
            }
        }
        if(due.amount > amount){
            console.log("due amount is greater")
            await tx.duesForUser.updateMany({
                where : {
                    userId : Number(userId),
                    merchantId : merchant.id
                },
                data : {
                    amount : {
                        decrement : amount
                    }
                }
            })
        }
        else if(due.amount == amount){
            await tx.duesForUser.updateMany({
                where : {
                    userId : Number(userId),
                    merchantId : merchant.id
                },
                data : {
                    dueStatus : "Paid"
                }
            });
        }
        else{
            console.log("due amount is lesser");
            const remainingAmount = due.amount - amount;
            //dues for user paid
            await tx.duesForUser.updateMany({
                where : {
                    userId : Number(userId),
                    merchantId : merch.id
                },
                data : {
                    dueStatus : "Paid"
                }
            });

            //check for merchant dues for increment
            const duesForMerchant = await tx.duesForMerchant.findFirst({
                where : {
                    userId : Number(userId),
                    merchantId : merch.id,
                    dueStatus : "Due"
                }
            });
            //dues for merchant incremented or paid
            if(duesForMerchant){
                await tx.duesForMerchant.updateMany({
                    where : {
                        userId : Number(userId),
                        merchantId : merch.id
                    },
                    data : {
                        amount : {
                            increment : remainingAmount
                        }
                    }
                });
            }
            else{
                await tx.duesForMerchant.create({
                    data : {
                        userId : Number(userId),
                        merchantId : merch.id,
                        amount : remainingAmount
                    }
                })
            }
        }
        console.log("dues done");
        
    })
    return {
        message : "Done"
    };
}