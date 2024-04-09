'use client'

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { handleDuesMerchant } from "../app/lib/actions/handleDuesMerchant";

export const UserDues = ({dues} : {dues : { user: { number: string; name: string | null; }; userId: number; amount: number; }[]}) => {

    return (
        <Card title="Dues">
            {dues.length != 0 ? dues.map((due, index) => <div key={index} className="flex flex-row justify-between items-center px-4 py-2 mt-3">
                <div className="flex flex-col">
                    <div className=" font-semibold">
                        {due.user.name ? due.user.name : "Mr/Mrs. Anonymous"}
                    </div>
                    <div className=" text-slate-400">
                        {due.user.number}
                    </div>
                </div>
                <Button onClick={ async () => {
                    await handleDuesMerchant(due.amount, due.user)
                }}>
                    Pay {due.amount/100}
                </Button>
            </div>) : 
            <div className="font-bold text-l justify-center flex items-center mt-4">
                No Dues!
            </div>}
        </Card>
    )
}