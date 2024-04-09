'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";
import { subMonths } from 'date-fns';

export const getDashboardStats = async () => {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    if(!userId){
        return;
    }
    const startDate = subMonths(new Date(), 1); // Date one month ago
    const endDate = new Date();

    const numberBalanceHistory = await prisma.balanceHistory.count({
        where : {
            userId : Number(userId),
            timestamp: {
                lt: endDate, // Less than current date
                gte: startDate // Greater than or equal to one month ago
            }
        },
    });
    const numberOnRampTransactions = await prisma.onRampTransactions.count({
        where : {
            userId : Number(userId),
            startTime: {
                lt: endDate, // Less than current date
                gte: startDate // Greater than or equal to one month ago
            }
        } 
    })
    const numberP2PTransfers = await prisma.p2pTransfer.count({
        where : {
            fromUserId : Number(userId),
            startTime: {
                lt: endDate, // Less than current date
                gte: startDate // Greater than or equal to one month ago
            }
        } 
    })
    return {
        numberBalanceHistory,
        numberOnRampTransactions,
        numberP2PTransfers
    }
}