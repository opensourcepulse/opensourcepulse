import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

interface ChartData {
  labels: string[];
  commits: number[];
  issues: number[];
  openPRs: number[];
}

interface ColumnChartProps {
  title: string;
  data: ChartData;
  metric: 'commits' | 'issues' | 'openPRs';
}

export const ColumnChart = ({ title, data, metric }: ColumnChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadChart = async () => {
      // Load Google Charts library
      if (!window.google?.visualization) {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.onload = () => {
          window.google.charts.load('current', { packages: ['corechart'] });
          window.google.charts.setOnLoadCallback(drawChart);
        };
        document.head.appendChild(script);
      } else {
        drawChart();
      }
    };

    const drawChart = () => {
      if (!chartRef.current || !window.google?.visualization) return;

      const metricData = metric === 'commits' 
        ? data.commits 
        : metric === 'issues' 
          ? data.issues 
          : data.openPRs;

      const chartData = window.google.visualization.arrayToDataTable([
        ['Repository', title, { role: 'style' }],
        ...data.labels.map((label, idx) => {
          const isDark = document.documentElement.classList.contains('dark');
          const color = metric === 'commits' 
            ? isDark ? '#60a5fa' : '#2563eb'
            : metric === 'issues'
              ? isDark ? '#d8b4fe' : '#a855f7'
              : isDark ? '#a78bfa' : '#4f46e5';
          return [label, metricData[idx], color];
        })
      ]);

      const isDark = document.documentElement.classList.contains('dark');
      const options = {
        title: title,
        titleTextStyle: {
          color: isDark ? '#f0f9ff' : '#111827',
          fontSize: 18,
          bold: true,
        },
        legend: { position: 'bottom' },
        backgroundColor: isDark ? '#111827' : '#ffffff',
        chartArea: {
          backgroundColor: isDark ? '#1f2937' : '#f9fafb',
        },
        vAxis: {
          title: 'Count',
          titleTextStyle: {
            color: isDark ? '#d1d5db' : '#374151',
          },
          textStyle: {
            color: isDark ? '#d1d5db' : '#374151',
          },
          gridlines: {
            color: isDark ? '#374151' : '#e5e7eb',
          },
        },
        hAxis: {
          textStyle: {
            color: isDark ? '#d1d5db' : '#374151',
          },
          slantedText: true,
          slantedTextAngle: 45,
        },
      };

      const chart = new window.google.visualization.ColumnChart(chartRef.current);
      chart.draw(chartData, options);
    };

    loadChart();
  }, [data, metric, title]);

  return <div ref={chartRef} className="w-full h-96" />;
};
