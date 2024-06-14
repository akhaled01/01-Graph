"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  AuditeePassRatio,
  GetAuditorStrictness,
} from "@/logic/graphql/apollo/auditeepassratio";
import { MONO_NORMAL, MONO_THIN } from "@/styles/fonts";

const AuditeePassGraph: FC = () => {
  const [data, setData] = useState<AuditeePassRatio | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    GetAuditorStrictness().then((rawData): void => {
      setData(rawData);
    });
  }, []);

  useEffect(() => {
    if (!data || data.pass === undefined || data.fail === undefined) return;

    const ratioData = [data.pass, data.fail];
    const ratioDataStr = [
      `Passed ${data.pass.toString()}`,
      `Failed ${data.fail.toString()}`,
    ];
    const margin = { top: 30, right: 30, bottom: 55, left: 50 };
    const maxWidth = 350;
    const maxHeight = 150;
    const radius = 100;
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove(); // Clear previous content

    const g = svg
      .append("g")
      .attr("width", maxWidth)
      .attr("height", maxHeight)
      .attr(
        "transform",
        `translate(${maxWidth / 2}, ${maxHeight / 2 + margin.top})`
      );

    const color = d3
      .scaleOrdinal<string>()
      .domain(ratioDataStr)
      .range(["#A8FF756B", "#FF3A3A5C"]);

    const pie = d3.pie<number>().value((d: number): number => d);
    const data_ready = pie(ratioData);

    const arcGenerator = d3
      .arc<d3.PieArcDatum<number>>()
      .innerRadius(0)
      .outerRadius(radius);

    g.selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arcGenerator as any)
      .attr(
        "fill",
        (d: d3.PieArcDatum<number>) => color(d.data.toString()) as string
      )
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    g.selectAll("text")
      .data(data_ready)
      .enter()
      .append("text")
      .text((d, i) => ratioDataStr[i])
      .attr(
        "transform",
        (d: d3.PieArcDatum<number>) => `translate(${arcGenerator.centroid(d)})`
      )
      .style("text-anchor", "middle")
      .style("font-size", 10)
      .attr("class", MONO_NORMAL.className)
      .style("fill", "white");
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <svg
        ref={svgRef}
        className="w-full h-full flex items-center justify-center"
      ></svg>
    </div>
  );
};

export default AuditeePassGraph;
