"use server"

import prisma from "@repo/db/client"

export const getMerchants = async () => {
    const merchants = await prisma.merchant.findMany({
        select : {
            id : true,
            name : true,
            email : true
        }
    });
    return merchants;
}