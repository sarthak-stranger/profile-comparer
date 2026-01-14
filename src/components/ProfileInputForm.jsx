import React, { useState } from 'react';

const ProfileInputForm = ({ handleSubmit }) => {
  const [profileUrl, setProfileUrl] = useState('');
  const [compareUrls, setCompareUrls] = useState(['', '', '']);
  const [numProfiles, setNumProfiles] = useState(1);

  const handleCompareUrlChange = (index, value) => {
    const newCompareUrls = [...compareUrls];
    newCompareUrls[index] = value;
    setCompareUrls(newCompareUrls);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(profileUrl, compareUrls.filter(url => url));
  };

  return (
    <form onSubmit={onSubmit} className="glass-card card-hover rounded-xl p-5 md:p-6">
      {/* Main Profile Input */}
      <div className="mb-4">
        <label className="block text-xs font-bold mb-2 uppercase tracking-wider flex items-center gap-2" style={{ color: '#00d9ff' }}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
          </svg>
          Your Profile
        </label>
        <input
          type="text"
          placeholder="https://github.com/username"
          value={profileUrl}
          onChange={(e) => setProfileUrl(e.target.value)}
          className="input-dark w-full"
          required
        />
      </div>

      {/* Comparison Profiles Count Selector */}
      <div className="mb-4">
        <label className="block text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#7c3aed' }}>
          Compare With
        </label>
        <div className="flex gap-2">
          {[1, 2, 3].map(num => (
            <button
              key={num}
              type="button"
              onClick={() => setNumProfiles(num)}
              className={`flex-1 py-2 px-3 rounded-md font-bold text-sm transition-all duration-300 ${
                numProfiles === num
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-black shadow-lg glow'
                  : 'bg-zinc-900 text-gray-500 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Profile Inputs */}
      <div className="space-y-3 mb-4">
        {[...Array(numProfiles)].map((_, index) => (
          <div key={index} className="animate-fade-in">
            <input
              type="text"
              placeholder={`Profile to compare #${index + 1}`}
              value={compareUrls[index]}
              onChange={(e) => handleCompareUrlChange(index, e.target.value)}
              className="input-dark w-full"
              required
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn-gradient w-full text-base font-bold"
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          Start Comparison
        </span>
      </button>
    </form>
  );
};

export default ProfileInputForm;