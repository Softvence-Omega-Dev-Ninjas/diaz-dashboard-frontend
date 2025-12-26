import { baseApi } from '@/redux/api/baseApi';

const contentManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTermsAndConditions: build.mutation({
      query: (termsAndConditions) => ({
        url: `/terms-of-service/create`,
        method: 'POST',
        body: termsAndConditions,
      }),
      invalidatesTags: ['TermsOfService'],
    }),

    updateTermsAndConditions: build.mutation({
      query: (termsAndConditions) => ({
        url: `/terms-of-service/update`,
        method: 'PATCH',
        body: termsAndConditions,
      }),
      invalidatesTags: ['TermsOfService'],
    }),

  
  }),
});

export const {

  useCreateTermsAndConditionsMutation,
    useUpdateTermsAndConditionsMutation,
} = contentManagementApi;
