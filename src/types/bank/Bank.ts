import { Category } from "../category";
import { User } from "../user";

export default interface Bank {
  quizBankId: number;
  name: string;
  description?: string | null;
  featuresImage?: string | null;
  createdAt: string;
  modifiedAt: string;
  quizPublicity: boolean;
  publicEditable: boolean;
  subCategories?: any;
  draft?: boolean;
  totalQuestions?: number;
  createdBy?: User;
  modifiedBy?: User;
  totalUpVotes?: number;
}
