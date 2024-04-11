'use client'

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { handleDuesUser } from "../app/lib/actions/handleDuesUser";

export const MerchantDues = ({dues, setDues} : {dues : { 
    merchant: { 
        id : number,
        email: string;
         name: string | null;
     }; 
     merchantId: number;
      amount: number; 
    }[], setDues : any}) => {

    return (
        <Card title="Dues">
            {dues.length != 0 ? dues.map((due, index) => <div key={index} className="flex flex-row justify-between items-center px-4 py-2 mt-3">
                <div className="flex flex-col">
                    <div className=" font-semibold">
                        {due.merchant.name}
                    </div>
                    <div className=" text-slate-400">
                        {due.merchant.email}
                    </div>
                </div>
                <Button onClick={async() => {
                    const response = await handleDuesUser(due.amount, due.merchant)
                    alert(response.message);
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