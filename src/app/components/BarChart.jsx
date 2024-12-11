"use client";
import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import "../css/charts.css";
import { useData } from "../contexts/DataContext";

function BarChart() {
  const { data } = useData();
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || !data.NVAA || !data.VAA || !data.SVAA || !data.UNB) return;

    const labels = data.NVAA.map((_, index) => `Station ${index + 1}`);

    const newChartData = {
      labels,
      datasets: [
        {
          label: "NVAA",
          backgroundColor: "blue",
          borderColor: "blue",
          borderWidth: 1,
          data: data.NVAA,
        },
        {
          label: "VAA",
          backgroundColor: "orange",
          borderColor: "orange",
          borderWidth: 1,
          data: data.VAA,
        },
        {
          label: "SVAA",
          backgroundColor: "green",
          borderColor: "green",
          borderWidth: 1,
          data: data.SVAA,
        },
        {
          label: "UNB",
          backgroundColor: "cyan",
          borderColor: "cyan",
          borderWidth: 1,
          data: data.UNB,
        },
      ],
    };

    setChartData(newChartData);
  }, [data]);

  useEffect(() => {
    if (!chartData) return;

    const ctx = document.getElementById("myChart").getContext("2d");
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div className="chart-container">
      <canvas id="myChart" />
    </div>
  );
}

export default BarChart;
