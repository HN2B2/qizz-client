import { QuizState } from "../quiz/QuizState"
import { QuestionReportResponse } from "."

export default interface ReportDedailResponse {
    quizId: number
    quizName: string
    quizCode: string
    totalParticipant: number
    state: QuizState
    createdAt: string
    questionReports: QuestionReportResponse[]
}
