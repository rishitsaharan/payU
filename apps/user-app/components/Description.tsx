import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { instrumentDescription } from "../app/lib/instrumentDescription"

export const Description = ({instrument, setInstrument} : {
    instrument : "stocks" | "etf" | "gold" | "ipo" | "mutualFund",
    setInstrument : Dispatch<SetStateAction<"stocks" | "etf" | "gold" | "ipo" | "mutualFund">>
}) => {

    const description = instrumentDescription;
    return (
        <div className="text-xl text-slate-700 font-semibold border rounded-2xl bg-white p-6 ml-28 mr-28 mt-16">
            {description[instrument]}
        </div>
    )
}