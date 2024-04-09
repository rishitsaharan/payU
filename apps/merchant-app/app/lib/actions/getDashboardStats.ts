import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";
import { subMonths } from 'date-fns';

export const getDashboardStats = async () => {
    const session = await getServerSession(authOptions);
    const merchantId = session.user.id;

    if(!merchantId){
        return;
    }
    const startDate = subMonths(new Date(), 1); // Date one month ago
    const endDate = new Date();

    const numberBalanceHistory = await prisma.balanceHistoryMerchant.count({
        where : {
            merchantId : Number(merchantId),
            timestamp: {
                lt: endDate, // Less than current date
                gte: startDate // Greater than or equal to one month ago
            }
        },
    });
    const numberOnRampTransactions = await prisma.onRampTransactionsMerchant.count({
        where : {
            merchantId : Number(merchantId),
            startTime: {
                lt: endDate, // Less than current date
                gte: startDate // Greater than or equal to one month ago
            }
        } 
    })
    return {
        numberBalanceHistory,
        numberOnRampTransactions
    }
}