import type { YachtLead } from '@/types/yacht-leads-types';
import { ExternalLink, Mail, Phone } from 'lucide-react';
import React from 'react';

interface YachtLeadsTableProps {
  leads: YachtLead[];
  currentPage: number;
  limit: number;
}

export const YachtLeadsTable: React.FC<YachtLeadsTableProps> = ({
  leads,
  currentPage,
  limit,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleViewListing = (lead: YachtLead) => {
    const baseUrl =
      lead.source === 'FLORIDA'
        ? 'https://development.floridayachttrader.com/search-listing'
        : 'https://development.jupitermarinesales.com/search-listing';

    const listingId =
      lead.source === 'FLORIDA' && lead.floridaLeads.length > 0
        ? lead.floridaLeads[0].boat.listingId
        : lead.listingId;

    window.open(`${baseUrl}/${listingId}`, '_blank');
  };

  const getBoatName = (lead: YachtLead) => {
    if (lead.source === 'FLORIDA' && lead.floridaLeads.length > 0) {
      return lead.floridaLeads[0].boat.name;
    }
    return 'N/A';
  };

  const getBoatPrice = (lead: YachtLead) => {
    if (lead.source === 'FLORIDA' && lead.floridaLeads.length > 0) {
      return `$${lead.floridaLeads[0].boat.price.toLocaleString()}`;
    }
    return 'N/A';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Serial
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Boat Info
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Message
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Source
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="text-center px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {leads.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="px-4 md:px-6 py-8 text-center text-sm text-gray-500"
              >
                No yacht leads found
              </td>
            </tr>
          ) : (
            leads.map((lead, index) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {(currentPage - 1) * limit + index + 1}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {lead.name}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-900">{lead.email}</span>
                    <span className="text-sm text-gray-600">{lead.phone}</span>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-gray-900">
                      {getBoatName(lead)}
                    </span>
                    <span className="text-sm text-gray-600">
                      {getBoatPrice(lead)}
                    </span>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm text-gray-600 line-clamp-2">
                    {lead.message}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lead.source === 'FLORIDA'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {lead.source}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lead.status === 'Not Contacted'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {formatDate(lead.createdAt)}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEmail(lead.email)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCall(lead.phone)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Call"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleViewListing(lead)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="View Listing"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
