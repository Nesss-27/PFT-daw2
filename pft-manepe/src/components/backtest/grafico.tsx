'use client';
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import chartData from "./data.json";

Chart.register(...registerables);

const COLORES = [
    { backgroundColor: 'rgba(54, 162, 235, 0.2)', borderColor: 'rgba(54, 162, 235, 1)' },
    { backgroundColor: 'rgba(255, 99, 132, 0.2)', borderColor: 'rgba(255, 99, 132, 1)' },
];

export default function Backtest() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    const etiquetas = chartData.etiquetas;
    const datasets = chartData.datasets.map((ds, i) => ({
        ...ds,
        ...COLORES[i],
        borderWidth: 1,
    }));

    useEffect(() => {
        if (canvasRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(canvasRef.current, {
                type: 'line',
                data: {
                    labels: etiquetas,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="w-500 h-100 bg-white">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}