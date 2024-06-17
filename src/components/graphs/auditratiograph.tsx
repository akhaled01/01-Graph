import {
  BasicUserInfo,
  GetBasicUserInfo,
} from "@/logic/graphql/apollo/basicinfo";
import React, { FC, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { FMT_XP } from "@/logic/utils/xp";
import { MONO_THIN, SANS, SANS_BOLDER } from "@/styles/fonts";

const AuditRatioGraph: FC = () => {
  const [data, setdata] = useState<BasicUserInfo>();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    GetBasicUserInfo().then((data) => setdata(data!));
  }, []);

  useEffect(() => {
    if (!data) return;

    const auditdata = [data.auditUp, data.auditDown];
    const margin = { top: 30, right: 30, bottom: 55, left: 50 };
    const names = [
      `${FMT_XP(auditdata[0])} sent`,
      `${FMT_XP(auditdata[1])} recv`,
    ];
    const colors = ["#F1FFFC44", "#FFFFFF86"];
    const maxHeight = 250 - margin.top - margin.bottom;
    const maxWidth = 100;
    const biggerRatio = d3.max(auditdata);
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    const g = svg
      .attr("width", maxWidth + margin.left + margin.right)
      .attr("height", maxHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3
      .scaleBand()
      .range([0, maxWidth])
      .domain(
        names.map(function (d) {
          return d;
        })
      )
      .padding(0.15);
    g.append("g")
      .attr("transform", "translate(0," + maxHeight + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("class", `bar-label ${MONO_THIN.className}`)
      .attr("transform", "translate(-10,0)rotate(-15)")
      .style("color", "white")
      .style("text-anchor", "end");

    const y = d3
      .scaleLinear()
      .domain([0, biggerRatio as number])
      .range([maxHeight, 0]);

    d3.selectAll(".domain").attr("stroke", "#00000000");
    d3.selectAll("line").attr("stroke", "#00000000");

    g.selectAll("rect")
      .data(auditdata)
      .enter()
      .append("rect")
      .attr("x", (d, i) => x(names[i]) ?? "unknown")
      .attr("width", x.bandwidth() - 20)
      .attr("rx", 8)
      .attr("ry", 8)
      .attr("fill", (d, i) => colors[i])
      .attr("y", (d) => y(d))
      .attr("height", 0)
      .transition()
      .duration(2000)
      .delay(function (d, i) {
        console.log(i);
        return i * 100;
      })
      .attr("y", (d) => y(d))
      .attr("height", (d) => maxHeight - y(d));
  }, [data]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        ref={svgRef}
        className="flex items-center justify-center h-full w-1/2"
      ></svg>
      <div className="flex flex-col items-center justify-center gap-2">
        <p
          className={`${SANS_BOLDER.className} text-[4rem] ${
            data?.auditRatio! < 1 ? "text-orange-400" : "text-cyan-400"
          }`}
        >
          {data?.auditRatio.toFixed(1)}
        </p>
        <p
          className={`${SANS.className} text-[1rem] ${
            data?.auditRatio! < 1 ? "text-orange-400" : "text-cyan-400"
          }`}
        >
          {data?.auditRatio! < 1 ? "More Audits Pls!" : "Keep It Up!"}
        </p>
      </div>
    </div>
  );
};

export default AuditRatioGraph;
