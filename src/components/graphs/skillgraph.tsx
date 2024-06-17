import { GetSkills, SkillMax } from "@/logic/graphql/apollo/skills";
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

const SkillGraph = () => {
  const [data, setdata] = useState<SkillMax[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    GetSkills().then((data) => setdata(data));
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const margin = { top: 100, right: 0, bottom: 0, left: 0 },
      width = 350 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom,
      innerRadius = Math.min(width, height) / 2,
      outerRadius = 120;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width / 2 + margin.left},${height / 2 + margin.top})`
      );

    const x = d3
      .scaleBand()
      .range([0, 2 * Math.PI])
      .domain(data.map((d) => d.skill));

    const y = d3
      .scaleRadial()
      .range([innerRadius, outerRadius])
      .domain([0, d3.max(data, (d) => d.max) || 0]);

    g.selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("fill", "#FFFFFF7D")
      .attr(
        "d",
        d3
          .arc<any>()
          .innerRadius(innerRadius)
          .outerRadius((d) => y(d.max))
          .startAngle((d) => x(d.skill) as number)
          .endAngle((d) => (x(d.skill) as number) + x.bandwidth())
          .padAngle(0.01)
          .padRadius(innerRadius)
      );

    g.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("text-anchor", function (d) {
        return (x(d.skill)! + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
          Math.PI
          ? "end"
          : "start";
      })
      .attr("transform", function (d) {
        return (
          "rotate(" +
          (((x(d.skill)! + x.bandwidth() / 2) * 180) / Math.PI - 90) +
          ")" +
          "translate(" +
          (y(d.max) + 10) +
          ",0)"
        );
      })
      .append("text")
      .text(function (d) {
        return d.skill;
      })
      .attr("transform", function (d) {
        return (x(d.skill)! + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
          Math.PI
          ? "rotate(180)"
          : "rotate(0)";
      })
      .style("font-size", "7px")
      .style("fill", "#ffffff")
      .attr("alignment-baseline", "middle");
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <svg
        ref={svgRef}
        className="w-full h-full py-1 flex items-center justify-center"
      ></svg>
    </div>
  );
};

export default SkillGraph;
