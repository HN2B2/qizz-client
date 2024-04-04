import RoomUserResponse from "./RoomUserResponse"

export enum JoinStae {
    SUCCESS = "SUCCESS",
    FAIL = "FAIL",
}
export interface WaitingRoomResponse {
    joinState: JoinStae
    message: string
    total: number
    current: number
    users: RoomUserResponse[]
}
