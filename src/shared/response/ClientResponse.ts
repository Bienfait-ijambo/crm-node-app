export class CreateClientResponse {
    
    private message: string;
    private status: number;
    private success: boolean = false;
    private isValidEmail: boolean = false;

  
    constructor(message: string, status: number, isValidEmail:boolean, success: boolean) {
      this.message = message;
      this.status = status;
      this.success = success;
      this.isValidEmail = isValidEmail;
    }
  }
  