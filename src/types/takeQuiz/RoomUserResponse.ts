import { UserMetadataResponse } from "../user"

export default interface RoomUserResponse {
    email: string
    displayName: string
    metaData: UserMetadataResponse[]
}
