
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../auth";

export const handleDuesMerchant = async (amount : number, user : any) => {
    console.log("reached");
    const session = await getServerSession(authOptions);
    console.log(session);
    const merchantId = session?.user?.id;

    console.log(merchantId);
    if(!merchantId){
        return {
            message : "Error while depositing"
        };
    }
    await prisma.$transaction(async (tx) => {
        const fromMerchant = await tx.merchant.findFirst({
            where : {
                id : Number(merchantId)
            }
        })
        if(!fromMerchant){
            return;
        }
        if(fromMerchant && fromMerchant.balance < amount){
            return {
                message : "Low Balance"
            }
        }
        //account balance updation
        await tx.merchant.update({
            where : {
                id : Number(merchantId)
            },
            data : {
                balance : {
                    decrement : amount
                }
            }
        });

        await tx.user.update({
            where : {
                id : user.id
            },
            data : {
                balance : {
                    increment : amount
                }
            }
        });

        const use = await tx.user.findFirst({
            where : {
                id : user.id
            }
        });
        if(!use){
            return {
                message : "User doesnt exist"
            }
        }
        console.log("account updation done");
        // balanceHistory updation
        await tx.balanceHistoryMerchant.create({
            data : {
                merchantId : Number(merchantId),
                balance : fromMerchant.balance - amount,
                timestamp : new Date()
            }
        })
        await tx.balanceHistory.create({
            data : {
                userId : use.id,
                balance : use.balance,
                timestamp : new Date()
            }
        })

        const due = await tx.duesForMerchant.findFirst({
            where : {
                userId : use.id,
                merchantId : Number(merchantId),
                dueStatus : "Due"
            }
        });
        if(!due){
            console.log("due doesn't exist");
            //check for merchant dues for increment
            const duesForUser = await tx.duesForUser.findFirst({
                where : {
                    userId : use.id,
                    merchantId : merchantId,
                    dueStatus : "Due"
                }
            });
            //dues for merchant incremented or paid
            if(duesForUser){
                await tx.duesForUser.updateMany({
                    where : {
                        userId : use.id,
                        merchantId : merchantId
                    },
                    data : {
                        amount : {
                            increment : amount
                        }
                    }
                });
            }
            else{
                await tx.duesForUser.create({
                    data : {
                        userId : use.id,
                        merchantId : merchantId,
                        amount : amount
                    }
                })
            }
            return {
                message : "Amount deposited"
            }
        }
        if(due.amount > amount){
            console.log("due amount is greater");
            await tx.duesForMerchant.updateMany({
                where : {
                    userId : use.id,
                    merchantId : Number(merchantId)
                },
                data : {
                    amount : {
                        decrement : amount
                    }
                }
            })
        }
        else if(due.amount == amount){
            await tx.duesForMerchant.updateMany({
                where : {
                    userId : use.id,
                    merchantId : Number(merchantId)
                },
                data : {
                    dueStatus : "Paid"
                }
            });
        }
        else{
            console.log("due amount is lesser")
            const remainingAmount = due.amount - amount;
            //dues for user paid
            await tx.duesForMerchant.updateMany({
                where : {
                    userId : use.id,
                    merchantId : Number(merchantId)
                },
                data : {
                    dueStatus : "Paid"
                }
            });

            //check for merchant dues for increment
            const duesForUser = await tx.duesForUser.findFirst({
                where : {
                    userId : use.id,
                    merchantId : Number(merchantId),
                    dueStatus : "Due"
                }
            });
            //dues for merchant incremented or paid
            if(duesForUser){
                await tx.duesForUser.updateMany({
                    where : {
                        userId : use.id,
                        merchantId : Number(merchantId)
                    },
                    data : {
                        amount : {
                            increment : remainingAmount
                        }
                    }
                });
            }
            else{
                await tx.duesForUser.create({
                    data : {
                        userId : use.id,
                        merchantId : Number(merchantId),
                        amount : remainingAmount
                    }
                })
            }
        }
        console.log("dues done");
    })
}