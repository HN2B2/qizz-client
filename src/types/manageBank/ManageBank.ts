import { UserResponse } from "../user";

export default interface ManageBank {
  manageBankId: number;
  createdAt: string;
  modifiedAt: string;
  user: UserResponse;
  editable: boolean;
}
