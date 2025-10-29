import React, { useState } from 'react';

const General: React.FC = () => {
  const [siteName, setSiteName] = useState('Florida Yacht Trader');
  const [currency, setCurrency] = useState('USD ($)');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Site Settings</h2>

      <div className="space-y-4 md:space-y-6">
        {/* Site Name */}
        <div>
          <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-2">
            Site Name
          </label>
          <input
            id="siteName"
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter site name"
          />
        </div>

        {/* Currency */}
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <div className="relative">
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
              <option>JPY (¥)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 gap-3">
          <div>
            <label htmlFor="maintenanceMode" className="block text-sm font-medium text-gray-900">
              Maintenance Mode
            </label>
            <p className="text-sm text-gray-500 mt-1">Temporarily disable public access</p>
          </div>
          <button
            id="maintenanceMode"
            onClick={() => setMaintenanceMode(!maintenanceMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              maintenanceMode ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            role="switch"
            aria-checked={maintenanceMode}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                maintenanceMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default General;