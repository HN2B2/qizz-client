import UserResponse from "@/types/user/UserResponse"

export default interface AuthResponse {
    token: string
    user: UserResponse
}
