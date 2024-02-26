export default interface Report {
  quizId: number;
  // mode: "Quiz",
  name: string;
  description: string;
  featuredImage: string;
  createdAt: string;
  // modifiedAt: string;
  // publicable: boolean;
  // publicEditable: boolean;
  category: string;
  subcategory: string;
  // quizBank: QuizBank,
  bankId: number;
  totalQuestions: number;
  totalJoins: number;
  createBy: string;
}
