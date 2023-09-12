import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Track, getTrack } from "../services/track";

interface TrackState {
    track: Track | null
}
  
const initialState: TrackState = {
    track: null,
};

export const getTrackById = createAsyncThunk<Track, string>('track/getTrackById', 
async (id: string, thunkAPI) => {
    let track = await getTrack(id);
    if (track) return track;
    return thunkAPI.rejectWithValue(null);
});


export const trackSlice = createSlice({
    name: 'track',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getTrackById.fulfilled, (state, action) => {
            state.track = action.payload;
        });
        builder.addCase(getTrackById.rejected, (state, action) => {
            state.track = null;
        });
    },
});

export const {  } = trackSlice.actions;
export default trackSlice.reducer;