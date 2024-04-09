'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export const getOnRampTransactions = async () => {
    const session = await getServerSession(authOptions);
    const merchantId = session?.user?.id;

    const transactions  = await prisma.onRampTransactionsMerchant.findMany({
        where : {
            merchantId : Number(merchantId)
        },
        select : {
            provider : true,
            amount : true,
            transactionType : true,
            status : true,
            startTime : true
        }
    });
    return transactions;
}