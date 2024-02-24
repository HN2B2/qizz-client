import { QuizState } from "./QuizState"

export default interface Quiz {
    quizId: number
    name: string
    description: string
    featuredImage: string
    createdAt: string
    code: string
    quizState: QuizState
}
