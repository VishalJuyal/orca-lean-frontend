"use client";
import React from "react";
import Headers from "../components/Header";
import Tables from "../components/Tables";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { DataProvider } from "../contexts/DataContext";

export default function HomePage() {
  return (
    <DataProvider>
      <div className="landingPage">
        <Headers />
        <Tables userRole="admin" />
        <BarChart />
        <PieChart />
      </div>
    </DataProvider>
  );
}
