import React, { useState } from 'react';
import ProfileInputForm from './components/ProfileInputForm';
import ComparisonCharts from './components/ComparisonCharts';
import ErrorBoundary from './components/ErrorBoundary';
import ReactLoading from 'react-loading';

import { getUserData, getUserRepos, getUserLanguages, getUserPRs } from './services/api/githubApi';

const App = () => {
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async (profileUrl, compareUrls) => {
    setLoading(true);
    try {
      const profileUsername = profileUrl.split('/').pop();
      const compareUsernames = compareUrls.map(url => url.split('/').pop());

      const profileData = await getUserData(profileUsername);
      const profileReposData = await getUserRepos(profileUsername);
      const profileLanguages = await getUserLanguages(profileUsername);
      const profilePRs = await getUserPRs(profileUsername);

      const compareDataPromises = compareUsernames.map(async (username) => {
        const userData = await getUserData(username);
        const reposData = await getUserRepos(username);
        const languagesData = await getUserLanguages(username);
        const prsData = await getUserPRs(username);
        return {
          username: userData.login,
          stars: reposData.totalStars,
          prs: prsData,  
          repos: reposData.reposCount,
          languages: languagesData,
        };
      });

      const compareData = await Promise.all(compareDataPromises);

      setComparisonData({
        profileData: {
          username: profileData.login,
          stars: profileReposData.totalStars,
          prs: profilePRs,  
          repos: profileReposData.reposCount,
          languages: profileLanguages,
        },
        compareData,
      });
    } catch (error) {
      console.error('Error comparing profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative z-10">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-8 animate-slide-down">
          <div className="flex items-center justify-center gap-3 mb-3">
            {/* GitHub Logo SVG */}
            <svg className="w-10 h-10 md:w-12 md:h-12 icon-pulse" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#00d9ff' }}>
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">
              Profile Comparer
            </h1>
          </div>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto px-4">
            Analyze and compare developer profiles • Stats • Repos • Tech Stack
          </p>
        </div>

        {/* Input Form Section */}
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <ProfileInputForm handleSubmit={handleCompare} />
        </div>
        
        {/* Loading Overlay */}
        {loading && (
          <div className="overlay">
            <div className="float-animation">
              <ReactLoading type="spin" color="#00d9ff" height={80} width={80} />
            </div>
            <div className="loading-text">Analyzing profiles...</div>
          </div>
        )}
        
        {/* Comparison Results */}
        {!loading && comparisonData && (
          <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <ErrorBoundary>
              <ComparisonCharts comparisonData={comparisonData} />
            </ErrorBoundary>
          </div>
        )}

        {/* Features Info */}
        {!comparisonData && !loading && (
          <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <div className="glass-card rounded-lg p-4 card-hover">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1 neon-text">Lightning Fast</h4>
                    <p className="text-gray-400 text-xs">Real-time data fetching and analysis</p>
                  </div>
                </div>
              </div>
              <div className="glass-card rounded-lg p-4 card-hover">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📊</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1" style={{ color: '#7c3aed' }}>Visual Analytics</h4>
                    <p className="text-gray-400 text-xs">Beautiful charts and comprehensive stats</p>
                  </div>
                </div>
              </div>
              <div className="glass-card rounded-lg p-4 card-hover">
                <div className="flex items-start gap-3">
                  <div className="text-2xl code-slide">💻</div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1" style={{ color: '#f97316' }}>Tech Stack</h4>
                    <p className="text-gray-400 text-xs">Detailed programming language breakdown</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
