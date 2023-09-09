import api from "./axios"

const enum TRACK_ENDPOINTS {
    GET_TRACK = 'v1/tracks/'
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