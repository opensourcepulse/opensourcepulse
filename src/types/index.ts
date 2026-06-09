export interface Repository {
  id: string;
  owner: string;
  name: string;
  fullName: string;
  url: string;
  description: string;
}

export interface DailyMetric {
  date: string;
  commits: number;
  issues: number;
  openPRs: number;
}

export interface RepositoryHistory {
  history: DailyMetric[];
}

export interface RepositoryMetrics {
  [key: string]: RepositoryHistory;
}

export interface MetricsData {
  timestamp: string;
  metrics: RepositoryMetrics;
  repositories?: Repository[];
}

export interface MetricEntry {
  commits: number;
  issues: number;
  openPRs: number;
}
