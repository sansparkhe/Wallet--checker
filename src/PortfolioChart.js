import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const PortfolioChart = ({ assets }) => {
    // Prepare data for Chart.js
    const chartData = {
        labels: assets.map(asset => asset.name),
        datasets: [
            {
                label: 'Asset Allocation',
                data: assets.map(asset => asset.amount),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                ],
                hoverBackgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                ]
            }
        ]
    };

    return (
        <div className="portfolio-chart">
            <h2>Account Portfolio Analytics</h2>
            <Pie data={chartData} />
        </div>
    );
};

export default PortfolioChart;
