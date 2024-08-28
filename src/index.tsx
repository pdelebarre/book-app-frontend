import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Example of sending metrics to the console
const handlePerformanceMetrics = (metric: { name: string; value: number }) => {
  console.log(metric.name, metric.value);
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Report web vitals metrics
reportWebVitals(handlePerformanceMetrics);
