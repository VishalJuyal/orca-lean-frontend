"use client";
import React, { useEffect, useState } from "react";
import "../css/tables.css";
import { useData } from "../contexts/DataContext";

function Tables({ userRole }) {
  const { data, setData } = useData();
  const [totals, setTotals] = useState([]);
  const [percentages, setPercentages] = useState([]);
  const [columnTotals, setColumnTotals] = useState({});
  const [columnPercentages, setColumnPercentages] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e, row, col) => {
    const newData = { ...data };
    newData[col][row] = parseFloat(e.target.value) || 0;
    setData(newData);
  };

  useEffect(() => {
    if (!isClient) return;
    const newTotals = [];
    const newPercentages = [];
    const newColumnTotals = { NVAA: 0, VAA: 0, SVAA: 0, UNB: 0 };

    data.NVAA.forEach((_, index) => {
      const rowTotal =
        data.NVAA[index] + data.VAA[index] + data.SVAA[index] + data.UNB[index];
      newTotals.push(rowTotal);

      newColumnTotals.NVAA += data.NVAA[index];
      newColumnTotals.VAA += data.VAA[index];
      newColumnTotals.SVAA += data.SVAA[index];
      newColumnTotals.UNB += data.UNB[index];

      newPercentages.push({
        NVAA: Math.round((data.NVAA[index] / rowTotal) * 100) || 0,
        VAA: Math.round((data.VAA[index] / rowTotal) * 100) || 0,
        SVAA: Math.round((data.SVAA[index] / rowTotal) * 100) || 0,
        UNB: Math.round((data.UNB[index] / rowTotal) * 100) || 0,
      });
    });

    const grandTotal =
      newColumnTotals.NVAA +
      newColumnTotals.VAA +
      newColumnTotals.SVAA +
      newColumnTotals.UNB;

    const newColumnPercentages = {
      NVAA: Math.round((newColumnTotals.NVAA / grandTotal) * 100) || 0,
      VAA: Math.round((newColumnTotals.VAA / grandTotal) * 100) || 0,
      SVAA: Math.round((newColumnTotals.SVAA / grandTotal) * 100) || 0,
      UNB: Math.round((newColumnTotals.UNB / grandTotal) * 100) || 0,
    };

    setTotals(newTotals);
    setPercentages(newPercentages);
    setColumnTotals(newColumnTotals);
    setColumnPercentages(newColumnPercentages);
  }, [data, isClient]);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 style={{ paddingTop: "42px" }}>Table 1: Yamazumi in Seconds</h2>
      <table>
        <thead>
          <tr>
            <th>Station</th>
            <th>NVAA</th>
            <th>VAA</th>
            <th>SVAA</th>
            <th>UNB</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.NVAA.map((_, index) => (
            <tr key={`row-${index}`}>
              <td>Station {index + 1}</td>
              {["NVAA", "VAA", "SVAA", "UNB"].map((col) => (
                <td key={`cell-${index}-${col}`}>
                  {userRole === "admin" ? (
                    <input
                      type="number"
                      value={data[col][index]}
                      onChange={(e) => handleInputChange(e, index, col)}
                    />
                  ) : (
                    data[col][index]
                  )}
                </td>
              ))}
              <td>{totals[index] ? totals[index].toFixed(1) : "0.0"}</td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            {["NVAA", "VAA", "SVAA", "UNB"].map((col) => (
              <td key={`total-${col}`}>
                {columnTotals[col] !== undefined
                  ? columnTotals[col].toFixed(1)
                  : "0.0"}
              </td>
            ))}
            <td>
              {totals.length > 0
                ? totals.reduce((a, b) => a + b, 0).toFixed(1)
                : "0.0"}
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Table 2: Saturation in %</h2>
      <table>
        <thead>
          <tr>
            <th>Station</th>
            <th>NVAA</th>
            <th>VAA</th>
            <th>SVAA</th>
            <th>UNB</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.NVAA.map((_, index) => (
            <tr key={`percent-row-${index}`}>
              <td>Station {index + 1}</td>
              {["NVAA", "VAA", "SVAA", "UNB"].map((col) => (
                <td key={`percent-cell-${index}-${col}`}>
                  {percentages[index] && percentages[index][col]
                    ? percentages[index][col] + "%"
                    : "0%"}
                </td>
              ))}
              <td>100%</td>
            </tr>
          ))}
          <tr>
            <td>Column %</td>
            {["NVAA", "VAA", "SVAA", "UNB"].map((col) => (
              <td key={`column-percent-${col}`}>{columnPercentages[col]}%</td>
            ))}
            <td>100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
