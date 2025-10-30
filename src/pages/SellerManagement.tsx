import React, { useState } from 'react';
import { Check } from 'lucide-react';

// Demo data
const DEMO_SELLERS = [
  {
    id: 1,
    name: 'Royal Marine',
    initials: 'RO',
    color: 'bg-blue-500',
    verified: true,
    contact: 'contact@royalmarine.com',
    listings: 12,
    totalSales: '$4.2M',
    joined: 'Jan 2024',
  },
  {
    id: 2,
    name: 'BlueWave Yachts',
    initials: 'BL',
    color: 'bg-blue-500',
    verified: true,
    contact: 'info@bluewaveyachts.com',
    listings: 28,
    totalSales: '$12.8M',
    joined: 'Mar 2023',
  },
  {
    id: 3,
    name: 'Coastal Sales',
    initials: 'CO',
    color: 'bg-blue-500',
    verified: false,
    contact: 'sales@coastalsales.com',
    listings: 8,
    totalSales: '$1.1M',
    joined: 'Oct 2024',
  },
  {
    id: 4,
    name: 'Luxury Yachts Inc',
    initials: 'LU',
    color: 'bg-blue-500',
    verified: true,
    contact: 'contact@luxuryyachts.com',
    listings: 35,
    totalSales: '$28.5M',
    joined: 'Jun 2022',
  },
];

const SellerManagement: React.FC = () => {
  const [sellers] = useState(DEMO_SELLERS);

  const handleViewProfile = (id: number) => {
    console.log('Viewing profile:', id);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Seller Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage seller accounts and verifications
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Scrollable table wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller Name
                </th>
                <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listings
                </th>
                <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Sales
                </th>
                <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sellers.map((seller) => (
                <tr
                  key={seller.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div
                        className={`${seller.color} w-10 h-10 rounded-full flex items-center justify-center shrink-0`}
                      >
                        <span className="text-white text-sm font-semibold">
                          {seller.initials}
                        </span>
                      </div>
                      {/* Name and Verification */}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {seller.name}
                        </span>
                        {seller.verified && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <Check className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-gray-500">
                              Verified Seller
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {seller.contact}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {seller.listings}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-sm font-medium text-cyan-600">
                      {seller.totalSales}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {seller.joined}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <button
                      onClick={() => handleViewProfile(seller.id)}
                      className="text-sm text-gray-700 hover:text-gray-900 font-medium border border-gray-300 hover:border-gray-400 px-4 py-1.5 rounded-lg transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerManagement;
