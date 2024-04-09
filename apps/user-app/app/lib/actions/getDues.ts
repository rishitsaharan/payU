'use server'

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export const getDues = async () => {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const dues = await prisma.duesForUser.findMany({
        where : {
            userId : Number(userId),
            dueStatus : "Due"
        },
        select : {
            merchantId : true,
            merchant : {
                select : {
                    id : true,
                    name : true,
                    email : true,
                }
            },
            amount : true,
        }
    });
    const completedDues = await prisma.duesForUser.findMany({
        where : {
            userId : Number(userId),
            dueStatus : "Paid"
        },
        select : {
            userId : true,
            merchant : {
                select : {
                    id : true,
                    name : true,
                    email : true,
                }
            },
            amount : true,
        }
    })
    return {dues, completedDues};
}