import { FC, useMemo } from 'react';
import { Chart } from 'react-google-charts';
import { DailyMetric } from '../types';

interface ColumnChartProps {
  repoName?: string;
  data: DailyMetric[];
  metric: 'commits' | 'issues' | 'openPRs';
}

export const ColumnChart: FC<ColumnChartProps> = ({ data, metric }) => {
  const chartData = useMemo(() => {
    const metricLabel = 
      metric === 'commits' ? 'Commits' :
      metric === 'issues' ? 'Issues' : 'Open PRs';

    const rows = data.map((day) => [
      day.date,
      day[metric],
    ]);

    return [
      ['Date', metricLabel],
      ...rows,
    ];
  }, [data, metric]);

  const getMetricLabel = (m: string) => {
    return m === 'commits' ? 'Total Commits' :
           m === 'issues' ? 'Total Issues' : 'Open PRs';
  };

  const options = {
    title: '',
    legend: { position: 'bottom' },
    hAxis: {
      title: 'Date',
      slantedText: true,
      slantedTextAngle: 45,
      textStyle: { fontSize: 12 },
    },
    vAxis: {
      title: getMetricLabel(metric),
      minValue: 0,
    },
    colors: ['#3b82f6'],
    pointSize: 5,
    lineWidth: 2,
    chartArea: { width: '85%', height: '75%' },
  };

  return (
    <Chart
      chartType="ColumnChart"
      data={chartData}
      options={options}
      width="100%"
      height="350px"
    />
  );
};