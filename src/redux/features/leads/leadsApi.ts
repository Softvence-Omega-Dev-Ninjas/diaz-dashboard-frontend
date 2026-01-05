import { baseApi } from '@/redux/api/baseApi';

const leadsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCustomerContacted: build.query({
      query: ({ page, limit }) => ({
        url: `/contact/contact-us?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Leads'],
    }),

    getBoatLeads: build.query({
      query: ({ page, limit, source, status }) => {
        let url = `/contact?page=${page}&limit=${limit}&type=INDIVIDUAL_LISTING`;
        if (source) {
          url += `&source=${source}`;
        }
        if (status) {
          url += `&status=${status}`;
        }
        return {
          url,
          method: 'GET',
        };
      },
      providesTags: ['Leads'],
    }),
  }),
});

export const { useGetCustomerContactedQuery, useGetBoatLeadsQuery } = leadsApi;
