import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserPlaylists, UserPlaylistsQuery, getCurrentUserPlaylist } from "../services/playlist";

interface PlaylistState {
    userPlaylist: UserPlaylists | null
}

const initialState: PlaylistState = {
    userPlaylist: null,
};

export const getUserPlaylistWithQuery = createAsyncThunk<UserPlaylists, UserPlaylistsQuery>('playlist/getUserPlaylistWithQuery', 
async (query: UserPlaylistsQuery, thunkAPI) => {
    let playlist = await getCurrentUserPlaylist(query);
    if (playlist) return playlist;
    return thunkAPI.rejectWithValue(null);
});

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUserPlaylistWithQuery.fulfilled, (state, action) => {
            state.userPlaylist = action.payload;
        });
        builder.addCase(getUserPlaylistWithQuery.rejected, (state, action) => {
            state.userPlaylist = null;
        });
    },
});

export const {  } = playlistSlice.actions;
export default playlistSlice.reducer;