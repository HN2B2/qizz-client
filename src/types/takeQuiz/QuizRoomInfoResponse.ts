import RoomUserResponse from "./RoomUserResponse"

export default interface QuizRoomInfoResponse {
    quizCode: string
    quizName: string
    total: number
    current: number
    users: RoomUserResponse[]
}
