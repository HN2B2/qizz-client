import { QuestionType } from "./QuestionType";

export default interface Question {
  questionId: number;
  content: string;
  point: number;
  duration: number;
  type: QuestionType;
  answersMetadata: string[];
  correctAnswersMetadata: string[];
  explainAnswer: string;
  questionIndex: number;
  disabled: boolean;
  quizBankId: number;
}
