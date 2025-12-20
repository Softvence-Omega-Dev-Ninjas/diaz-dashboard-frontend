export interface Seller {
  id: string;
  name: string;
  email: string;
}

export interface Listing {
  id: string;
  listingId: string;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  status: 'ACTIVE' | 'ONBOARDING_PENDING' | 'REJECTED' | 'FEATURED';
  views: number;
  createdAt: string;
  seller: Seller;
}

export interface ListingResponse {
  page: number;
  limit: number;
  total: number;
  items: Listing[];
}

export interface ListingFilters {
  status: string;
  seller: string;
  priceRange: string;
}
