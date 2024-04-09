'use client'

import { useEffect, useState, useRef } from "react";
import { TextInput } from "@repo/ui/textInput";
import { Card } from "@repo/ui/card";
import Chart from "chart.js";
import { Button } from "@repo/ui/button";

export const SIPCalculator = () => {
    const [amount, setAmount] = useState(0);
    const [interest, setInterest] = useState(0);
    const [time, setTime] = useState(0);

    const canvasRef = useRef<HTMLCanvasElement>(null); // Define canvas ref
    // const chartRef = useRef<Chart>(); // Define chart ref

    useEffect(() => {
        const ctx = (canvasRef.current as HTMLCanvasElement)?.getContext('2d');
        let chart: Chart | undefined = undefined;
    
        const years = []; // Array to store years
        const sipAmounts = []; // Array to store SIP amounts
    
        // Calculate SIP amount for each year
        for (let i = 1; i <= time; i++) {
            years.push(i);
            const sip = calculateSIP(amount, interest, i);
            sipAmounts.push(Number(sip));
        }
        chart = new Chart(ctx || "", {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'SIP Amount',
                    data: sipAmounts,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
        });
    
        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, [amount, time, interest]);

    // Function to calculate SIP amount
    const calculateSIP = (principal: number, rate: number, time: number) => {
        var monthlyRate = rate / 12 / 100;  //Rate of interest
        var months = time * 12;

        const futureValue = principal * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
        return Number(futureValue.toFixed(2)); // Convert to number with 2 decimal places
    };
    function handleAmountChange(amount : string){
        setAmount(Number(amount))
    }
    function handleInterestChange(interest : string){
        setInterest(Number(interest))
    }
    function handleTimeChange(time : string){
        setTime(Number(time));
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 ml-28 mr-28 mt-16 gap-4 mb-20">
            <div className="w-full">
                <Card title="SIP Calculator">
                    <div className="mt-5">
                        <TextInput label="Enter Amount" placeholder="100" onChange={handleAmountChange} />
                    </div>
                    <div className="mt-5">
                        <TextInput label="Enter Interest (%)" placeholder="12" onChange={handleInterestChange} />
                    </div>
                    <div className="mt-5">
                        <TextInput label="Enter Time (Yrs)" placeholder="12" onChange={handleTimeChange} />
                    </div>
                </Card>
            </div>
            <div className="">
                <Card title="Projection">
                    <canvas className="" ref={canvasRef}></canvas> 
                </Card>
            </div>
        </div>
    );
}