import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserInfo, getCurrentUserInfo } from "../services/user";
import { AuthInfo, getAuthInfo, getToken, logout, saveAuthInfo } from "../services/auth";

interface UserState {
    user:  UserInfo | null;
    isLogin: boolean;
}
  
const initialState: UserState = {
    user: null,
    isLogin: false,
};

export const fetchAuthInfo = createAsyncThunk<AuthInfo, string>('user/fetchAuthInfo', 
async (code: string, thunkAPI) => {
    let token = getAuthInfo();
    if (token) return token;
    if (code.length === 0) thunkAPI.rejectWithValue(null);
    token = await getToken(code);
    if (token) return token;
    return thunkAPI.rejectWithValue(null);
});

export const fetchUserInfo = createAsyncThunk<UserInfo, void>('user/fetchUserInfo', 
async (_, thunkAPI) => {
    let userInfo = await getCurrentUserInfo();
    if (userInfo) return userInfo;
    return thunkAPI.rejectWithValue(null);
});

export const authSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setIsLogin: (state: UserState, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        },
        logoutUser: (state: UserState, _: PayloadAction<void>) => {
            state.user = null;
            state.isLogin = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuthInfo.fulfilled, (state, action) => {
            saveAuthInfo(action.payload);
            state.isLogin = true;
        });
        builder.addCase(fetchAuthInfo.rejected, (state, action) => {
            state.isLogin = false;
        });
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(fetchUserInfo.rejected, (state, action) => {
            state.user = null;
        });

    },
});

export const { setIsLogin, logoutUser } = authSlice.actions;
export default authSlice.reducer;