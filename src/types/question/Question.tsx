export default interface Question {
  question_id: number;
  content: string;
  point: number;
  duration: string;
  type: string;
  answers_metadata: string;
  correct_answers_metadata: string;
  explain_answer: string;
  created_at: string;
  modified_at: string;
  disabled: boolean;
  bank_id: number;
}
