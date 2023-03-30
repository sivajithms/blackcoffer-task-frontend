import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const BarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/data");
        setData(response.data.result);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.topic))
      .range([0, 300])
      .padding(0.1);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .range([150, 0]);

    svg.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => xScale(d.topic))
      .attr('y', d => yScale(d.intensity))
      .attr('width', xScale.bandwidth())
      .attr('height', d => 150 - yScale(d.intensity));
  }, [data]);

  return (
    <svg ref={ref} width={300} height={150} />
  );
};

export default BarChart;
