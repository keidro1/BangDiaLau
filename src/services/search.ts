import queryString from "query-string";
import api from "./axios"
import { Track } from "./track";

const enum SEARCH_ENDPOINTS {
    SEARCH = 'v1/search'
}

export interface SearchItems {
    tracks: [Track]
}

export interface SearchQuery {
    q: string,
    offset: number
} 

export const searchTrack = async (query: SearchQuery, type: string = 'track'): Promise<SearchItems | null>  => {
    let res = await api.get(SEARCH_ENDPOINTS.SEARCH + '?' +queryString.stringify({
        q: query.q,
        limit: 20,
        offset: query.offset,
        type: type,
    }));
    if (res.status === 200) {
        return res.data as SearchItems;
    }
    return null;
}