import api from "./axios"

const enum USER_ENDPOINTS {
    ME = 'v1/me'
}

export type UserInfo = {
    email: string
    display_name: string
}

export const getCurrentUserInfo = async (): Promise<UserInfo | null>  => {
    let res = await api.get(USER_ENDPOINTS.ME);
    if (res.status === 200) {
        return res.data as UserInfo;
    }
    return null;
}