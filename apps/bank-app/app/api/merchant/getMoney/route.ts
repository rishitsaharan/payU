import db from "@repo/db/client";
import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(req: NextRequest) {
    const body = await req.json();
    const paymentInformation = {
      token : body.token,
      merchantId : body.merchantId,
      amount : body.amount
    };
    console.log("check01");
    try{
        await db.$transaction( async(tx) => {
            console.log("check1");
            console.log(paymentInformation.token);
            console.log(paymentInformation.merchantId);
            console.log(paymentInformation.amount);

            await tx.merchant.update({
                where : {
                  id : Number(paymentInformation.merchantId)
                },
                data : {
                    balance : {
                        increment : Number(paymentInformation.amount)
                    }
                }
            })
            console.log("updated");
            await tx.onRampTransactionsMerchant.updateMany({
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
        try{
          await db.merchant.update({
            where : {
              id : Number(paymentInformation.merchantId)
            },
            data : {
              lockedBalance : {
                increment : Number(paymentInformation.amount)
              }
            }
          })
        }
        catch(er){
        } 
        return NextResponse.json({
            message : "Error while processing webhook"
        })
    }
}