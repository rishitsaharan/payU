'use client'
import { useEffect, useState } from 'react';
import Chart from "chart.js";
import axios from 'axios';
import { useRef } from 'react';
import { Card } from '@repo/ui/card';

const BalanceGraph = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const [balanceData, setBalanceData] = useState<{
        userId : Number;
        balance : Number;
        timestamp : Date;
    }[]>([]);

  useEffect(() => {
    axios.get('/api/balance-history')
      .then(response => {
        setBalanceData(response.data);
      })
      .catch(error => {
        console.error('Error fetching balance history:', error);
      });
  }, []);

  useEffect(() => {
    if (balanceData.length === 0) return;
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        var myChart = new Chart(ctx || "", {
            type: 'line',
            data: {
                labels: balanceData.map(balance => String(new Date(balance.timestamp))),
                datasets: [{
                    data : balanceData.map(balance => Number(balance.balance) / 100),
                    label: "Balance",
                    borderColor: "#3e95cd",
                    backgroundColor: "#7bb6dd",
                    fill: false,
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: false, // Hide x-axis labels
                    }]
                },
            },
        });
  }, [balanceData]);
  return (
    <div>
        <Card title='Balance History'>
          <canvas id='myChart'></canvas>
        </Card>
    </div>
  );
};


// const groupDataByTimeInterval = (data: any[], interval : "1D" | "1M" | "1Y") => {
//     const groupedData: { [key: string]: any[] } = {};
    
//     data.forEach(entry => {
//       const timestamp = new Date(entry.timestamp);
//       const year = timestamp.getFullYear();
//       const month = timestamp.getMonth() + 1; // Months are zero-based, so we add 1
//       const day = timestamp.getDate();
//       const key = `${year}-${month}-${day}`;
  
//       if (!groupedData[key]) {
//         groupedData[key] = [];
//       }
//         groupedData[key].push(entry);
//     });
  
//     return groupedData;
//   };
export default BalanceGraph;