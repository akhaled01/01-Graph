import * as d3 from "d3";

interface Node extends d3.SimulationNodeDatum {
  id: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: number | Node;
  target: number | Node;
}

/**
 * akhaled01 here! this was quite weird to figure out (with chatGPT Help ofc).
 * You are free to use :), but pls credit me lol.
 */
export const NetGraph = () => {
  // Generate random nodes and links
  const generateData = (numNodes: number, numLinks: number) => {
    const nodes = Array.from({ length: numNodes }, (_, i) => ({ id: i }));
    const links = Array.from({ length: numLinks }, () => ({
      source: Math.floor(Math.random() * numNodes),
      target: Math.floor(Math.random() * numNodes),
    }));
    return { nodes, links };
  };

  const { nodes, links } = generateData(20, 40);

  // Set the dimensions and margins of the graph
  const width = 800;
  const height = 600;

  // Select the container and remove previous svg if it exists
  d3.select("#welcome_graph").select("svg").remove();

  // Append the svg object to the body of the page
  const svg = d3
    .select("#welcome_graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Initialize the links
  const link = svg
    .selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", 1);

  // Initialize the nodes
  const node = svg
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", 5)
    .attr("fill", "white");

  // Create the force simulation
  const simulation = d3
    .forceSimulation<Node>(nodes)
    .force(
      "link",
      d3
        .forceLink<Node, Link>(links)
        .id((d: any) => d.id)
        .distance(50)
    )
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
    });

  // Dragging functionality
  const drag = d3
    .drag<SVGCircleElement, Node>()
    .on("start", (event: any, d: any) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", (event: any, d: any) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on("end", (event: any, d: any) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });

  node.call(drag);
};
