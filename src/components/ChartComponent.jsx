import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Groundwater Level Trend' }
                    }
                }
            });
        }
        return () => {
            if (chartInstance.current) chartInstance.current.destroy();
        };
    }, [data]);

    return <div className="bg-white p-4 rounded-lg shadow-md mt-2"><canvas ref={chartRef}></canvas></div>;
};

export default ChartComponent;