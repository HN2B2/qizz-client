import { QuizState } from "../quiz/QuizState"

export default interface QuizRoomInfoResponse<T> {
    quizCode: string
    quizName: string
    state: QuizState
    data: T
}
