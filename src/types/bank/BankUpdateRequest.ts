import { ManageBankRequest } from "../manageBank";

interface BankUpdateRequest {
  name: string;
  description?: string | null;
  featuresImage?: string | null;
  quizPublicity?: boolean;
  publicEditable?: boolean;
  draft?: boolean;
  manageBanks?: ManageBankRequest[];
}

export default BankUpdateRequest;
