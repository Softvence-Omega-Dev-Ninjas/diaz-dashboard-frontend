import { baseApi } from '@/redux/api/baseApi';

interface User {
  id: string;
  [key: string]: unknown;
}

const permissionManageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPermissionUsers: build.query({
      query: () => ({
        url: `/user-permissions/get-admins`,
        method: 'GET',
      }),
      providesTags: (result) => [
        { type: 'PERMISSION', id: 'LIST' },
        ...(result?.map((user: User) => ({
          type: 'PERMISSION' as const,
          id: user.id,
        })) || []),
      ],
    }),
    createPermission: build.mutation({
      query: (data) => ({
        url: `/user-permissions/add-admin`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'PERMISSION', id: 'LIST' }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            permissionManageApi.util.invalidateTags([
              { type: 'PERMISSION', id: 'LIST' },
            ]),
          );
        } catch (error) {
          console.error('Error creating permission:', error);
        }
      },
    }),
    changeRole: build.mutation({
      query: ({ id, role }) => ({
        url: `/user-permissions/${id}?changerole=${role}`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'PERMISSION', id: 'LIST' }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            permissionManageApi.util.invalidateTags([
              { type: 'PERMISSION', id: 'LIST' },
            ]),
          );
        } catch (error) {
          console.error('Error changing role:', error);
        }
      },
    }),

    deletePermission: build.mutation({
      query: (id) => ({
        url: `/user-permissions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'PERMISSION', id: 'LIST' }],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            permissionManageApi.util.invalidateTags([
              { type: 'PERMISSION', id: 'LIST' },
            ]),
          );
        } catch (error) {
          console.error('Error deleting permission:', error);
        }
      },
    }),
  }),
});

export const {
  useGetAllPermissionUsersQuery,
  useCreatePermissionMutation,
  useChangeRoleMutation,
  useDeletePermissionMutation,
} = permissionManageApi;
