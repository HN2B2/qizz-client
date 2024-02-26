import { QuestionType } from "@/types/question/QuestionType"

export default interface PlayingQuestionResponse {
    questionId: number
    content: string
    point: number
    duration: number
    type: QuestionType
    answersMetadata: string
    correctAnswersMetadata: string
}
