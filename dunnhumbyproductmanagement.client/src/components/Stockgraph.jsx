import { useEffect, useState } from 'react';
import { Chart as ChartJS, defaults, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';
//import productData from "../data/productData.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function Stockgraph() {
    const [stocks, setStockQuantity] = useState();
    const [products, setProductOverPeriod] = useState();

    useEffect(() => {
        populateProductData();
    }, []);

    const contents = stocks === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. </em> </p>
        :
        <div className="graphConainer">
            <div style={{ maxWidth: "500px" }} className="stocksDataCard">
                <Pie
                    data={{
                        // Name of the variables on x-axies for each bar
                        labels: stocks.map((data) => data.category),
                        datasets: [
                            {
                                // Label for bars
                                label: "Stock Quantity/Category",
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
                    options={{
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
                            labels: {
                                fontSize: 15,
                            },
                        },
                    }}
                />
            </div>


            <div style={{ maxWidth: "500px" }} className="quantityDataCard">
                <Bar
                    data={{
                        // Name of the variables on x-axies for each bar
                        labels: ["ProductsThisWeek", "ProductsThisMonth", "ProductsThisYear"],
                        datasets: [
                            {
                                // Label for bars
                                label: "Products Added",
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
                            labels: {
                                fontSize: 15,
                            },
                        },
                    }}
                />
            </div>
        </div>
        ;

    return (
        <div className="conainer">
            {contents}
        </div>
    );
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
}

export default Stockgraph;