import { Dispatch, SetStateAction } from 'react';
import stocks from "./../public/stocks.png";
import ipo from "./../public/ipo.png";
import etf from "./../public/etf.png";
import gold from "./../public/gold.png";
import mutualFund from "./../public/mutualFund.png";


type InstrumentsType = {
    stocks: string;
    ipo: string;
    etf: string;
    gold: string;
    mutualFund: string;
};

export const Instruments = ({instrument, setInstrument} : {
    instrument : "stocks" | "etf" | "gold" | "ipo" | "mutualFund",
    setInstrument : Dispatch<SetStateAction<"stocks" | "etf" | "gold" | "ipo" | "mutualFund">>
}) => {
    const instruments = {
        stocks : "Stocks",
        ipo : "IPO",
        etf : "ETFs",
        gold : "Gold",
        mutualFund : "Mutual Fund"
    }
    
    return (
        <div className='flex'>
            {Object.keys(instruments).map((key) => (
                <div key={key} className={`flex flex-col rounded-lg w-48 h-72 items-center p-2 mr-5 bg-gray-800 hover:bg-gray-900 focus:ring focus:border focus:outline-none ${instrument === key ? "ring-2 ring-offset-2 ring-blue-900 border-blue-500" : ""}`} 
                onClick={() => setInstrument(key as keyof InstrumentsType)}>
                    <div className=' w-44 bg-slate-100 rounded-md'>
                        <img src={getImage(key as keyof InstrumentsType)} />
                    </div>
                    <div className='flex flex-row justify-center items-center text-center mt-6 text-white font-bold'>
                        Invest in {instruments[key as keyof InstrumentsType]}
                    </div>
                </div>
            ))}
        </div>
    )
}

const getImage = (instrument: keyof InstrumentsType) => {
    switch (instrument) {
        case "stocks":
            return stocks.src;
        case "ipo":
            return ipo.src;
        case "etf":
            return etf.src;
        case "gold":
            return gold.src;
        case "mutualFund":
            return mutualFund.src;

    }
};