<template>
  <div id="vis" class="h-screen"></div>
</template>

<script lang="ts">
import { SearchLink, SearchNode } from "@/store/modules/content/getters";
import type { Attachment } from "api";
import * as d3 from "d3";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  matches = prop<{
    nodes: SearchNode[];
    links: SearchLink[];
  }>({ default: [] });
  resultType = prop<string>({ default: "" });
  avatar = prop<Attachment>({});
}

@Options({})
export default class SearchResultBubbles extends Vue.with(Props) {
  vis: any = {} as any;

  get rootColor(): string {
    switch (this.resultType) {
      case "jobposting":
        return "#1FAC01";
      default:
        return "#FF8963";
    }
  }

  get resultColor(): string {
    switch (this.resultType) {
      case "company":
        return "#F21D6A";
      case "jobposting":
        return "#FF8963";
      default:
        return "#1FAC01";
    }
  }

  mounted() {
    const links = this.matches.links.map((d: any) => Object.create(d));
    const nodes = this.matches.nodes.map((d: any) => Object.create(d));

    this.drawSVG();
    const link = this.createLinks(links);
    const node = this.createNodes(nodes);

    this.drawRoot();
    this.drawResults();

    d3.forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance((d: any) => (1 - d.value) * 300)
      )
      .force("charge", d3.forceManyBody())
      .force(
        "collisionForce",
        d3
          .forceCollide((d: SearchNode) => (d.main ? 60 : 40))
          .strength(1)
          .iterations(100)
      )
      .force("center", d3.forceCenter(600 / 2, 600 / 2))
      .on("tick", () => {
        link
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y);

        node.attr("transform", (d: any) => {
          if (!d.main) {
            return `translate(${d.x - 20},${d.y - 20})`;
          }
          return "";
        });
      });
  }

  createNodes(nodes: SearchNode[]): any {
    return this.vis
      .selectAll("g.node")
      .data(nodes)
      .enter()
      .append("svg:g")
      .attr("class", (d: SearchNode) => (d.main ? "root" : "node"));
  }

  createLinks(links: SearchLink[]): any {
    return this.vis
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .style("stroke", this.resultColor)
      .style("opacity", (d: any) => d.value)
      .attr("x1", 300)
      .attr("y1", 300);
  }

  drawSVG(): void {
    this.vis = d3.select("#vis").append("svg").attr("viewBox", `0 0 600 600`);

    const defs = d3.select("#vis").select("svg").append("defs");
    defs
      .append("clipPath")
      .attr("clipPathUnits", "objectBoundingBox")
      .attr("id", "circleView")
      .append("circle")
      .attr("r", 0.5)
      .attr("cx", 0.5)
      .attr("cy", 0.5);
    defs
      .append("path")
      .attr("id", "circleText")
      .attr("d", "M 25, 50 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0");
  }

  drawRoot(): void {
    if (this.avatar) {
      d3.select(".root")
        .append("circle")
        .attr("cx", 300)
        .attr("cy", 300)
        .attr("r", 30)
        .attr("fill", this.rootColor);
      d3.select(".root")
        .append("image")
        .attr("x", 300 - 15)
        .attr("y", 300 - 15)
        .attr("href", this.avatar?.url.replace("{stack}", "avatar") || "")
        .attr("width", 30)
        .attr("height", 30);
    } else {
      d3.select(".root")
        .append("circle")
        .attr("cx", 300)
        .attr("cy", 300)
        .attr("r", 30)
        .attr("fill", this.rootColor);
    }
  }

  drawResults(): void {
    const result = d3
      .selectAll(".node")
      .append("a")
      .attr("href", (d: any) =>
        this.resultType === "talents" ? `/talente/${d.id}` : `/companies/${d.id}`
      )
      .on("click", (event: MouseEvent) => {
        event.preventDefault();
        return false;
      });
    result
      .append("circle")
      .attr("cx", 20)
      .attr("cy", 20)
      .attr("r", 21)
      .attr("fill", this.resultColor);
    result
      .append("text")
      .attr("font-size", "8")
      .attr("fill", "currentColor")
      .attr("x", "20")
      .attr("y", "48")
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle")
      .text((d: any) => d.name);
    result
      .append("image")
      .attr("clip-path", "url(#circleView)")
      .attr("x", 0)
      .attr("y", 0)
      .attr("href", (d: any) => d.img.replace("{stack}", "mobile-square"))
      .attr("width", 40)
      .attr("height", 40);

    result.on("click", (event: MouseEvent, d: any) => {
      this.$emit("clickResult", d.slug);
    });
  }
}
</script>

<style lang="postcss" scoped>
#vis :deep(svg) {
  width: 100%;
  max-height: 100%;

  & .root {
    & image {
      filter: brightness(0) invert(1);
    }
  }

  & .node {
    cursor: pointer;

    & a:visited {
      @apply text-grey-2;
    }

    &:hover {
      @apply text-green-1;
    }
  }
}
</style>
