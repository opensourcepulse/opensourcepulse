export interface Repository {
  id: string;
  owner: string;
  name: string;
  fullName: string;
  url: string;
  description: string;
}

export interface RepositoryMetrics {
  [key: string]: {
    commits: number;
    issues: number;
    openPRs: number;
  };
}

export interface MetricsData {
  timestamp: string;
  metrics: Record<string, MetricEntry>;
  repositories: Repository[];
}

export interface MetricEntry {
  commits: number;
  issues: number;
  openPRs: number;
}
