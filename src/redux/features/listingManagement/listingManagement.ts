import { baseApi } from '@/redux/api/baseApi';

const listingManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllListing: build.query({
      query: ({ page, limit, search, status}) => ({
        url: `/admin/listings?page=${page}&limit=${limit}&search=${search}&status=${status}`,
        method: 'GET',
      }),
      providesTags: ['Listing'],
    }),

  }),
});

export const {
  useGetAllListingQuery,
} = listingManagementApi;
