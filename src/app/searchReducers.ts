import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SearchItems, SearchQuery, searchTrack } from "../services/search";

interface SearchState {
    searchTrack: SearchItems | null
}

const initialState: SearchState = {
    searchTrack: null,
};

export const searchTrackWithQuery = createAsyncThunk<SearchItems, SearchQuery>('search/searchTrackWithQuery', 
async (query: SearchQuery, thunkAPI) => {
    let searchItems = await searchTrack(query);
    if (searchItems) return searchItems;
    return thunkAPI.rejectWithValue(null);
});

export const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(searchTrackWithQuery.fulfilled, (state, action) => {
            state.searchTrack = action.payload;
        });
        builder.addCase(searchTrackWithQuery.rejected, (state, action) => {
            state.searchTrack = null;
        });
    },
});

export const {  } = searchSlice.actions;
export default searchSlice.reducer;