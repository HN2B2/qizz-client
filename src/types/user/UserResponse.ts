import UserMetadataResponse from "./UserMetadataResponse"

export enum UserRole {
    GUEST = "GUEST",
    USER = "USER",
    STAFF = "STAFF",
    ADMIN = "ADMIN",
}

export default interface UserResponse {
    id: number
    username: string
    email: string
    role: UserRole
    enabled: boolean
    displayName: string
    metadata: UserMetadataResponse[]
}
