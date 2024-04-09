"use client"

import { MerchantDues } from "../../../components/MerchantDues";
import { useEffect, useState } from "react";
import { getMerchants } from "../../lib/actions/getMerchants";
import { getDues } from "../../lib/actions/getDues";
import { Merchants } from "../../../components/Merchants";
import { CompletedDues } from "../../../components/CompletedDues";

export default function() {
    const [merchants, setMerchants] = useState<{
        id: number; email: string; name: string | null;
    }[]>([]);
    const [dues, setDues] = useState<{ 
        merchant: { 
            id : number;
            email: string;
             name: string | null;
         }; 
         merchantId: number;
          amount: number; 
        }[]>([]);
    const [completedDues, setCompletedDues] = useState<{ merchant: { id: number; email: string; name: string | null; }; userId: number; amount: number; }[]>([]);

    useEffect(() => {
        getMerchants().then((response) => setMerchants(response));
        getDues().then((response) => {setDues(response.dues)
            setCompletedDues(response.completedDues)});
    }, []);
    return(
        <div className=" w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Merchant Dues
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div>
                    <Merchants merchants={merchants}/>
                </div>
                <div>
                    <div className="mb-7">
                        <MerchantDues dues={dues} setDues={setDues}/>
                    </div>
                    <div>
                        <CompletedDues completedDues={completedDues} setCompletedDues={setCompletedDues} />
                    </div>
                </div>
            </div>
        </div>
    )
}