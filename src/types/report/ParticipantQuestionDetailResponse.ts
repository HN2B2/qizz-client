import { QuestionResponse } from "../question";

export default interface ParticipantQuestionDetailResponse {
  question: QuestionResponse;
  score: number;
  answerMetadata: string;
  correct: boolean;
}
