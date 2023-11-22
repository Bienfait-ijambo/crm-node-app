import { Required } from "../../../../common/customer-decorators/Required";

export class UserName {
  

    @Required(3,30)
    private userName: string;

      constructor(userName: string) {
        this.userName = userName;
      }
 
      public getUserName(): string {
        return this.userName;
      }

    }
    