import { Header } from './components/Layout/Header';
import { HeroSection } from './components/Layout/HeroSection';
import { Dashboard } from './components/Dashboard';
import { useMetrics } from './hooks/useMetrics';

export const App = () => {
  const { data, loading, error } = useMetrics();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 dark-mode-transition">
      <Header />
      <HeroSection />
      
      {loading && (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container-max text-center">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400"></div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading metrics...</p>
          </div>
        </section>
      )}

      {error && (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container-max">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200">
                Error loading metrics: {error}
              </p>
            </div>
          </div>
        </section>
      )}

      {data && !loading && <Dashboard data={data} />}

      <footer className="bg-gray-900 dark:bg-black text-gray-400 dark:text-gray-500 py-8 mt-12">
        <div className="container-max text-center text-sm">
          <p>© 2026 OpenSourcePulse. Data from GitHub API.</p>
          <p className="mt-2">
            <a href="https://github.com/opensourcepulse/opensourcepulse" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 dark:hover:text-gray-400 transition-colors">
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
