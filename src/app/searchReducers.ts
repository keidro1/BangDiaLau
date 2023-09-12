import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SearchItems, SearchQuery, searchTrack } from "../services/search";
import { Track, getTrack } from "../services/track";

interface SearchState {
    searchTrack: SearchItems | null
    isSearching: boolean
    isLoading: boolean
    tracks: Track[]
    offset: number
    q: string
    hasReachMax: boolean
}

const initialState: SearchState = {
    searchTrack: null,
    isSearching: false,
    isLoading: false,
    tracks: [],
    offset: 0,
    q: '',
    hasReachMax: false,
};

export const searchTrackWithQuery = createAsyncThunk<SearchItems, SearchQuery>('search/searchTrackWithQuery', 
async (query: SearchQuery, thunkAPI) => {
    const searchItems = await searchTrack(query);
    if (searchItems) return searchItems;
    return thunkAPI.rejectWithValue(null);
});

export const loadMore = createAsyncThunk<SearchItems, SearchQuery>('search/searchTrackWithQuery', 
async (query: SearchQuery, thunkAPI) => {
    const searchItems = await searchTrack(query);
    if (searchItems) return searchItems;
    return thunkAPI.rejectWithValue(null);
});

export const getEveryTrackFromSearchItems = createAsyncThunk<Track[], SearchItems>('search/getEveryTrackFromSearchItems', 
async (searchItems: SearchItems, thunkAPI) => {
    let result: Track[] = [];
    const items = searchItems.tracks.items;
    for (let i = 0; i < items.length; i++) {
        const track = await getTrack(items[i].id);
        if (track) {
            result.push(track);
        } else {
            return thunkAPI.rejectWithValue(null);
        }
    }
    return result;
});

export const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        setIsSearching: (state: SearchState, action: PayloadAction<boolean>) => {
            state.q = '';
            state.isSearching = action.payload;
            state.offset = 0;
            state.hasReachMax = false;
        },
        setIsLoading: (state: SearchState, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setQuery: (state: SearchState, action: PayloadAction<string>) => {
            if (state.q != action.payload) {
                state.offset = 0;
                state.tracks = [];
                state.hasReachMax = false;
                state.searchTrack = null;
            }
            state.q = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(searchTrackWithQuery.fulfilled, (state, action) => {
            state.searchTrack = action.payload;
            if (action.payload.tracks.items.length < action.payload.tracks.limit) {
                state.hasReachMax = true;
            }
            state.offset += action.payload.tracks.limit;
        });
        builder.addCase(searchTrackWithQuery.rejected, (state, action) => {
            state.searchTrack = null;
        });

        builder.addCase(getEveryTrackFromSearchItems.fulfilled, (state, action) => {
            state.tracks = [...state.tracks, ...action.payload];
        });

        builder.addCase(getEveryTrackFromSearchItems.rejected, (state, action) => {
            console.log("shit");
        });
    },
});

export const { setIsSearching, setIsLoading, setQuery } = searchSlice.actions;
export default searchSlice.reducer;