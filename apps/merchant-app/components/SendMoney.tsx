"use client"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/select"
import { TextInput } from "@repo/ui/textInput"
import { useState } from "react"
import handleWithdrawMoney from "../app/lib/actions/handleWithdrawMoney"

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];
export const SendMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl || "");
    const [accNumber, setAccNumber] = useState("");
    const [amount, setAmount] = useState(0)
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "")

    return <Card title="Withdraw Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
            setAmount(Number(value))
        }} />
        <TextInput label={"Account Number"} placeholder={"Acc Number"} onChange={(value) => {
            setAccNumber(value)
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setProvider(value);
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                const response = await handleWithdrawMoney(amount * 100, provider);
                console.log(redirectUrl + " "+accNumber);
                alert(response.message);
            }}>
                Send Money
            </Button>
        </div>
    </div>
</Card>
}