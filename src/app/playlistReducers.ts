import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Playlist, PlaylistItems, PlaylistQuery, UserPlaylists, UserPlaylistsQuery, getCurrentUserPlaylist, getPlaylist } from "../services/playlist";
import { Track } from "../services/track";

interface PlaylistState {
    userPlaylist: UserPlaylists | null
    selectedPlaylist: Playlist | null
    selectedPlaylistItems: PlaylistItems | null
    offset: number
    hasReachMax: boolean
    tracks: Track[]
}

const initialState: PlaylistState = {
    userPlaylist: null,
    selectedPlaylist: null,
    selectedPlaylistItems: null,
    offset: 0,
    hasReachMax: false,
    tracks: [],
};

export const getUserPlaylistWithQuery = createAsyncThunk<UserPlaylists, UserPlaylistsQuery>('playlist/getUserPlaylistWithQuery', 
async (query: UserPlaylistsQuery, thunkAPI) => {
    const playlist = await getCurrentUserPlaylist(query);
    if (playlist) return playlist;
    return thunkAPI.rejectWithValue(null);
});

export const getPlaylistWithId = createAsyncThunk<PlaylistItems, PlaylistQuery>('playlist/getPlaylistWithId', 
async (query: PlaylistQuery, thunkAPI) => {
    const playlist = await getPlaylist(query);
    if (playlist) return playlist;
    return thunkAPI.rejectWithValue(null);
});

export const loadMorePlaylistItems = createAsyncThunk<PlaylistItems, PlaylistQuery>('playlist/loadMorePlaylistItems', 
async (query: PlaylistQuery, thunkAPI) => {
    const playlist = await getPlaylist(query);
    if (playlist) return playlist;
    return thunkAPI.rejectWithValue(null);
});

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState: initialState,
    reducers: {
        setSelectedPlaylist: (state: PlaylistState, action: PayloadAction<Playlist>) => {
            state.selectedPlaylist = action.payload;
            state.hasReachMax = false;
            state.offset = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserPlaylistWithQuery.fulfilled, (state, action) => {
            state.userPlaylist = action.payload;
        });
        builder.addCase(getUserPlaylistWithQuery.rejected, (state, action) => {
            state.userPlaylist = null;
        });
        builder.addCase(getPlaylistWithId.fulfilled, (state, action) => {
            state.selectedPlaylistItems = action.payload;
            state.offset += action.payload.limit;
            state.tracks = action.payload.items.map(e => e.track);
        });
        builder.addCase(getPlaylistWithId.rejected, (state, action) => {
            state.selectedPlaylistItems = null;
        });
        builder.addCase(loadMorePlaylistItems.fulfilled, (state, action) => {
            if (action.payload.items.length < action.payload.limit) {
                state.hasReachMax = true;
            }
            state.offset += action.payload.limit;
            state.tracks = [...state.tracks, ...action.payload.items.map(e => e.track)];
        })
    },
});

export const { setSelectedPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;