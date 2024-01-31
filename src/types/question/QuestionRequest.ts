import { QuestionType } from "./QuestionType";

export default interface QuestionRequest {
  content: string;
  point: number;
  duration: number;
  type: QuestionType;
  answersMetadata?: string[];
  correctAnswersMetadata: string[];
  explainAnswer?: string;
  questionIndex: number;
  disabled: boolean;
  quizBankId: number;
}
