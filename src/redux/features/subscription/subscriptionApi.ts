import { baseApi } from '@/redux/api/baseApi';

export interface SubscriptionPlan {
  id: string;
  title: string;
  planType: string;
  description: string;
  benefits: string[];
  picLimit: number;
  wordLimit: number;
  isBest: boolean;
  isActive: boolean;
  stripeProductId?: string;
  stripePriceId?: string;
  currency: string;
  price: number;
  billingPeriodMonths: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlanResponse {
  success: boolean;
  message: string;
  data: SubscriptionPlan[];
}

export interface SingleSubscriptionPlanResponse {
  success: boolean;
  message: string;
  data: SubscriptionPlan;
}

export interface CreateSubscriptionPlanPayload {
  title: string;
  planType: string;
  description: string;
  benefits: string[];
  picLimit: number;
  wordLimit: number;
  isBest: boolean;
  isActive: boolean;
  price: number;
  currency: string;
  billingPeriodMonths: number;
}

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSubscriptionPlans: build.query<SubscriptionPlan[], void>({
      query: () => ({
        url: `/subscription/plans`,
        method: 'GET',
      }),
      transformResponse: (response: SubscriptionPlanResponse) => response.data,
      providesTags: ['Subscription'],
    }),

    getSubscriptionPlan: build.query<SubscriptionPlan, string>({
      query: (id) => ({
        url: `/subscription/plans/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: SingleSubscriptionPlanResponse) => response.data,
      providesTags: ['Subscription'],
    }),

    createSubscriptionPlan: build.mutation<
      SubscriptionPlan,
      CreateSubscriptionPlanPayload
    >({
      query: (plan) => ({
        url: `/subscription/plans`,
        method: 'POST',
        body: plan,
      }),
      transformResponse: (response: SingleSubscriptionPlanResponse) => response.data,
      invalidatesTags: ['Subscription'],
    }),

    updateSubscriptionPlan: build.mutation<
      SubscriptionPlan,
      { id: string; plan: CreateSubscriptionPlanPayload }
    >({
      query: ({ id, plan }) => ({
        url: `/subscription/plans/${id}`,
        method: 'PATCH',
        body: plan,
      }),
      transformResponse: (response: SingleSubscriptionPlanResponse) => response.data,
      invalidatesTags: ['Subscription'],
    }),

    deleteSubscriptionPlan: build.mutation<void, string>({
      query: (id) => ({
        url: `/subscription/plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subscription'],
    }),
  }),
});

export const {
  useGetSubscriptionPlansQuery,
  useGetSubscriptionPlanQuery,
  useCreateSubscriptionPlanMutation,
  useUpdateSubscriptionPlanMutation,
  useDeleteSubscriptionPlanMutation,
} = subscriptionApi;
