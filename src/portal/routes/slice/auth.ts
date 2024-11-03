import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSatte, User } from "./types";
import { RootState } from "@/portal/routes/slice/store";

const initialState: AuthSatte = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string; user: User }>) => {
            const { accessToken, user } = action.payload;
            state.token = accessToken;
            state.user = user;
        },
        LogOut: (state) => {
            state.token = null;
            state.user = null;
        },
    },
})

export const { setCredentials, LogOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState): User | null => state.auth.user;
export const selectCurrentToken = (state: RootState): string | null => state.auth.token;
