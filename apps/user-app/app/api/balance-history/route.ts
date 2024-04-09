import prisma from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    const userId = session?.user?.id;
    if(!userId){
      return NextResponse.json({message : "Please login"})
    }
    const balanceHistory = await prisma.balanceHistory.findMany({
      where : {
        userId : Number(userId)
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
