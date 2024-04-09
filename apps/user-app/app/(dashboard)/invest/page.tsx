'use client'

import { useState } from "react"
import { Instruments } from "../../../components/Instruments";
import { Description } from "../../../components/Description";
import { Calculator } from "../../../components/Calculator";
import { SIPCalculator } from "../../../components/SIPCalculator";

export default function(){
    const [instrument, setInstrument] = useState<"stocks" | "etf" | "gold" | "ipo" | "mutualFund">("etf");

    return (
        <div className="flex flex-col items-center w-full mt-20">
            <div className="flex justify-center">
                <Instruments instrument={instrument} setInstrument={setInstrument} />
            </div>
            <div>
                <Description instrument={instrument} setInstrument={setInstrument} />
            </div>
            <div className="w-full">
                <Calculator />
            </div>
            <div className="w-full">
                <SIPCalculator />
            </div>
        </div>
    )
}