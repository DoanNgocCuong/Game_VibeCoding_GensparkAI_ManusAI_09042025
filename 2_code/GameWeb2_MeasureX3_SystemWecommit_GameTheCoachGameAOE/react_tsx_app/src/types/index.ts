export interface Task {
  id: number;
  name: string;
  tags: string[];
  value: number;
  date: string;
  timestamp: number;
}

export interface Tag {
  xp: number;
  level: number;
  color: string;
  taskCount: number;
}

export interface TagStats {
  totalValue: number;
  taskCount: number;
}

export interface XPProgress {
  currentXP: number;
  requiredXP: number;
  percentage: number;
} 