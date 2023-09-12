import queryString from "query-string"
import api from "./axios"
import { Album } from "./playlist"

const enum TRACK_ENDPOINTS {
    GET_TRACK = 'v1/tracks/',
    GET_CURRENT_PLAYING_TRACK = 'v1/me/player/currently-playing?additional_types=track',
    PLAYER_PLAY = 'v1/me/player/play',
    TOGGLE_PLAYBACK_SHUFFLE = 'v1/me/player/shuffle',
    SET_REPEAT_MODE = 'v1/me/player/repeat'
}
export interface Track {
    album: Album
    artists: Artist[]
    external_urls: ExternalUrls
    href: string
    id: string
    is_playable: boolean
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
}
  
export interface Artist {
    external_urls: ExternalUrls
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface ExternalUrls {
    spotify: string
}

export interface Image {
    height: number
    url: string
    width: number
}
  

export const getTrack = async (id: string): Promise<Track | null>  => {
    let res = await api.get(TRACK_ENDPOINTS.GET_TRACK + id);
    if (res.status === 200) {
        return res.data as Track;
    }
    return null;
}

export interface CurrentPlayingTrack {
    repeat_state: string
    shuffle_state: boolean
    context: Context
    timestamp: number
    progress_ms: number
    is_playing: boolean
    item: Track
}

export interface Context {
    type: string
    href: string
    external_urls: ExternalUrls
    uri: string
}

export const getCurrentPlayingTrack = async (): Promise<CurrentPlayingTrack | null>  => {
    let res = await api.get(TRACK_ENDPOINTS.GET_CURRENT_PLAYING_TRACK);
    if (res.status === 200) {
        return res.data as CurrentPlayingTrack;
    }
    return null;
}

export interface StartPlaybackParams {
    device_id: string
    context_uri: string | null
    uris: string[] | null
    offset: Offset | null
    position_ms: number
}

interface Offset {
    position: number | null
    uri: string | null
}

export const startPlayback = async (params: StartPlaybackParams): Promise<boolean>  => {
    let res = await api.put(TRACK_ENDPOINTS.PLAYER_PLAY + '?device_id=' + params.device_id, params);
    if (res.status === 204) {
        return true;
    }
    return false;
}

export const togglePlaybackShuffle = async (shuffle: boolean, deviceId: string): Promise<boolean>  => {
    let res = await api.put(TRACK_ENDPOINTS.TOGGLE_PLAYBACK_SHUFFLE + '?' + queryString.stringify({
        state: shuffle,
        device_id: deviceId,
    }));
    if (res.status === 204) {
        return shuffle;
    }
    return shuffle;
}

export const setPlaybackRepeatMode = async (repeatMode: string, deviceId: string): Promise<boolean>  => {
    let res = await api.put(TRACK_ENDPOINTS.SET_REPEAT_MODE + '?' + queryString.stringify({
        state: repeatMode,
        device_id: deviceId,
    }));
    if (res.status === 204) {
        return true;
    }
    return false;
}