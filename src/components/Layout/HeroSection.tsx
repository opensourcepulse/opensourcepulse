export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-12 md:py-20 lg:py-24 dark-mode-transition">
      <div className="container-max">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 mb-4">
            OpenSourcePulse
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            Real-time metrics from the most influential open-source projects
          </p>
          
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-lg dark:shadow-2xl dark-mode-transition">
              <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">
                10
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                Projects Tracked
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-lg dark:shadow-2xl dark-mode-transition">
              <div className="text-2xl md:text-3xl font-bold text-secondary-600 dark:text-secondary-400">
                30+
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                Daily Updates
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 shadow-lg dark:shadow-2xl dark-mode-transition">
              <div className="text-2xl md:text-3xl font-bold text-accent-600 dark:text-accent-400">
                Live
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                Real-time Data
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
