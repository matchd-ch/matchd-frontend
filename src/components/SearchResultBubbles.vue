<template>
  <div id="diagram" class="search-result-bubbles"></div>
</template>

<script lang="ts">
/* eslint-disable */
/* todo: add proper typings and refactor */

import { SearchLink, SearchNode, SearchResultBubbleData } from "@/models/SearchResultBubbleData";
import type { Attachment } from "api";
import * as d3 from "d3";
import { Options, prop, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

class Props {
  matches = prop<SearchResultBubbleData>({ default: [] });
  rootType = prop<string>({ default: "" });
  resultType = prop<string>({ default: "" });
  avatar = prop<Attachment>({});
}

@Options({
  emits: ["clickResult"],
})
export default class SearchResultBubbles extends Vue.with(Props) {
  diagram: any = {} as any;
  force: any = {} as any;
  node: any = [];
  link: any = [];
  width = 0;
  height = 0;
  ratio = 0;

  resultRadius = 40;
  rootRadius = 60;
  maxResults = 50;

  resizeTimeout: number | null = null;

  get nodes(): SearchNode[] {
    return this.matches.nodes.map((node) => {
      if (!node.main) {
        return node;
      }
      return {
        ...node,
        fx: this.width / 2,
        fy: this.height / 2,
      };
    });
  }

  get links(): SearchLink[] {
    return this.matches.links;
  }

  get rootColor(): string {
    switch (this.rootType) {
      case "company":
        return "#F21D6A";
      case "jobposting":
        return "#FF8963";
      default:
        return "#1FAC01";
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

  @Watch("matches")
  onUpdateMatches(): void {
    this.link
    this.update();
  }

  mounted(): void {
    this.initD3();
    window.addEventListener("resize", this.resize);
  }

  onUnmounted() {
    window.removeEventListener("resize", this.resize);
  }

  resize(): void {
    if(this.resizeTimeout) {
      clearTimeout(this.resizeTimeout)
    }
    this.resizeTimeout = setTimeout(() => {
      d3.select("svg").remove();
      this.initD3();
    }, 200);
  }

  initD3(): void {
    const element = document.getElementById("diagram") as HTMLElement;
    this.width = parseInt(window.getComputedStyle(element).getPropertyValue("width"));
    this.height = parseInt(window.getComputedStyle(element).getPropertyValue("height"));
    this.ratio = this.width / this.height;

    this.drawSVG();
    this.initForce();
    this.update();
  }

  update(): void {
    this.link = this.createLinks(this.links);
    this.node = this.createNodes(this.nodes);
    this.drawRoot();
    this.drawResults();
    this.initForce();
  }

  tick(): void {
    this.link
      .attr("x1", this.width/2)
      .attr("y1", this.height/2)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);

    this.node.attr("transform", (d: any) => {
      if (d.main) {
        return `translate(${d.x - this.rootRadius},${d.y - this.rootRadius})`;
      }
      return `translate(${d.x - this.resultRadius},${d.y - this.resultRadius})`;
    });
  }

  initForce(): void {
    this.force = d3
      .forceSimulation(this.nodes)
      .force(
        "link",
        d3
          .forceLink(this.links)
          .id((d: any) => d.id)
          // .strength((d: any) => d.value)
          .distance((d: any) => (1 - d.value) * 600)
      )
      .force("charge", d3.forceManyBody())
      .force(
        "collisionForce",
        d3
          .forceCollide((d: SearchNode) =>
            d.main ? this.rootRadius * 1.2 : this.resultRadius * 1.7
          )
          .strength(1)
          .iterations(2)
      )
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))
      .restart()
      .on("tick", this.tick);
  }

  createNodes(nodes: SearchNode[]): any {
    const node = this.diagram.selectAll("g").data(nodes, (d: any) => d.id);
    node.selectAll("*").remove();
    node.exit().remove();
    return node
      .enter()
      .append("svg:g")
      .attr("class", (d: SearchNode) =>
        d.main ? `root ${this.rootType}` : `node ${this.resultType}`
      )
      .merge(node)
      .raise();
  }

  createLinks(links: SearchLink[]): any {
    const link = this.diagram
       .selectAll("line")
       .data(links, (d: any) => `${d.source.id}-${d.target.id}`)
    link.exit().remove();
    return link
      .enter()
      .append("line")
      .style("stroke", this.resultColor)
      .style("opacity", (d: any) => d.value)
      .merge(link);
  }

  drawSVG(): void {
    this.diagram = d3.select("#diagram").append("svg").attr("viewBox", `0 0 ${this.width} ${this.height}`);
    const defs = this.diagram.append("defs");
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
    const result = d3.selectAll(".root");

    result
      .append("circle")
      .attr("cx", this.rootRadius)
      .attr("cy", this.rootRadius)
      .attr("r", this.rootRadius + 2)
      .attr("fill", this.rootColor);

    if (this.avatar) {
      result
        .append("image")
        .attr("clip-path", "url(#circleView)")
        .attr("x", 0)
        .attr("y", 0)
        .attr(
          "href",
          this.avatar?.url.replace(
            "{stack}",
            this.rootType === "student" ? "mobile-square" : "avatar"
          ) || ""
        )
        .attr("width", this.rootRadius * 2)
        .attr("height", this.rootRadius * 2);
    }
  }

  drawResults(): void {
    const result = d3
      .selectAll(".node")
      .append("a")
      .attr("class", "node-link")
      .style("pointer-events", "visible")
      .on("click", (event: MouseEvent, d: any) => {
        event.preventDefault();
        this.$emit("clickResult", d.id);
      })
      .attr("href", (d: any) => {
        switch (this.resultType) {
          case "jobposting":
            return `/stellen/${d.id}`;
          case "company":
            return `companies/${d.id}`;
          default:
            return `/talente/${d.id}`;
        }
      });
    result
      .append("circle")
      .attr("cx", this.resultRadius)
      .attr("cy", this.resultRadius)
      .attr("r", this.resultRadius + 1)
      .attr("fill", this.resultColor);
    result
      .append("text")
      .attr("font-size", "16")
      .attr("fill", "currentColor")
      .attr("x", this.resultRadius)
      .attr("y", this.resultRadius * 2 + 16)
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle")
      .attr("font-weight", this.resultType === "jobposting" ? "500" : "normal")
      .text((d: any) => (this.resultType === "jobposting" ? d.jobPostingTitle : d.name));
    if (this.resultType === "jobposting") {
      result
        .append("text")
        .attr("font-size", "16")
        .attr("fill", "currentColor")
        .attr("x", this.resultRadius)
        .attr("y", this.resultRadius * 2 + 32)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "middle")
        .text((d: any) => d.name);
    }

    result
      .append("image")
      .attr("clip-path", "url(#circleView)")
      .attr("x", 0)
      .attr("y", 0)
      .attr("href", (d: any) =>
        d.img.replace("{stack}", this.resultType === "student" ? "mobile-square" : "avatar")
      )
      .attr("width", this.resultRadius * 2)
      .attr("height", this.resultRadius * 2);
  }
}
</script>

<style lang="postcss" scoped>
@block search-result-bubbles {
  height: calc(100vh - 7.1875rem - 5.5rem);
}

#diagram :deep(svg) {
  width: 100%;
  max-height: 100%;

  & .company,
  & .jobposting {
    & image {
      filter: brightness(0) invert(1);
    }
  }

  & .node {
    cursor: pointer;

    & a:visited {
      @apply text-grey-2;
    }

    &.company {
      &:hover {
        @apply text-pink-1;
      }
    }

    &.student {
      &:hover {
        @apply text-green-1;
      }
    }

    &.jobposting {
      &:hover {
        @apply text-orange-2;
      }
    }
  }
}
</style>
