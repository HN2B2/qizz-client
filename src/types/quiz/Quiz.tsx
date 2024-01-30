import { Category } from "../category";
import { QuizBank } from "../quizBank";
import { User } from "../user";

export default interface Quiz {
  quizId: number;
  mode: string;
  name: string;
  description: string;
  featuredImage: string;
  createdAt: string;
  //   modifiedAt: string;
  //   publicable: boolean;
  //   publicEditable: boolean;
  category: Category["name"];
  subcategory: string;
  //   quizBank: QuizBank;
  bankId: number;
  totalQuestions: number;
  totalJoins: number;
  createBy: User["name"];
}
