import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CurrentPlayingTrack, Track, getCurrentPlayingTrack } from "../services/track";
import { Playlist } from "../services/playlist";

interface AppState {
    currentTrack: CurrentPlayingTrack | Track |null
    currentPlaylist: Playlist | null
    currentPlayingTrackId: string | null
    volume: number
}
  
const initialState: AppState = {
    currentTrack: null,
    currentPlaylist: null,
    volume: 0,
    currentPlayingTrackId: null
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
            state.currentPlaylist = null;
        },
        setCurrentPlayingTrackId: (state: AppState, action: PayloadAction<string>) => {
            state.currentPlayingTrackId = action.payload;
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
            console.log(action.payload);
            state.currentTrack = action.payload;
            state.currentPlaylist = null;
        });
        builder.addCase(getCurrentUserPlayingTrack.rejected, (state, _) => {
            state.currentTrack = null;
            state.currentPlaylist = null;
        });
    },
});

export const { setTrack, setVolume, setCurrentPlayingTrackId } = appSlice.actions;
export default appSlice.reducer;