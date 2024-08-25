// src/features/auth/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "./authSlice"; // Assuming you have an authSlice that handles the auth state

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8088/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // Make sure this path matches where you store your token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "api/v1/auth/authenticate",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.token)); // Assuming the token is located directly in the response
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    logout: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
      onQueryStarted: async (arg, { dispatch }) => {
        dispatch(setToken(null)); // Clear the token on logout
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
