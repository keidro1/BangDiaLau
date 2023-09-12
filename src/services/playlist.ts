import queryString from "query-string"
import api from "./axios"
import { Track, ExternalUrls, Image, Artist } from "./track"

const enum PLAYLISTS_ENDPOINTS {
    GET_CURRENT_USER_PLAYLISTS = 'v1/me/playlists',
    GET_PLAYLIST = 'v1/playlists/',
    GET_PLAYLIST_ITEMS = 'v1/playlists/'
}

export interface UserPlaylists {
    href: string
    limit: number
    next: string | null
    previous: string | null
    offset: number
    total: number
    items: Playlist[]
}

export interface Playlist {
    collaborative: boolean
    description: string
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    images: Image[]
    name: string
    owner: Owner
    primary_color: any
    public: boolean
    snapshot_id: string
    tracks: Tracks
    type: string
    uri: string
}

export interface Followers {
    href: any
    total: number
}


export interface Owner {
    display_name: string
    external_urls: ExternalUrls
    href: string
    id: string
    type: string
    uri: string
}


export interface Tracks {
    href: string
    items: Item[]
    limit: number
    next: any
    offset: number
    previous: any
    total: number
}

export interface Item {
    added_at: string
    added_by: AddedBy
    is_local: boolean
    primary_color: any
    track: Track
    video_thumbnail: VideoThumbnail
}

export interface AddedBy {
    external_urls: ExternalUrls
    href: string
    id: string
    type: string
    uri: string
}


export interface Album {
    album_type: string
    artists: Artist[]
    available_markets: string[]
    external_urls: ExternalUrls
    href: string
    id: string
    images: Image[]
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
}

export interface ExternalIds {
    isrc: string
}

export interface VideoThumbnail {
    url: any
}

export interface UserPlaylistsQuery {
    offset: number
}

export const getCurrentUserPlaylist = async (query: UserPlaylistsQuery): Promise<UserPlaylists | null>  => {
    let res = await api.get(PLAYLISTS_ENDPOINTS.GET_CURRENT_USER_PLAYLISTS + '?' + queryString.stringify({
        limit: 20,
        offset: query.offset,
    }));
    if (res.status === 200) {
        return res.data as UserPlaylists;
    }
    return null;
}

export interface PlaylistQuery {
    id: string
    offset: number
}

export interface PlaylistItems{
    limit: number
    offset: number
    total: number
    items: Item[]
}

export const getPlaylist = async (query: PlaylistQuery): Promise<PlaylistItems | null>  => {
    let res = await api.get(PLAYLISTS_ENDPOINTS.GET_PLAYLIST + query.id + '/tracks?' + queryString.stringify({
        limit: 20,
        offset: query.offset,
    }));
    if (res.status === 200) {
        return res.data as PlaylistItems;
    }
    return null;
}