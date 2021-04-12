<template>
  <div id="vis" class="search-result-bubbles"></div>
</template>

<script lang="ts">
import { SearchLink, SearchNode, SearchResultBubbleData } from "@/models/SearchResultBubbleData";
import type { Attachment } from "api";
import * as d3 from "d3";
import { Options, prop, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

class Props {
  matches = prop<SearchResultBubbleData>({ default: [] });
  resultType = prop<string>({ default: "" });
  avatar = prop<Attachment>({});
}

@Options({})
export default class SearchResultBubbles extends Vue.with(Props) {
  vis: any = {} as any;
  force: any = {} as any;
  node: any = [];
  link: any = [];
  width = 0;
  height = 0;
  ratio = 0;

  resultRadius = 40;
  rootRadius = 60;

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

  @Watch("matches")
  onUpdateMatches(): void {
    this.update();
  }

  mounted(): void {
    const element = document.getElementById("vis") as HTMLElement;
    this.width = parseInt(window.getComputedStyle(element).getPropertyValue("width"));
    this.height = parseInt(window.getComputedStyle(element).getPropertyValue("height"));
    this.ratio = this.width / this.height;

    this.drawSVG();
    this.initForce();
    this.update();
  }

  update(): void {
    this.link = this.createLinks(this.matches.links);
    this.node = this.createNodes(this.nodes);
    this.drawRoot();
    this.drawResults();
    this.initForce();
  }

  tick(): void {
    this.link
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y)
      .attr("id", (d: any) => {
        return d.id;
      });

    this.node.attr("transform", (d: any) => {
      return `translate(${d.x - this.resultRadius},${d.y - this.resultRadius})`;
    });
  }

  initForce(): void {
    this.force = d3
      .forceSimulation(this.nodes)
      .force(
        "link",
        d3
          .forceLink(this.matches.links)
          .id((d: any) => d.id)
          .distance((d: any) => (1 - d.value) * 400)
      )
      .force("charge", d3.forceManyBody())
      .force(
        "collisionForce",
        d3
          .forceCollide((d: SearchNode) => (d.main ? this.rootRadius * 2 : this.resultRadius * 2))
          .strength(0.2)
          .iterations(10)
      )
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))
      .on("tick", this.tick);
  }

  createNodes(nodes: SearchNode[]): any {
    const node = this.vis.selectAll("g").data(nodes, (d: any) => d.id);
    node.selectAll("*").remove();
    node.exit().remove();
    return node
      .enter()
      .append("svg:g")
      .attr("class", (d: SearchNode) => (d.main ? "root" : "node"))
      .merge(node)
      .raise();
  }

  createLinks(links: SearchLink[]): any {
    const link = this.vis
      .selectAll("line")
      .data(links, (d: any) => `${d.source.id}-${d.target.id}`);
    link.exit().remove();
    return link
      .enter()
      .append("line")
      .style("stroke", this.resultColor)
      .style("opacity", (d: any) => d.value)
      .merge(link);
  }

  drawSVG(): void {
    this.vis = d3.select("#vis").append("svg").attr("viewBox", `0 0 ${this.width} ${this.height}`);

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
        .attr("cx", this.rootRadius / 2)
        .attr("cy", this.rootRadius / 2)
        .attr("r", this.rootRadius)
        .attr("fill", this.rootColor);
      d3.select(".root")
        .append("image")
        .attr("x", 0)
        .attr("y", 0)
        .attr("href", this.avatar?.url.replace("{stack}", "avatar") || "")
        .attr("width", this.rootRadius)
        .attr("height", this.rootRadius);
    } else {
      d3.select(".root")
        .append("circle")
        .attr("cx", this.rootRadius / 2)
        .attr("cy", this.rootRadius / 2)
        .attr("r", this.rootRadius)
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
      .attr("cx", this.resultRadius)
      .attr("cy", this.resultRadius)
      .attr("r", this.resultRadius + 1)
      .attr("fill", this.resultColor);
    result
      .append("text")
      .attr("font-size", "16")
      .attr("fill", "currentColor")
      .attr("x", this.resultRadius)
      .attr("y", this.resultRadius * 2 + 12)
      .attr("dominant-baseline", "middle")
      .attr("text-anchor", "middle")
      .text((d: any) => d.name);
    result
      .append("image")
      .attr("clip-path", "url(#circleView)")
      .attr("x", 0)
      .attr("y", 0)
      .attr("href", (d: any) => d.img.replace("{stack}", "mobile-square"))
      .attr("width", this.resultRadius * 2)
      .attr("height", this.resultRadius * 2);

    result.on("click", (event: MouseEvent, d: any) => {
      this.$emit("clickResult", d.slug);
    });
  }
}
</script>

<style lang="postcss" scoped>
@block search-result-bubbles {
  height: calc(100vh - 7.1875rem - 5.5rem);
}

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
