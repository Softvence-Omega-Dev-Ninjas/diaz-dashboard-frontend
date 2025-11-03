import React, { useState } from 'react';
import { Eye, Edit2, Trash2, Download, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

// Demo data
const DEMO_LISTINGS = [
  {
    id: 1,
    yacht: '2024 SeaVee 370z',
    manufacturer: 'SeaVee',
    year: '2024',
    seller: 'Royal Marine',
    price: '$1,195,000',
    status: 'Pending',
    views: 245,
    date: '2025-01-15',
  },
  {
    id: 2,
    yacht: '2007 Hatteras 64 Convertible',
    manufacturer: 'Hatteras',
    year: '2007',
    seller: 'BlueWave Yachts',
    price: '$895,000',
    status: 'Approved',
    views: 1203,
    date: '2025-01-14',
  },
  {
    id: 3,
    yacht: '2015 Lagoon 450 F Catamaran',
    manufacturer: 'Lagoon',
    year: '2015',
    seller: 'Coastal Sales',
    price: '$425,000',
    status: 'Featured',
    views: 2156,
    date: '2025-01-13',
  },
  {
    id: 4,
    yacht: '2018 Azimut 60 Flybridge',
    manufacturer: 'Azimut',
    year: '2018',
    seller: 'Luxury Yachts Inc',
    price: '$1,750,000',
    status: 'Approved',
    views: 987,
    date: '2025-01-12',
  },
  {
    id: 5,
    yacht: '2022 Viking 58 Convertible',
    manufacturer: 'Viking',
    year: '2022',
    seller: 'Ocean Elite',
    price: '$2,100,000',
    status: 'Rejected',
    views: 156,
    date: '2025-01-11',
  },
];

const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Approved: 'bg-green-100 text-green-800',
  Featured: 'bg-blue-100 text-blue-800',
  Rejected: 'bg-red-100 text-red-800',
};

const ListingManagement: React.FC = () => {
  const [listings] = useState(DEMO_LISTINGS);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sellerFilter, setSellerFilter] = useState('All Sellers');
  const [priceRange, setPriceRange] = useState('');
  const navigate = useNavigate();

  const handleExportCSV = () => {
    console.log('Exporting CSV...');
  };

  const handleAddListing = () => {
    navigate('/listings/add');
    console.log('Adding new listing...');
  };

  const handleView = (id: number) => {
    console.log('Viewing listing:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Editing listing:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Deleting listing:', id);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Listings Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all yacht listings and approvals</p>
        </div>
        <button
          onClick={handleAddListing}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          Add New Listing
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 flex-1">
            {/* Status Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <option>All Status</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Featured</option>
                <option>Rejected</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Seller Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sellerFilter}
                onChange={(e) => setSellerFilter(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <option>All Sellers</option>
                <option>Royal Marine</option>
                <option>BlueWave Yachts</option>
                <option>Coastal Sales</option>
                <option>Luxury Yachts Inc</option>
                <option>Ocean Elite</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Price Range */}
            <input
              type="text"
              placeholder="Price range..."
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:min-w-40"
            />
          </div>

          {/* Export Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full lg:w-auto justify-center"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Scrollable table wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yacht
                </th>
                <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {listings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{listing.yacht}</span>
                      <span className="text-xs text-gray-500">
                        {listing.manufacturer} • {listing.year}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-sm text-gray-900">{listing.seller}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-sm font-medium text-cyan-600">{listing.price}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        STATUS_COLORS[listing.status]
                      }`}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-sm text-gray-900">{listing.views}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-sm text-gray-900">{listing.date}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(listing.id)}
                        className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(listing.id)}
                        className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

export default ListingManagement;