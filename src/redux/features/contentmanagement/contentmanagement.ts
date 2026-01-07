import { baseApi } from '@/redux/api/baseApi';

const contentManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTermsAndConditions: build.query({
      query: (site) => ({
        url: `/terms-of-service?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['TermsOfService'],
    }),
    createTermsAndConditions: build.mutation({
      query: ({ site, termsAndConditions }) => ({
        url: `/terms-of-service/create?site=${site}`,
        method: 'POST',
        body: termsAndConditions,
      }),
      invalidatesTags: ['TermsOfService'],
    }),

    updateTermsAndConditions: build.mutation({
      query: ({ site, termsAndConditions }) => ({
        url: `/terms-of-service?site=${site}`,
        method: 'PATCH',
        body: termsAndConditions,
      }),
      invalidatesTags: ['TermsOfService'],
    }),

    getPrivacyPolicy: build.query({
      query: (site) => ({
        url: `/privacy-policy?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['PrivacyPolicy'],
    }),
    createPrivacyPolicy: build.mutation({
      query: ({ site, privacyPolicy }) => ({
        url: `/privacy-policy/create?site=${site}`,
        method: 'POST',
        body: privacyPolicy,
      }),
      invalidatesTags: ['PrivacyPolicy'],
    }),

    updatePrivacyPolicy: build.mutation({
      query: ({ site, privacyPolicy }) => ({
        url: `/privacy-policy?site=${site}`,
        method: 'PATCH',
        body: privacyPolicy,
      }),
      invalidatesTags: ['PrivacyPolicy'],
    }),

    // getContactUs: build.query({
    //   query: (site) => ({
    //     url: `/contactus?site=${site}`,
    //     method: 'GET',
    //   }),
    //   providesTags: ['ContactUs'],
    // }),
    // createContactUs: build.mutation({
    //   query: ({ site, contactUs }) => ({
    //     url: `/contactus/create?site=${site}`,
    //     method: 'POST',
    //     body: contactUs,
    //   }),
    //   invalidatesTags: ['ContactUs'],
    // }),

    // updateContactUs: build.mutation({
    //   query: ({ site, contactUs }) => ({
    //     url: `/contactus?site=${site}`,
    //     method: 'PATCH',
    //     body: contactUs,
    //   }),
    //   invalidatesTags: ['ContactUs'],
    // }),

    getAboutUsContent: build.query({
      query: (site) => ({
        url: `/aboutus?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['AboutUs'],
    }),
    createAboutUs: build.mutation({
      query: ({ site, aboutUsContent }) => ({
        url: `/aboutus/create?site=${site}`,
        method: 'POST',
        body: aboutUsContent,
      }),
      invalidatesTags: ['AboutUs'],
    }),

    updateAboutUs: build.mutation({
      query: ({ site, aboutUsContent }) => ({
        url: `/aboutus?site=${site}`,
        method: 'PATCH',
        body: aboutUsContent,
      }),
      invalidatesTags: ['AboutUs'],
    }),

    getFooter: build.query({
      query: ({ site }) => ({
        url: `/footer?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['Footer'],
    }),

    createFooter: build.mutation({
      query: ({ site, footerContent }) => ({
        url: `/footer?site=${site}`,
        method: 'POST',
        body: footerContent,
      }),
      invalidatesTags: ['Footer'],
    }),

    updateFooter: build.mutation({
      query: ({ site, footerContent }) => ({
        url: `/footer?site=${site}`,
        method: 'PATCH',
        body: footerContent,
      }),
      invalidatesTags: ['Footer'],
    }),


    createFaq: build.mutation({
      query: ({ faqContent }) => ({
        url: `/faq`,
        method: 'POST',
        body: faqContent,
      }),
      invalidatesTags: ['FAQ'],
    }),

    updateFaq: build.mutation({
      query: ({ site, faqContent }) => ({
        url: `/faq?site=${site}`,
        method: 'PATCH',
        body: faqContent,
      }),
      invalidatesTags: ['FAQ'],
    }),

    getFaq: build.query({
      query: (site) => ({
        url: `/faq?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['FAQ'],
    }),
    
    deleteFaq: build.mutation({
      query: ({ site }) => ({
        url: `/faq?site=${site}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FAQ'],
    }),

    getWhyUs: build.query({
      query: (site) => ({
        url: `/why-us?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['WhyUs'],
    }),

    createWhyUs: build.mutation({
      query: ({ whyUsContent }) => ({
        url: `/why-us`,
        method: 'POST',
        body: whyUsContent,
      }),
      invalidatesTags: ['WhyUs'],
    }),

    updateWhyUs: build.mutation({
      query: ({ site, whyUsContent }) => ({
        url: `/why-us?site=${site}`,
        method: 'PATCH',
        body: whyUsContent,
      }),
      invalidatesTags: ['WhyUs'],  
    }),

    deleteWhyUs: build.mutation({
      query: ({ site }) => ({
        url: `/why-us?site=${site}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WhyUs'],
    }),


    getContactInfo: build.query({
      query: (site) => ({
        url: `/contact/contact-info?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['ContactInfo'],
    }), 

    createContactInfo: build.mutation({
      query: ({ contactInfo }) => ({
        url: `/contact-info`,
        method: 'POST',
        body: contactInfo,
      }),
      invalidatesTags: ['ContactInfo'],
    }),

    updateContactInfo: build.mutation({
      query: ({ site, contactInfo }) => ({
        url: `/contact/contact-info?site=${site}`,
        method: 'PATCH',
        body: contactInfo,
      }),
      invalidatesTags: ['ContactInfo'],
    }),


    getFeaturedBrands: build.query({
      query: (site) => ({
        url: `/featured-brands?site=${site}`,
        method: 'GET',
      }),
      providesTags: ['FeaturedBrands'],
    }),

    createFeaturedBrands: build.mutation({
      query: ({ featuredBrands }) => ({
        url: `/featured-brands`,
        method: 'POST',
        body: featuredBrands,
      }),
      invalidatesTags: ['FeaturedBrands'],
    }),

    updateFeaturedBrands: build.mutation({
      query: ({ id, featuredBrands }) => ({
        url: `/featured-brands/${id}`,
        method: 'PATCH',
        body: featuredBrands,
      }),
      invalidatesTags: ['FeaturedBrands'],
    }),

    deleteFeaturedBrands: build.mutation({
      query: ({ id }) => ({
        url: `/featured-brands/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FeaturedBrands'],
    }),
  }),
});

export const {
  useCreateTermsAndConditionsMutation,
  useUpdateTermsAndConditionsMutation,
  useGetTermsAndConditionsQuery,

  useGetPrivacyPolicyQuery,
  useCreatePrivacyPolicyMutation,
  useUpdatePrivacyPolicyMutation,

  // useGetContactUsQuery,
  // useCreateContactUsMutation,
  // useUpdateContactUsMutation,

  useGetAboutUsContentQuery,
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,

  useGetFooterQuery,
  useCreateFooterMutation,
  useUpdateFooterMutation,

  useCreateFaqMutation,
  useUpdateFaqMutation,
  useGetFaqQuery,
  useDeleteFaqMutation,

  useGetWhyUsQuery,
  useCreateWhyUsMutation,
  useUpdateWhyUsMutation,
  useDeleteWhyUsMutation,

  useGetContactInfoQuery,
  useCreateContactInfoMutation,
  useUpdateContactInfoMutation,

  useGetFeaturedBrandsQuery,
  useCreateFeaturedBrandsMutation,
  useUpdateFeaturedBrandsMutation,
  useDeleteFeaturedBrandsMutation,
} = contentManagementApi;
