'use client'
import { useState, useEffect } from "react";
import { getUsers } from "../../lib/actions/getUsers";
import { getDues } from "../../lib/actions/getDues";
import { Users } from "../../../components/Users";
import { UserDues } from "../../../components/UserDues";
import { CompletedDues } from "../../../components/CompletedDues";


export default function() {
    const [users, setUsers] = useState<{ number: string; id: number; name: string | null; }[]>([]);
    const [dues, setDues] = useState<{ user: { number: string; name: string | null; }; userId: number; amount: number; }[]>([]);
    const [completedDues, setCompletedDues] = useState<{ user: { number: string; name: string | null; }; userId: number; amount: number; }[]>([]);

    useEffect(() => {
        getUsers().then((response) => setUsers(response));
        getDues().then((response) => {setDues(response.dues)
            setCompletedDues(response.completedDues)});
        
    }, []);
    return(
        <div className=" w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                User Dues
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div>
                    <Users users={users}/>
                </div>
                <div className="flex flex-col">
                    <div className="mb-7">
                        <UserDues dues={dues} setDues={setDues}/>
                    </div>
                    <div>
                        <CompletedDues completedDues={completedDues} setCompletedDues={setCompletedDues} />
                    </div>
                </div>
            </div>
        </div>
    )

}