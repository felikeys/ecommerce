import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setCredentials, LogOut } from "../slice/auth";
import { RootState } from "@/portal/routes/slice/store";

export interface RefreshTokenResponse {
    accessToken: string; // Adjust this based on your actual API response
    // Add any other fields you expect in the response
}

// Base query with fetchBaseQuery
const baseQuery = fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1/auth",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

// Custom base query with reauthentication logic
export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        console.log("Token expired, reauthenticating...");

        // Attempt to refresh the token
        const refreshedResult = await baseQuery('/refresh-token', api, extraOptions);
        console.log(refreshedResult);

        if (refreshedResult.data) {
            // Get user information from the current state
            const refreshData = refreshedResult.data as RefreshTokenResponse;
            const user = (api.getState() as RootState).auth.user;
            // const newAccessToken = refreshedResult?.data?.access_token;

            if (user) {
                // Dispatch action to set new credentials
                api.dispatch(setCredentials({
                    accessToken: refreshData.accessToken,
                    user,
                }));

                // Retry the original query with the new access token
                result = await baseQuery(args, api, extraOptions);
            }
        } else {
            // Log out if refresh token request fails
            api.dispatch(LogOut());
        }
    }

    return result;
};

// Create the API slice with the custom base query
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: { ...credentials }
            }),
        }),
    }),
});

// export const { useLoginMutation } = apiSlice;
