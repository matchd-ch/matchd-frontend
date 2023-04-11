import type { SearchResult } from "@/models/SearchResult";

export interface SearchNode extends SearchResult {
  main: boolean;
  fx?: number;
  fy?: number;
}

export interface SearchLink {
  source: string;
  target: string;
  value: number;
}

export interface SearchResultBubbleData {
  nodes: SearchNode[];
  links: SearchLink[];
}
