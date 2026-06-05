export interface StreakMeta {
  title: string;
  ref: string;
}

export interface Streak {
  $id: string;
  date: string;
  dsaDone: boolean;
  dsaCount: number;
  dsaMeta: StreakMeta[];
  nodeDone: boolean;
  nodeCount: number;
  nodeMeta: StreakMeta[];
  systemDone: boolean;
  systemCount: number;
  systemMeta: StreakMeta[];
  $createdAt: string;
  $updatedAt: string;
}

export interface StreakPayload {
  date: string;
  dsaDone: boolean;
  dsaCount: number;
  dsaMeta: StreakMeta[];
  nodeDone: boolean;
  nodeCount: number;
  nodeMeta: StreakMeta[];
  systemDone: boolean;
  systemCount: number;
  systemMeta: StreakMeta[];
}
