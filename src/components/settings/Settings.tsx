import React, { useState, useEffect } from 'react';
import { useApiMode } from '../../hooks/useApiMode';

const Settings: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [oddsApiKey, setOddsApiKey] = useState('');
  const [sportsDataKey, setSportsDataKey] = useState('');
  const [newsApiKey, setNewsApiKey] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { clearCache } = useApiMode();

  useEffect(() => {
    const savedOddsKey = localStorage.getItem('oddsApiKey') || '';
    const savedSportsKey = localStorage.getItem('sportsDataApiKey') || '';
    const savedNewsKey = localStorage.getItem('newsApiKey') || '';
    setOddsApiKey(savedOddsKey);
    setSportsDataKey(savedSportsKey);
    setNewsApiKey(savedNewsKey);
  }, []);

  const validateOddsApiKey = async (key: string) => {
    try {
      const response = await fetch(
        `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=${key}&regions=us&markets=h2h&oddsFormat=american`
      );
      return response.ok;
    } catch {
      return false;
    }
  };

  const validateSportsDataKey = async (key: string) => {
    try {
      const response = await fetch(
        `https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=${key}`
      );
      return response.ok;
    } catch {
      return false;
    }
  };

  const handleSave = async () => {
    setError('');
    setSaving(true);
    setSaveSuccess(false);

    try {
      // Validate Odds API key if provided
      if (oddsApiKey) {
        const isOddsValid = await validateOddsApiKey(oddsApiKey);
        if (!isOddsValid) {
          setError('Invalid Odds API key');
          setSaving(false);
          return;
        }
      }

      // Validate SportsData.io key if provided
      if (sportsDataKey) {
        const isSportsValid = await validateSportsDataKey(sportsDataKey);
        if (!isSportsValid) {
          setError('Invalid SportsData.io API key');
          setSaving(false);
          return;
        }
      }

      // Save all keys
      localStorage.setItem('oddsApiKey', oddsApiKey);
      localStorage.setItem('sportsDataApiKey', sportsDataKey);
      localStorage.setItem('newsApiKey', newsApiKey);
      
      // Clear cache to force fresh data fetch
      clearCache();
      
      setSaveSuccess(true);
      setTimeout(() => {
        onClose();
        window.location.reload(); // Refresh to apply new API keys
      }, 1500);
    } catch (err) {
      setError('Failed to validate API keys');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">API Settings</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Odds API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              The Odds API Key
            </label>
            <input
              type="text"
              value={oddsApiKey}
              onChange={(e) => setOddsApiKey(e.target.value.trim())}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter The Odds API key"
            />
            <p className="mt-2 text-sm text-gray-500">
              Get your key from{' '}
              <a
                href="https://the-odds-api.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                the-odds-api.com
              </a>
            </p>
          </div>

          {/* SportsData.io API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SportsData.io API Key
            </label>
            <input
              type="text"
              value={sportsDataKey}
              onChange={(e) => setSportsDataKey(e.target.value.trim())}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter SportsData.io API key"
            />
            <p className="mt-2 text-sm text-gray-500">
              Get your key from{' '}
              <a
                href="https://sportsdata.io/developers/api-documentation/nfl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                sportsdata.io
              </a>
            </p>
          </div>

          {/* News API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              News API Key (Optional)
            </label>
            <input
              type="text"
              value={newsApiKey}
              onChange={(e) => setNewsApiKey(e.target.value.trim())}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter News API key"
            />
            <p className="mt-2 text-sm text-gray-500">
              Get your key from{' '}
              <a
                href="https://newsapi.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                newsapi.org
              </a>
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {saveSuccess && (
            <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">
              Settings saved successfully! Reloading...
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-4 py-2 rounded-md text-white ${
                saving 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;