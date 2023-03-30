import React, { useState, useEffect } from "react";
import axios from "axios";
import * as d3 from "d3";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/data");
        const data = response.data.result.slice(0, 20);
        setData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const x = d3.scaleBand().range([0, width]).padding(0.1);
  const y = d3.scaleLinear().range([height, 0]);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y).ticks(10);

  useEffect(() => {
    if (data.length > 0) {
      x.domain(data.map((d) => d.topic));
      y.domain([0, d3.max(data, (d) => d.intensity)]);
      d3.select(".x-axis").call(xAxis);
      d3.select(".y-axis").call(yAxis);
    }
  }, [data]);

  return (
    <div>
      <h1>Dashboard</h1>
      <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {data.map((d) => (
            <rect key={d._id} x={x(d.topic)} y={y(d.intensity)} width={x.bandwidth()} height={height - y(d.intensity)} fill="#4C4C6D" />
          ))}
          <g className="x-axis" transform={`translate(0,${height})`} />
          <g className="y-axis" />
        </g>
      </svg>
    </div>
  );
};

export default Dashboard;
