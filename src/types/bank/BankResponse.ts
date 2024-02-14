import { Category } from "../category";
import ManageBank from "../manageBank/ManageBank";
import { UserResponse } from "../user";

export default interface BankResponse {
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
  createdBy: UserResponse;
  modifiedBy?: UserResponse;
  manageBanks?: ManageBank[];
  totalUpVotes?: number;
}
