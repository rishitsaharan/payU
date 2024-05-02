'use server'
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import axios from "axios";

export const handleOnRampTransactions = async (amount : number, provider : string) => {

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const token = Math.random().toString();

    if(!userId){
        return {
            message : "User not logged in"
        }
    }
    console.log("check1");
    await prisma.onRampTransactions.create({
        data : {
            status : "Processing",
            token : token,
            provider : provider,
            amount : amount,
            startTime : new Date(),
            userId : Number(userId)
        }
    })

    try{
        console.log(`${process.env.BANK_URL}`);
        const response = await axios.post(`${process.env.BANK_URL}/api/user/getMoney`, {
            token,
            userId,
            amount
        });
        const updatedFromUser = await prisma.user.findFirst({
            where: {
                id: Number(userId)
            }
        });
        if(updatedFromUser)
            await prisma.balanceHistory.create({
                data : {
                    userId : Number(userId),
                    balance : updatedFromUser.balance,
                    timestamp : new Date()
                }
            })
    }
    catch(er){
        console.log(er);
        try{
            await prisma.user.update({
              where : {
                id : Number(userId)
              },
              data : {
                lockedBalance : {
                  increment : Number(amount)
                }
              }
            })
          }
          catch(er){
          } 
    }
    return {
        message : "On Ramp Transaction added"
    }
}