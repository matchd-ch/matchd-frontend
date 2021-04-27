import { ProfileType } from "@/api/models/types";

export interface SearchResult {
  id: string;
  name: string;
  img: string;
  score: number;
  rawScore: number;
  matchStatus?: { initiator?: ProfileType; confirmed?: boolean };
}
