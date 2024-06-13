import React, { FC, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { GetXPPerProj, XP_PROJ } from "@/logic/graphql/apollo/xptime";
import { Turncate } from "@/logic/utils/turncate";
import { MONO_THIN } from "@/styles/fonts";

/**
 * Invokes a GraphQL query to an array of projects
 * @returns D3 Bar chart of top 10 projects
 */
const XPPROJCHART: FC = () => {
  const [data, setdata] = useState<XP_PROJ[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    GetXPPerProj().then((data) => setdata(data));
  }, []);

  useEffect(() => {
    // process data
    if (!data || data.length === 0) return;
    const processeedData = data
      .sort((a, b) => a.amount - b.amount)
      .slice(-10)
      .map((project) => ({
        ...project,
        name: Turncate(project.name),
      }));

    let max_xp_project = processeedData.reduce((prev, current) => {
      return prev.amount > current.amount ? prev : current;
    });

    // construct graph with D3
    const margin = { top: 10, right: 30, bottom: 110, left: 50 };
    let width = 500 - margin.left - margin.right;
    let height = 250 - margin.top - margin.bottom;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        processeedData.map((d) => {
          return d.name;
        })
      )
      .padding(0.2);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .attr("class", MONO_THIN.className)
      .style("color", "white");

    let y = d3
      .scaleLinear()
      .domain([0, max_xp_project.amount])
      .range([height, 0]);

    g.selectAll("bar")
      .data(processeedData)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.name) ?? "unknown";
      })
      .attr("width", x.bandwidth())
      .attr("fill", "#FFFFFF76")
      .attr("rx", 8)
      .attr("height", function (d) {
        return height - y(0);
      })
      .attr("y", function (d) {
        return y(0);
      })
      .transition()
      .duration(2000)
      .attr("y", (d) => y(d.amount))
      .attr("height", (d) => height - y(d.amount));
  }, [data]);

  return (
    <div className="w-fit h-fit rounded-lg bg-componentBg py-4 px-4 flex items-center justify-center">
      <svg
        ref={svgRef}
        className="flex items-center justify-center h-fit w-fit"
      ></svg>
    </div>
  );
};

export default XPPROJCHART;
