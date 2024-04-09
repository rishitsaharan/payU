import db from "@repo/db/client";
import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(req: NextRequest) {
    const body = await req.json();
    const paymentInformation = {
      token : body.token,
      userId : body.userId,
      amount : body.amount
    };
    console.log("check01");
    try{
        await db.$transaction( async(tx) => {
            console.log("check1");
            console.log(paymentInformation.token);
            console.log(paymentInformation.userId);
            console.log(paymentInformation.amount);

            await tx.user.update({
                where : {
                  id : paymentInformation.userId
                },
                data : {
                    balance : {
                        decrement : Number(paymentInformation.amount)
                    }
                }
            })
            console.log("updated");
            await tx.onRampTransactions.updateMany({
                where : {
                    token : paymentInformation.token
                },
                data : {
                    status : "Success"
                }
            })
          });
        return NextResponse.json({
            message : "Captured"
        })
    }
    catch(err){
        return NextResponse.json({
            message : "Error while processing webhook"
        })
    }
}