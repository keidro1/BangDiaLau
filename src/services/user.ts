import { api } from "./axios"

const enum USER_ENDPOINTS {
    ME = 'v1/me'
}

export type UserInfo = {
    email: string
    display_name: string
}

export const getCurrentUserInfo = async ()  => {
    let res = await api.get(USER_ENDPOINTS.ME);
    console.log(res.data);
}