import { QuizState } from "../quiz/QuizState"

export default interface ReportResponse {
    quizId: number
    quizName: string
    quizCode: string
    totalParticipant: number
    state: QuizState
    createdAt: string
}
