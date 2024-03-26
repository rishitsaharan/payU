import express from "express";
import db from "@repo/db/client";

const app = express();

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation = {
        token : req.body.token,
        userId : req.body.user_identifier,
        amount : req.body.amount
    };
    try{
        await db.$transaction([
            db.balances.updateMany({
                where : {
                    userId : Number(paymentInformation.userId)
                },
                data : {
                    amount : {
                        increment : Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransactions.updateMany({
                where : {
                    token : paymentInformation.token
                },
                data : {
                    status : "Success"
                }
            })
        ]);
        return res.status(200).json({
            message : "Captured"
        })
    }
    catch(err){
        return res.status(411).json({
            message : "Error while processing webhook"
        })
    }
});

app.listen(3003);