import type { ProfileType } from "@/api/models/types";

export interface SearchResult {
  id: string;
  name: string;
  description?: string;
  keywords?: string[];
  title?: string | null;
  img: string;
  score: number;
  rawScore: number;
  matchStatus?: { initiator?: ProfileType; confirmed?: boolean };
}
