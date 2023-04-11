import { apiSlice } from '../api/apiSlice';

const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query({
      query: () => '/team',
    }),
  }),
});

export const { useGetTeamQuery } = teamApi;
