import { DailyLeadsHeader, DailyLeadsTable } from '@/components/DailyLeads';
import { useGetDailyLeadsQuery } from '@/redux/features/dailyLeads/dailyLeads';
import React, { useState } from 'react';

type TabType = 'daily-leads-ai' | 'yacht-leads' | 'customer-contacted';

const AllLeads: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('daily-leads-ai');
  const { data: leadsData, isLoading, isError } = useGetDailyLeadsQuery();

  const handleExportCSV = () => {
    if (!leadsData?.leads) return;

    const csvHeaders = ['Serial', 'Product Name', 'Name', 'Email'];
    const csvRows = leadsData.leads.map((lead, index) => [
      index + 1,
      lead.product || 'N/A',
      lead.name || 'Anonymous',
      lead.email || 'Anonymous',
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `daily-leads-${new Date().toISOString().split('T')[0]}.csv`,
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading daily leads...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading daily leads
              </h3>
              <p className="mt-1 text-sm text-red-700">
                There was an error fetching the daily leads. Please try again
                later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <DailyLeadsHeader
        totalLeads={leadsData?.total_leads || 0}
        onExportCSV={handleExportCSV}
      />

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-4">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('daily-leads-ai')}
              className={`
                flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2
                ${
                  activeTab === 'daily-leads-ai'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
              Daily Leads - AI
            </button>
            <button
              onClick={() => setActiveTab('yacht-leads')}
              className={`
                flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2
                ${
                  activeTab === 'yacht-leads'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15l3-9h12l3 9M5 21h14M6 18h12"
                />
              </svg>
              Yacht Leads
            </button>
            <button
              onClick={() => setActiveTab('customer-contacted')}
              className={`
                flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2
                ${
                  activeTab === 'customer-contacted'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Customer Contacted
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow">
        {activeTab === 'daily-leads-ai' && (
          <DailyLeadsTable leads={leadsData?.leads || []} />
        )}
        {activeTab === 'yacht-leads' && (
          <div className="p-6 text-center text-gray-500">
            <p>Yacht Leads content will be displayed here</p>
          </div>
        )}
        {activeTab === 'customer-contacted' && (
          <div className="p-6 text-center text-gray-500">
            <p>Customer Contacted content will be displayed here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLeads;
