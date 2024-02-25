import { QuestionType } from "../question/QuestionType"
import { ParticipantResponse } from "."

export default interface QuestionReportResponse {
    questionId: number
    content: string
    point: number
    duration: number
    type: QuestionType
    answersMetadata: string
    correctAnswersMetadata: string
    explainAnswer: string
    questionIndex: number
    participants: ParticipantResponse[]
}
