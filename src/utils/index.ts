import axios from "axios"

export const instance = axios.create({
    baseURL: process.env.API_URL || "http://localhost:6868/v1",
    withCredentials: true,
})

export const localInstance = axios.create({
    baseURL: process.env.APP_URl || "http://localhost:3000", 
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
