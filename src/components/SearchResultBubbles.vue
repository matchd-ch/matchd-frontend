<template>
  <div id="diagram" class="search-result-bubbles min-h-content-with-fixed-bars"></div>
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
  jobPostingId = prop<string>({ default: "" });
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

  @Watch("matches")
  onUpdateMatches(): void {
    this.update();
  }

  mounted(): void {
    this.initD3();
    window.addEventListener("resize", this.resize, true);
  }

  unmounted() {
    window.removeEventListener("resize", this.resize, true);
  }

  resize(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      d3.select("#search-result-bubbles__svg").remove();
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
      .attr("x1", this.width / 2)
      .attr("y1", this.height / 2)
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
          .iterations(2)
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
      .data(links, (d: any) => `${d.source.id}-${d.target.id}`);
    link.exit().remove();
    return link
      .enter()
      .append("line")
      .classed(this.resultType, true)
      .style("opacity", (d: any) => d.value)
      .merge(link);
  }

  drawSVG(): void {
    this.diagram = d3
      .select("#diagram")
      .append("svg")
      .attr("id", "search-result-bubbles__svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`);
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

    /* Circle */
    result
      .append("circle")
      .attr("cx", this.rootRadius)
      .attr("cy", this.rootRadius)
      .classed("outer-circle", true)
      .attr("r", this.rootRadius + 2);

    result
      .append("circle")
      .attr("cx", this.rootRadius)
      .attr("cy", this.rootRadius)
      .classed("inner-circle", true)
      .attr("r", this.rootRadius);

    if (this.avatar) {
      /* Masked Image */
      result
        .append("image")
        .attr("clip-path", "url(#circleView)")
        .attr("x", 0)
        .attr("y", 0)
        .attr(
          "href",
          this.avatar?.url.replace(
            "{stack}",
            this.rootType === "student" ? "avatar" : "logo"
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
      .on("click", (event: MouseEvent, d: any) => {
        event.preventDefault();
        this.$emit("clickResult", d.id);
      })
      .attr("href", (d: any) => {
        switch (this.resultType) {
          case "jobposting":
            return `/stellen/${d.id}`;
          case "company":
            return `/companies/${d.id}`;
          default:
            return `/talente/${d.id}/?jobPostingId=${this.jobPostingId}`;
        }
      });
    /* Circle */
    result
      .append("circle")
      .classed("outer-circle", true)
      .attr("cx", this.resultRadius)
      .attr("cy", this.resultRadius)
      .attr("r", this.resultRadius + 1);
    result
      .append("circle")
      .classed("inner-circle", true)
      .attr("cx", this.resultRadius)
      .attr("cy", this.resultRadius)
      .attr("r", this.resultRadius);
    /* First Text Line */
    result
      .append("text")
      .attr("x", this.resultRadius)
      .attr("y", this.resultRadius * 2 + 16)
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle")
      .text((d: any) => (this.resultType === "jobposting" ? d.jobPostingTitle : d.name));
    if (this.resultType === "jobposting") {
      /* Second Text Line */
      result
        .append("text")
        .attr("x", this.resultRadius)
        .attr("y", this.resultRadius * 2 + 32)
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "middle")
        .text((d: any) => d.name);
    }

    /* Masked Image */
    result
      .append("image")
      .attr("clip-path", "url(#circleView)")
      .attr("x", 0)
      .attr("y", 0)
      .attr("href", (d: any) =>
        d.img.replace("{stack}", this.resultType === "student" ? "avatar" : "logo")
      )
      .attr("width", this.resultRadius * 2)
      .attr("height", this.resultRadius * 2);

    const matchStatus = result
      .append("g")
      .classed("match-status", true)
      .classed("match-status--confirmed", (d: any) => d.matchStatus?.confirmed === true)
      .classed("match-status--unconfirmed", (d: any) => d.matchStatus?.confirmed === false);
    matchStatus
      .append("circle")
      .attr("cx", this.resultRadius + Math.sqrt(Math.pow(this.resultRadius, 2) / 2))
      .attr("cy", this.resultRadius + Math.sqrt(Math.pow(this.resultRadius, 2) / 2))
      .attr("r", 15);
    matchStatus
      .append("text")
      .classed("material-icons", true)
      .attr("dominant-baseline", "mathematical")
      .attr("text-anchor", "middle")
      .attr("x", this.resultRadius + Math.sqrt(Math.pow(this.resultRadius, 2) / 2))
      .attr("y", this.resultRadius + Math.sqrt(Math.pow(this.resultRadius, 2) / 2))
      .text((d: any) => (d.matchStatus?.confirmed ? "people" : "record_voice_over"));
  }
}
</script>

<style lang="postcss">
@keyframes scan {
  0% {
    stroke-width: 0;
    stroke-opacity: 1;
  }
  60%,
  100% {
    stroke-width: 100;
    stroke-opacity: 0;
  }
}
</style>

<style lang="postcss" scoped>
#diagram :deep(svg) {
  width: 100%;
  max-height: 100%;

  & line {
    &.company {
      stroke: var(--color-pink-1);
    }

    &.jobposting {
      stroke: var(--color-orange-1);
    }

    &.student {
      stroke: var(--color-green-1);
    }
  }

  & .root {
    & .outer-circle {
      animation: scan 4s infinite;
    }

    & .inner-circle {
      fill: var(--color-white);
    }

    &.student .outer-circle {
      fill: var(--color-green-1);
      stroke: var(--color-green-1);
    }

    &.jobposting .outer-circle {
      fill: var(--color-orange-1);
      stroke: var(--color-orange-1);
    }

    &.company .outer-circle {
      fill: var(--color-pink-1);
      stroke: var(--color-pink-1);
    }
  }

  & .node {
    & .match-status {
      visibility: hidden;

      & text {
        font-size: 1.125rem;
      }
    }

    & .match-status--confirmed,
    & .match-status--unconfirmed {
      visibility: visible;
    }

    & .outer-circle {
      @apply transition-all;
      stroke-width: 0;
      stroke-opacity: 0;
    }

    &:hover {
      & .outer-circle {
        stroke-width: 10;
        stroke-opacity: 0.3;
      }
    }
  }

  & .node {
    & a {
      pointer-events: visible;
    }

    & text {
      @apply transition-all;
      fill: var(--color-black);
    }

    & a:visited {
      & text {
        fill: var(--color-grey-2);
      }
    }

    &.company {
      & .outer-circle {
        fill: var(--color-pink-1);
        stroke: var(--color-pink-1);
      }

      & .match-status text,
      & .inner-circle {
        fill: var(--color-white);
      }

      & .match-status circle,
      & a:hover > text {
        fill: var(--color-pink-1);
      }
    }

    &.jobposting {
      & .outer-circle {
        fill: var(--color-orange-1);
        stroke: var(--color-orange-1);
      }

      & .match-status text,
      & .inner-circle {
        fill: var(--color-white);
      }

      & .match-status circle,
      & a:hover > text {
        fill: var(--color-orange-1);
      }

      & text:nth-of-type(1) {
        font-weight: 500;
      }
    }

    &.student {
      & .outer-circle {
        fill: var(--color-green-1);
        stroke: var(--color-green-1);
      }

      & .match-status text,
      & .inner-circle {
        fill: var(--color-white);
      }

      & .match-status circle,
      & a:hover > text {
        fill: var(--color-green-1);
      }
    }
  }
}
</style>
