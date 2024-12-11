"use client";
import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js";
import { useData } from "../contexts/DataContext";
import "../css/piechart.css";

const PieChart = () => {
  const { data } = useData();
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!data || !data.NVAA || data.NVAA.length === 0) return;

    const canvas = chartRef.current;
    const ctx = canvas.getContext("2d");

    const labels = Object.keys(data).filter(
      (key) => key !== "totals" && key !== "percentages"
    );

    chartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Station 1",
            data: labels.map((label) => data[label][0]),
            backgroundColor: [
              "rgba(155, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
            ],
            borderColor: [
              "rgba(155, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      <h2>Station 1</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;
