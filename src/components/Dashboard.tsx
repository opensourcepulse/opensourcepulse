import { useMemo } from 'react';
import { ColumnChart } from './ColumnChart';
import { ChartCard } from './ChartCard';
import { MetricsData, RepositoryHistory } from '../types';

interface DashboardProps {
  data: MetricsData;
}

export const Dashboard = ({ data }: DashboardProps) => {
  const lastUpdated = new Date(data.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });

  // Sort repositories for consistent display
  const sortedRepos = useMemo(() => {
    return Object.keys(data.metrics).sort();
  }, [data.metrics]);

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
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            Historical data for the last 30 days
          </p>
        </div>

        {/* Charts by Repository */}
        <div className="space-y-12">
          {sortedRepos.map((repoName) => {
            const repoData = data.metrics[repoName] as RepositoryHistory;
            
            return (
              <div key={repoName} className="border-t border-gray-200 dark:border-gray-700 pt-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  {repoName}
                </h3>
                
                <div className="space-y-8">
                  <ChartCard 
                    title="Commits"
                    description="Total commits over the last 30 days"
                  >
                    <ColumnChart 
                      data={repoData.history}
                      metric="commits"
                    />
                  </ChartCard>

                  <ChartCard 
                    title="Issues"
                    description="Total issues over the last 30 days"
                  >
                    <ColumnChart 
                      data={repoData.history}
                      metric="issues"
                    />
                  </ChartCard>

                  <ChartCard 
                    title="Open Pull Requests"
                    description="Open PRs over the last 30 days"
                  >
                    <ColumnChart 
                      data={repoData.history}
                      metric="openPRs"
                    />
                  </ChartCard>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 dark-mode-transition">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Note:</span> Days without data are filled with zeros. As the system collects data daily, these values will be populated over time.
          </p>
        </div>
      </div>
    </section>
  );
};
