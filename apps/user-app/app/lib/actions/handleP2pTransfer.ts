"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export const handleP2pTransfer = async (to : string, amount : number) => {
    
    const session = await getServerSession(authOptions);
    
    const userId = session?.user?.id;
    if(!userId){
        return{
            message : "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where : {
            number : to
        }
    });
    if(!toUser){
        return{
            message : "Invalid Phone Number entered"
        }
    };

    await prisma.$transaction(async (tx) => {
        const fromUser = await tx.user.findFirst({
            where: {
                id: Number(userId)
            }
        });
        if(!fromUser || fromUser?.balance < amount){
            return {
                message : "Insufficient Funds"
            }
        }
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
        await tx.user.updateMany({
            where : {
                id : Number(toUser.id)
            },
            data : {
                balance : {
                    increment : amount
                }
            }
        });

        await tx.p2pTransfer.create({
            data: {
              amount,
              startTime: new Date(),
              fromUserId: Number(userId),
              fromUserNumber : fromUser.number,
              toUserId: toUser.id,
              toUserNumber : toUser.number
            }
        })
        const updatedFromUser = await tx.user.findFirst({
            where: {
                id: Number(userId)
            }
        });
        const updatedToUser = await tx.user.findFirst({
            where: {
                number: to
            }
        });
        if(updatedFromUser)
            await prisma.balanceHistory.create({
                data : {
                    userId : Number(userId),
                    balance : updatedFromUser.balance - amount,
                    timestamp : new Date()
                }
            })
        if(updatedToUser)
            await prisma.balanceHistory.create({
                data : {
                    userId : updatedToUser.id,
                    balance : updatedToUser.balance + amount,
                    timestamp : new Date()
                }
        }) 
    })
}