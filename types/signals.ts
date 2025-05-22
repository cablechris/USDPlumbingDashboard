export type Metric = {
  id: string;
  title: string;
  value: number;
  status: 'green' | 'amber' | 'red';
  description: string;
  lastUpdated: string;
};

export type SignalsResponse = {
  metrics: Metric[];
  move: number;
  repoSpread: number;
  lastUpdated: string;
}; 