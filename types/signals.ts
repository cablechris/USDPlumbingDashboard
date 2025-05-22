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
  date: string;
  red_count: number;
  amber_count: number;
  move: { value: number; status: 'green' | 'amber' | 'red' };
}; 