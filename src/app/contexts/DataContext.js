"use clinet";
import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    NVAA: [4.3, 2.5, 3.5, 4.5],
    VAA: [2.4, 4.4, 1.8, 2.8],
    SVAA: [2, 2, 3, 5],
    UNB: [1, 1.2, 1.4, 0.8],
    totals: [],
    percentages: [],
  });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
