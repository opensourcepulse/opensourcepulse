import { FC } from 'react';

interface ColumnChartProps {
  title: string;
  data: {
    labels: string[];
    commits?: number[];
    issues?: number[];
    openPRs?: number[];
  };
  metric: 'commits' | 'issues' | 'openPRs';
}

export const ColumnChart: FC<ColumnChartProps> = ({ title, data, metric }) => {
  // Implement your chart rendering logic here
  return <div>{title}</div>;
};