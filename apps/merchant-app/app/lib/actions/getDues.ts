'use server'

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export const getDues = async () => {
    const session = await getServerSession(authOptions);
    const merchantId = session?.user?.id;

    // return merchantId;
    const dues = await prisma.duesForMerchant.findMany({
        where : {
            merchantId : Number(merchantId),
            dueStatus : "Due"
        },
        select : {
            userId : true,
            user : {
                select : {
                    id : true,
                    name : true,
                    number : true,
                }
            },
            amount : true,
        }
    })
    const completedDues = await prisma.duesForMerchant.findMany({
        where : {
            merchantId : Number(merchantId),
            dueStatus : "Paid"
        },
        select : {
            userId : true,
            user : {
                select : {
                    id : true,
                    name : true,
                    number : true,
                }
            },
            amount : true,
        }
    })
    
    return {dues, completedDues};
}