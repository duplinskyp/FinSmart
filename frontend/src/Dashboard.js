import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const Dashboard = () => {
    const [alphaVantageData, setAlphaVantageData] = useState(null);
    const [iexCloudData, setIexCloudData] = useState(null);
    const [nasdaqData, setNasdaqData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const alphaResponse = await axios.get("/api/alpha-vantage");
            setAlphaVantageData(alphaResponse.data);

            const iexResponse = await axios.get("/api/iex-cloud");
            setIexCloudData(iexResponse.data);

            const nasdaqResponse = await axios.get("/api/nasdaq");
            setNasdaqData(nasdaqResponse.data);
        };

        fetchData();
    }, []);

    const alphaVantageChart = alphaVantageData ? (
        <Line
            data={{
                labels: Object.keys(alphaVantageData["Time Series (Daily)"]);
                datasets: [
                    {
                        label: "AAPL Close Price",
                        data: Object.values(alphaVantageData["Time Series (Daily)"]).map(day => day["4. close"]),
                    },
                ],
            }}
        />
    ) : null;

    return (
        <div>
            <h2>Dashboard</h2>
            {alphaVantageChart}
            {/* Add similar charts for iexCloudData and nasdaqData */}
        </div>
    );
};

export default Dashboard;

