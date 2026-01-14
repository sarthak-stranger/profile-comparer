import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ComparisonCharts = ({ comparisonData }) => {
  const { profileData, compareData } = comparisonData;

  // Color palette for different users
  const colorPalette = [
    {
      bg: 'rgba(0, 217, 255, 0.7)',
      border: 'rgb(0, 217, 255)',
    },
    {
      bg: 'rgba(124, 58, 237, 0.7)',
      border: 'rgb(124, 58, 237)',
    },
    {
      bg: 'rgba(249, 115, 22, 0.7)',
      border: 'rgb(249, 115, 22)',
    },
    {
      bg: 'rgba(34, 211, 238, 0.7)',
      border: 'rgb(34, 211, 238)',
    },
  ];

  const chartData = {
    labels: ['Stars', 'PRs', 'Repositories'],
    datasets: [
      {
        label: profileData.username,
        backgroundColor: colorPalette[0].bg,
        borderColor: colorPalette[0].border,
        borderWidth: 2,
        borderRadius: 8,
        data: [profileData.stars, profileData.prs, profileData.repos],
      },
      ...compareData.map((data, index) => ({
        label: data.username,
        backgroundColor: colorPalette[(index + 1) % colorPalette.length].bg,
        borderColor: colorPalette[(index + 1) % colorPalette.length].border,
        borderWidth: 2,
        borderRadius: 8,
        data: [data.stars, data.prs, data.repos],
      })),
    ],
  };
 
  // Combine all users for the tech stack table
  const allUsers = [profileData, ...compareData];
  const tableRows = allUsers.flatMap((data) => {
    const languages = data.languages || {};
    return Object.entries(languages).map(([lang, lines]) => (
      <tr key={`${data.username}-${lang}`} className="transition-colors duration-200">
        <td className="py-2 px-3 md:px-4 border-b border-zinc-900">
          <span className="font-semibold" style={{ color: '#00d9ff' }}>{data.username}</span>
        </td>
        <td className="py-2 px-3 md:px-4 border-b border-zinc-900">
          <span className="inline-flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"></span>
            {lang}
          </span>
        </td>
        <td className="py-2 px-3 md:px-4 border-b border-zinc-900 text-gray-400 text-sm">
          {lines.toLocaleString()}
        </td>
      </tr>
    ));
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            size: 12,
            weight: '700',
          },
          padding: 12,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#00d9ff',
        bodyColor: '#ffffff',
        borderColor: '#00d9ff',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
        displayColors: true,
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.dataset.label + ': ' + tooltipItem.raw.toLocaleString();
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#71717a',
          font: {
            size: 11,
          },
          autoSkip: true,
          maxTicksLimit: 10,
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
        beginAtZero: true,
        ticks: {
          color: '#71717a',
          font: {
            size: 11,
          },
          stepSize: 10,
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      }
    },
    animation: {
      duration: 1200,
      easing: 'easeInOutQuart',
    }
  };

  // Stats Cards
  const StatsCard = ({ icon, label, value, color, iconColor }) => (
    <div className="glass-card rounded-lg p-4 card-hover">
      <div className="flex items-center gap-3">
        <div className="text-2xl" style={{ color: iconColor }}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-bold">{label}</p>
          <p className="text-xl md:text-2xl font-bold text-white">{value.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-6 space-y-5">
      {/* Stats Overview */}
      <div className="glass-card rounded-xl p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-bold mb-4 neon-text flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          Quick Stats
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatsCard 
            icon="⭐" 
            label="Stars" 
            value={profileData.stars}
            iconColor="#fbbf24"
          />
          <StatsCard 
            icon="🔀" 
            label="PRs" 
            value={profileData.prs}
            iconColor="#7c3aed"
          />
          <StatsCard 
            icon="📦" 
            label="Repos" 
            value={profileData.repos}
            iconColor="#f97316"
          />
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-card rounded-xl p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-bold mb-4 gradient-text flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          Comparison Chart
        </h2>
        <div className="chart-container">
          <Bar data={chartData} options={options} />
        </div>
      </div>

      {/* Tech Stack Table */}
      <div className="glass-card rounded-xl p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#f97316' }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
          </svg>
          Languages Used
        </h2>
        
        <div className="overflow-x-auto rounded-lg">
          <table className="table-dark w-full">
            <thead>
              <tr>
                <th className="py-3 px-3 md:px-4 text-left text-xs">PROFILE</th>
                <th className="py-3 px-3 md:px-4 text-left text-xs">LANGUAGE</th>
                <th className="py-3 px-3 md:px-4 text-left text-xs">LINES</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.length > 0 ? tableRows : (
                <tr>
                  <td colSpan="3" className="py-6 px-4 text-center text-gray-600">
                    <div className="flex flex-col items-center gap-2 text-sm">
                      <div className="text-2xl">📊</div>
                      <span>No language data found</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCharts;
