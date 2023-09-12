import api from "./axios"

const enum TRACK_ENDPOINTS {
    GET_TRACK = 'v1/tracks/',
    GET_CURRENT_PLAYING_TRACK = 'v1/me/player/currently-playing?additional_types=track',
    PLAYER_PLAY = 'v1/me/player/play'
}

export interface Track {
    album_type: string
    artists: Artist[]
    external_urls: ExternalUrls
    href: string
    id: string
    images: Image[]
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
    offset: number | null
    uri: string | null
}

export const startPlayback = async (params: StartPlaybackParams): Promise<boolean>  => {
    let res = await api.put(TRACK_ENDPOINTS.PLAYER_PLAY + '?device_id=' + params.device_id, params);
    if (res.status === 204) {
        return true;
    }
    return false;
}