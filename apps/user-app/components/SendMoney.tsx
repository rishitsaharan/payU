"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput"
import { useState } from "react"
import { handleP2pTransfer } from "../app/lib/actions/handleP2pTransfer"

export const SendMoney = () => {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState(0);

    
    return (
        <Card title="Send">
            <div className="w-full">
                <TextInput label="Number" placeholder="Number" onChange={(value) => {
                    setNumber(value)
                }}/>
                <TextInput label="Amount" placeholder="100" onChange={(value) => {
                    setAmount(Number(value))
                }}/>
                <div className="flex justify-center pt-4">
                    <Button onClick={() => handleP2pTransfer(number, amount * 100)}>
                        Send Money
                    </Button>
                </div>
            </div>
        </Card>
    )
}