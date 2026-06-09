import { useMemo } from 'react';
import { ColumnChart } from './ColumnChart';
import { ChartCard } from './ChartCard';
import { MetricsData } from '../../types';

interface DashboardProps {
  data: MetricsData;
}

export const Dashboard = ({ data }: DashboardProps) => {
  const chartData = useMemo(() => {
    const labels = Object.keys(data.metrics).map(key => {
      const parts = key.split('/');
      return parts.length > 1 ? parts[1] : key;
    });

    const commits = Object.values(data.metrics).map(m => m.commits);
    const issues = Object.values(data.metrics).map(m => m.issues);
    const openPRs = Object.values(data.metrics).map(m => m.openPRs);

    return { labels, commits, issues, openPRs };
  }, [data]);

  const lastUpdated = new Date(data.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });

  return (
    <section id="dashboard" className="py-12 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900 dark-mode-transition">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Metrics Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Last updated: {lastUpdated} UTC
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <ChartCard 
            title="Total Commits by Repository"
            description="Cumulative commit count across all tracked projects"
          >
            <ColumnChart 
              title="Commits"
              data={chartData}
              metric="commits"
            />
          </ChartCard>

          <ChartCard 
            title="Total Issues by Repository"
            description="Number of closed and open issues in each project"
          >
            <ColumnChart 
              title="Issues"
              data={chartData}
              metric="issues"
            />
          </ChartCard>

          <ChartCard 
            title="Open Pull Requests by Repository"
            description="Currently open pull requests in each project"
          >
            <ColumnChart 
              title="Open PRs"
              data={chartData}
              metric="openPRs"
            />
          </ChartCard>
        </div>

        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 dark-mode-transition">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📊 Data Updates
          </h3>
          <ul className="text-gray-600 dark:text-gray-300 space-y-2 text-sm">
            <li>✓ Data fetched daily at 00:00 UTC</li>
            <li>✓ Data pulled from GitHub public API</li>
            <li>✓ Metrics include commits, issues, and open pull requests</li>
            <li>✓ Supporting 10 major open-source projects</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
