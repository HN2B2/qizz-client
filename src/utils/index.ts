import { UserMetadataResponse } from "@/types/user"
import axios from "axios"
import SockJS from "sockjs-client"

export const appUrl = process.env.APP_URl || "http://localhost:3000"

export const instance = axios.create({
    baseURL: process.env.API_URL || "http://localhost:6868/v1",
    withCredentials: true,
})

export const localInstance = axios.create({
    baseURL: appUrl,
    withCredentials: true,
})

export const getServerErrorNoti = (error: any) => {
    if (axios.isAxiosError(error) && error.response && error.response.data) {
        const { data } = error.response
        if (data.message) {
            return data.message
        }
    } else {
        return "Something went wrong"
    }
}

export const socketUrl = () => {
    return new SockJS(`${process.env.API_URL || "http://localhost:6868/v1"}/ws`)
}

export const extractUserAvatar = (usermetadata: UserMetadataResponse[]) => {
    const avatar = usermetadata?.find((item) => item.key === "avatarUrl")
    return avatar ? avatar.value : ""
}

export const isNameValid = (name: string) => {
    return /^[A-Za-z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/u.test(
        name
    )
}

export const formatDate = (date: Date | string | null) => {
    if (!date) {
        return ""
    }
    const d = new Date(date)
    const year = d.getFullYear()
    const month = `${d.getMonth() + 1}`.padStart(2, "0")
    const day = `${d.getDate()}`.padStart(2, "0")
    return `${year}-${month}-${day}`
}
