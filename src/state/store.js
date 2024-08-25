import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state"; // Correct this path to your global slice
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api"; // Ensure this is the correct path
import { authApi } from "state/authApi"; // Correct path to where authApi is defined
import { authSlice } from "state/authSlice"; // Import if managing other auth state like tokens
import { apiSpring } from "state/apiSpring";
import springReducer from "state/springSlice";
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, // Manages caching for async queries/mutations
    global: globalReducer, // Global state reducer
    [api.reducerPath]: api.reducer, // Other API reducer managed by RTK Query
    auth: authSlice.reducer, // Separate auth state management (if necessary)
    [apiSpring.reducerPath]: apiSpring.reducer,
    spring: springReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(api.middleware)
      .concat(apiSpring.middleware), // Combine middleware from different APIs
});

setupListeners(store.dispatch); // Setup RTK Query listeners for refetching on focus/reconnect

export default store;
