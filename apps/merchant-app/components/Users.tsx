'use client'

import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { User } from "./User"

export const Users = ({users} : {users : { number: string; id: number; name: string | null; }[]}) => {

    const [filteredUser, setfilteredUser] = useState<{ number: string; id: number; name: string | null; }[]>([]);
    const [search, setSearch] = useState("");
    
    function debounce<Params extends any[]>(
        func: (...args: Params) => any,
        timeout: number,
      ): (...args: Params) => void {

        let timer: NodeJS.Timeout
        return (...args: Params) => {
          clearTimeout(timer)
          timer = setTimeout(() => {
            func(...args)
          }, timeout)
        }
      }

    const handleSearch = debounce((user: string) => {
        setSearch(user);
        const newUsers = users.filter(m => {
            if (user!="" && m.number.includes(user) || (m.name && m.name.includes(user))) {
                return true;
            }
            return false;
        });
        setfilteredUser(newUsers);
    }, 300);
    return <Card title="Users">
        <div className="mt-4">
            <TextInput label="Search for a User" placeholder="Aman..." onChange={handleSearch}/>
        </div>
        {search === "" ? (
            <div className="font-bold text-l flex justify-center items-center mt-4">
                Search for a User...
            </div>
        ) : (
            filteredUser.length !== 0 ? (
                filteredUser.map((user, index) => (
                    <User user={user} index={index}/>
                ))
            ) : (
                <div className="font-bold text-l flex justify-center items-center mt-4">
                    User Doesn't exist!
                </div>
            )
        )}
    </Card>
}