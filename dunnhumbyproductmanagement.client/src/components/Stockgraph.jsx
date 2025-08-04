import { useEffect, useState } from 'react';
import { Chart as ChartJS, defaults, ArcElement, Tooltip, Legend } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Bar } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';



defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

//ChartJS.register(ChartDataLabels);
function Stockgraph() {
    const [stocks, setStockQuantity] = useState();
    const [products, setProductOverPeriod] = useState();

    async function populateProductData() {
        const [response] = await Promise.all([
            fetch('ProductsAPI/CategoryQuantity'),
            fetch('ProductsAPI')
        ]);
        if (response.ok) {
            const categoryQuantity = await response.json();
            setStockQuantity(categoryQuantity.result);
            setProductOverPeriod(categoryQuantity.result1[0]);
        }
    }

    useEffect(() => {
        populateProductData();
    }, []);

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
            },
            datalabels: {
                display: 'auto',
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 14,
                },
                anchor: 'center',
                align: 'center',
                formatter: (value) => value,
                clamp: true,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
            title: {
                display: true,
                text: 'Stocks/Category',
                font: {
                    size: 20,
                    weight: 'bold',
                },
                padding: {
                    top: 10,
                    bottom: 30,
                },
                color: '#fff', // Optional: Customize title color
                align: 'center', // center | start | end
            },
        },
    };

    const contents = stocks === undefined
        ? <p><em>Loading graphs... Please refresh once the ASP.NET backend has started. </em> </p>
        :
        <div className="graphConainer">
            <div style={{ maxWidth: "500px" }} className="stocksDataCard">
                {/*Stock Details*/}
                <Pie
                    data={{
                        // Name of the variables on x-axies for each bar
                        labels: stocks.map((data) => data.category),
                        datasets: [
                            {
                                // Label for bars
                                label: stocks.map((data) => data.category),
                                // Data or value of your each variable
                                data: stocks.map((data) => data.quantity),
                                // Color of each bar
                                backgroundColor:
                                    ["rgba(43, 63, 229, 0.8)",
                                        "rgba(250, 192, 19, 0.8)",
                                        "rgba(253, 135, 135, 0.8)",
                                        "rgba(43, 43, 135, 0.8)"],
                                //// Border color of each bar
                                borderColor: ["rgba(43, 63, 229, 0.8)",
                                    "rgba(250, 192, 19, 0.8)",
                                    "rgba(253, 135, 135, 0.8)",
                                    "rgba(43, 43, 135, 0.8)"],
                                borderRadius: 5,
                                borderWidth: 0.5,
                            },
                        ],
                    }}
                    // Height of graph
                    height={400}
                    options={options}
                />
            </div>


            {/*Quantity Details*/}
            <div style={{ maxWidth: "500px" }} className="quantityDataCard">
                <Bar
                    data={{
                        // Name of the variables on x-axies for each bar
                        labels: ["ProductsThisWeek", "ProductsThisMonth", "ProductsThisYear"],
                        datasets: [
                            {
                                // Label for bars
                                label: "Products added over the period",
                                // Data or value of your each variable
                                data: [products["productsThisWeek"], products["productsThisMonth"], products["productsThisYear"]],
                                // Color of each bar
                                backgroundColor:
                                    ["rgba(43, 63, 229, 0.8)",
                                        "rgba(250, 192, 19, 0.8)",
                                        "rgba(253, 135, 135, 0.8)",
                                        "rgba(43, 43, 135, 0.8)"],
                                //// Border color of each bar
                                borderColor: ["rgba(43, 63, 229, 0.8)",
                                    "rgba(250, 192, 19, 0.8)",
                                    "rgba(253, 135, 135, 0.8)",
                                    "rgba(43, 43, 135, 0.8)"],
                                borderRadius: 5,
                                borderWidth: 0.5,
                            },
                        ],
                    }}
                    // Height of graph
                    height={400}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: 'Products over the period',
                                font: {
                                    size: 20,
                                    weight: 'bold',
                                },
                                padding: {
                                    top: 10,
                                    bottom: 30,
                                },
                                color: '#fff', // Optional: Customize title color
                                align: 'center', // center | start | end
                            },
                        },
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        // The y-axis value will start from zero
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                        legend: {
                            position: 'bottom',
                            labels: {
                                fontSize: 15,
                            },
                        },
                        title: {
                            display: true,
                            text: 'Products added over the period',
                            font: {
                                size: 20,
                                weight: 'bold',
                            },
                            padding: {
                                top: 10,
                                bottom: 30,
                            },
                            color: '#fff', // Optional: Customize title color
                            align: 'center', // center | start | end
                        },
                    }}
                />
            </div>
        </div>;

    return (

        <div className="conainer">
            {contents}
        </div>
    );
}

export default Stockgraph;