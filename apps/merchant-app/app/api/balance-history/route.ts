'use server'

import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../lib/auth';

export async function GET() {
  console.log("balance history reached");
  const session = await getServerSession(authOptions);
  try {
    const merchantId = session?.user?.id;
    if(!merchantId){
      return NextResponse.json({message : "Please login"})
    }
    const balanceHistory = await prisma.balanceHistoryMerchant.findMany({
      where : {
        merchantId : Number(merchantId)
      },
      orderBy: { timestamp: 'asc' },
    });
    // console.log(balanceHistory);
    return NextResponse.json(balanceHistory);
  } catch (error) {
    console.error('Error fetching balance history:', error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
