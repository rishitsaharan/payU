'use client'

import { Card } from "@repo/ui/card";

export const CompletedDues = ({completedDues} : {completedDues : { user: { number: string; name: string | null; }; userId: number; amount: number; }[]}) => {
    return (
        <Card title="Completed Dues">
            {completedDues.length != 0 ? completedDues.map((due, index) => <div key={index} className="flex flex-row justify-between items-center px-4 py-2 mt-3">
                <div className="flex flex-col">
                    <div className=" font-semibold">
                        {due.user.name ? due.user.name : "Mr/Mrs. Anonymous"}
                    </div>
                    <div className=" text-slate-400">
                        {due.user.number}
                    </div>
                </div>
                <div className="font-bold text-l">
                    Rs. {due.amount/100}
                </div>
            </div>) : 
            <div className="font-bold text-l justify-center flex items-center mt-4">
                No Dues!
            </div>}
        </Card>
    )
};