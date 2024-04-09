import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput";
import { useState } from "react";
import { Merchant } from "./Merchant";

export const Merchants = ({merchants} : {merchants : {
    id: number; email: string; name: string | null;
}[]}) => {

    const [filteredMerchant, setFilteredMerchant] = useState<{
        id: number; email: string; name: string | null;
    }[]>([]);
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

    const handleSearch = debounce((merchant: string) => {
        setSearch(merchant);
        const newMerchants = merchants.filter(m => {
            if (merchant!="" && m.email.includes(merchant) || (m.name && m.name.includes(merchant))) {
                return true;
            }
            return false;
        });
        setFilteredMerchant(newMerchants);
    }, 300);
    return <Card title="Merchants">
        <div className="mt-4">
            <TextInput label="Search for a Merchant" placeholder="Aman..." onChange={handleSearch}/>
        </div>
        {search === "" ? (
            <div className="font-bold text-l flex justify-center items-center mt-4">
                Search for a Merchant...
            </div>
        ) : (
            filteredMerchant.length !== 0 ? (
                filteredMerchant.map((merchant, index) => (
                    <Merchant merchant={merchant}/>
                ))
            ) : (
                <div className="font-bold text-l flex justify-center items-center mt-4">
                    Merchant Doesn't exist!
                </div>
            )
        )}
    </Card>
}