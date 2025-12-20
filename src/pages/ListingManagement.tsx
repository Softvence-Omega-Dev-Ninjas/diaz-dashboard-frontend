import {
  ListingsFilters,
  ListingsHeader,
  ListingsTable,
  Pagination,
} from '@/components/ListingManagement';
import { usePagination } from '@/hooks/use-pagination';
import { useGetAllListingQuery } from '@/redux/features/listingManagement/listingManagement';
import type { Listing, ListingFilters } from '@/types/listing-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

const ListingManagement: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ListingFilters>({
    status: 'All Status',
    seller: 'All Sellers',
    priceRange: '',
  });

  // Initialize pagination
  const pagination = usePagination({ initialPage: 1, initialLimit: 10 });

  // Fetch data with pagination parameters
  const { data: listingData, isLoading, isError } = useGetAllListingQuery({
    page: pagination.page,
    limit: pagination.limit,
  });

  // Update total items when data changes
  useEffect(() => {
    if (listingData?.total) {
      pagination.setTotal(listingData.total);
    }
  }, [listingData?.total]);

  // Extract unique sellers for filter dropdown
  const uniqueSellers = useMemo(() => {
    if (!listingData?.items) return [];
    const sellers = listingData.items.map((item) => item.seller.name);
    return Array.from(new Set(sellers));
  }, [listingData]);

  // Apply filters to listings (client-side filtering)
  const filteredListings = useMemo(() => {
    if (!listingData?.items) return [];

    return listingData.items.filter((listing: Listing) => {
      // Status filter
      if (
        filters.status !== 'All Status' &&
        listing.status !== filters.status
      ) {
        return false;
      }

      // Seller filter
      if (
        filters.seller !== 'All Sellers' &&
        listing.seller.name !== filters.seller
      ) {
        return false;
      }

      // Price range filter (basic implementation)
      if (filters.priceRange) {
        const priceStr = filters.priceRange.toLowerCase();
        if (!listing.price.toString().includes(priceStr.replace(/[^0-9]/g, ''))) {
          return false;
        }
      }

      return true;
    });
  }, [listingData, filters]);

  const handleAddListing = () => {
    navigate('/listings/add');
  };

  const handleView = (id: string) => {
    console.log('Viewing listing:', id);
    // Navigate to listing detail page
    // navigate(`/listings/${id}`);
  };

  const handleEdit = (id: string) => {
    console.log('Editing listing:', id);
    // Navigate to edit page
    // navigate(`/listings/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    console.log('Deleting listing:', id);
    // Implement delete functionality
  };

  const handleExportCSV = () => {
    console.log('Exporting CSV...');
    // Implement CSV export functionality
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading listings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 font-medium">Failed to load listings</p>
            <p className="text-gray-600 mt-2">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <ListingsHeader onAddListing={handleAddListing} />

      <ListingsFilters
        filters={filters}
        onFilterChange={setFilters}
        onExport={handleExportCSV}
        sellers={uniqueSellers}
      />

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <ListingsTable
          listings={filteredListings}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        
        {!isLoading && !isError && listingData && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={pagination.goToPage}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
            limit={pagination.limit}
            onLimitChange={pagination.setLimit}
            totalItems={pagination.totalItems}
          />
        )}
      </div>
    </div>
  );
};

export default ListingManagement;
