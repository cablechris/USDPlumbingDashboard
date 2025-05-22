// Shared type definitions

export type Status = 'green' | 'amber' | 'red' | 'stale';

export interface Metric {
  id: string;
  title: string;
  value: number;
  status: Status;
  description: string;
  lastUpdated: string;
  // Optional fields
  delta?: string;
  series?: number[];
}

export interface SignalsData {
  metrics: Metric[];
  move: number;
  repoSpread: number;
  lastUpdated: string;
}

// Typed API responses
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
} 