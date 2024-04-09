'use client'

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textInput"
import { useState, useRef, useEffect } from "react"
import Chart from "chart.js";

export const Calculator = () => {
    const [age, setAge] = useState(18);
    const canvasRef = useRef<HTMLCanvasElement>(null); // Define canvas ref
    const chartRef = useRef<Chart>(); // Define chart ref
    
    useEffect(() => {
        const distribution = getDistribution(age);

        const ctx = canvasRef.current?.getContext('2d'); // Access canvas ref
        if (chartRef.current) {
            chartRef.current.destroy();
        }
    
        chartRef.current = new Chart(ctx || "", {
            type: 'pie',
            data: {
                labels: ["ipo", "stocks", "etf", "mutualFund", "gold"],
                datasets: [
                    {
                        label: 'Dataset 1',
                        data: distribution,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Number of animals in the zoo',
                    },
                },
            },
        });
    }, [age]);
    
    function handleChange(age: string) {
        setAge(Number(age))
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 ml-28 mr-28 mt-16 gap-4">
            <div className="w-full">
                <Card title="Investment Split Calculator">
                    <div className="mt-5">
                        <TextInput label="Enter Age" placeholder="18+" onChange={handleChange} />
                    </div>
                </Card>
            </div>
            <div className="">
                <Card title="Projection">
                    <canvas className="" ref={canvasRef}></canvas> 
                </Card>
            </div>
        </div>
    )
}


function getDistribution(age : number){
    if(age < 20){
        return [20,30,20,30,0];
    }else if(age >= 20 && age <=30){
        return [10,20,30,30,10];
    }else if(age >= 31 && age <=40){
        return [5,10,20,40,25];
    }else if(age >= 41){
        return [0,5,10,50,35];
    }
}