import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CurrentPlayingTrack, Track, getCurrentPlayingTrack } from "../services/track";
import { Playlist } from "../services/playlist";

interface AppState {
    currentTrack: CurrentPlayingTrack | Track |null
    currentPlaylist: Playlist | null
    currentPlayingTrackId: string | null
    volume: number
    currentPlayingPlaylistItem: number
    currentPlayingPlaylistContext: string | null
}
  
const initialState: AppState = {
    currentTrack: null,
    currentPlaylist: null,
    volume: 0,
    currentPlayingTrackId: null,
    currentPlayingPlaylistItem: -1,
    currentPlayingPlaylistContext: null,
};

export const getCurrentUserPlayingTrack = createAsyncThunk<CurrentPlayingTrack, void>('track/getCurrentPlayingTrack', 
async (_, thunkAPI) => {
    let track = await getCurrentPlayingTrack();
    if (track) return track;
    return thunkAPI.rejectWithValue(null);
});

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setTrack: (state: AppState, action: PayloadAction<CurrentPlayingTrack | Track>) => {
            state.currentTrack = action.payload;
            state.currentPlayingPlaylistItem = -1;
            state.currentPlaylist = null;
            state.currentPlayingPlaylistContext = null;
        },
        setCurrentPlayingTrackId: (state: AppState, action: PayloadAction<string>) => {
            state.currentPlayingTrackId = action.payload;
        },
        setCurrentPlayingPlaylistItem: (state: AppState, action: PayloadAction<number>) => {
            state.currentPlayingPlaylistItem = action.payload;
            state.currentTrack = null;
        },
        setCurrentPlayingPlaylistContext: (state: AppState, action: PayloadAction<string>) => {
            state.currentPlayingPlaylistContext = action.payload;
            state.currentTrack = null;
        },
        setPlaylist: (state: AppState, action: PayloadAction<Playlist>) => {
            state.currentPlaylist = action.payload;
            state.currentTrack = null;
        },
        setVolume: (state: AppState, action: PayloadAction<number>) => {
            state.volume = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUserPlayingTrack.fulfilled, (state, action) => {
            state.currentTrack = action.payload;
            state.currentPlaylist = null;
        });
        builder.addCase(getCurrentUserPlayingTrack.rejected, (state, _) => {
            state.currentTrack = null;
            state.currentPlaylist = null;
        });
    },
});

export const { setTrack, setVolume, setCurrentPlayingTrackId, setCurrentPlayingPlaylistItem, setCurrentPlayingPlaylistContext } = appSlice.actions;
export default appSlice.reducer;