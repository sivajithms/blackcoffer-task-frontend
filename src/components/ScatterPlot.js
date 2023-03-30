import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import axios from "axios";

const ScatterPlot = () => {
  const [data, setData] = useState([]);

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/data");
        const data = response.data.result.slice(0, 1000);
        setData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Render scatter plot when data is loaded
  useEffect(() => {
    if (data.length > 0) {
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 960 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const x = d3.scaleLinear().range([0, width]);
      const y = d3.scaleLinear().range([height, 0]);

      const svg = d3
        .select("#scatter-plot")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Set domain of x and y scales based on data
      x.domain(d3.extent(data, (d) => d.intensity));
      y.domain(d3.extent(data, (d) => d.relevance));

      // Add x-axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add y-axis
      svg.append("g").call(d3.axisLeft(y));

      // Add circles
      svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.intensity))
        .attr("cy", (d) => y(d.relevance))
        .attr("r", 5);
    }
  }, [data]);

  return <svg id="scatter-plot"></svg>;
};

export default ScatterPlot;
