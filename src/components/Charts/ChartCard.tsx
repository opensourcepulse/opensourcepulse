import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const ChartCard = ({ title, description, children }: ChartCardProps) => {
  return (
    <div className="card p-6 md:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {description}
          </p>
        )}
      </div>
      <div className="overflow-x-auto">
        {children}
      </div>
    </div>
  );
};
