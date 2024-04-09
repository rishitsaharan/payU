import { Card } from "@repo/ui/card";
import { SendMoney } from "../../../components/SendMoney";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import { P2pTransactions } from "../../../components/P2pTransactions";

async function getP2pTransfers(){
    const session = await getServerSession(authOptions);
    const transfers = await prisma.p2pTransfer.findMany({
        where : {
            OR : [{
                fromUserId : Number(session?.user?.id)
            },{
                toUserId : Number(session?.user?.id)
            }]
        }
    });
    return transfers.map((transfer) => {
        if(transfer.fromUserId === Number(session?.user?.id)){
            return {
                ...transfer,
                type : "DEBIT",
            }
        }
        else{
            return {
                ...transfer,
                type : "CREDIT"
            }
        }
        
})
}
export default async function(){
    const p2pTransfers = await getP2pTransfers();

    return (
        <div className=" w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P Transfer
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div>
                    <SendMoney />
                </div>
                <div>
                    <P2pTransactions transactions={p2pTransfers}/>
                </div>
            </div>
        </div>
    )
}