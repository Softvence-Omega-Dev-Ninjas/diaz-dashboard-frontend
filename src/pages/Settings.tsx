import React, { useState } from 'react';
import Branding from '@/components/Settings/Branding';
import General from '@/components/Settings/General';
import Notifications from '@/components/Settings/Notifications';

type Tab = 'general' | 'branding' | 'notifications';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('general');

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure your dashboard and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg max-w-full sm:max-w-max overflow-x-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'general'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('branding')}
            className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'branding'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Branding
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'notifications'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Notifications
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'general' && <General />}
      {activeTab === 'branding' && <Branding />}
      {activeTab === 'notifications' && <Notifications />}
    </div>
  );
};

export default Settings;
