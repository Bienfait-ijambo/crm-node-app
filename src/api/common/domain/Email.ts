import { Required } from "../customer-decorators/Required";

export class Email {


  @Required(10,30)
  private email: string;


  public emailIsVerified: boolean = false;

  
  /**
   * 
   * @param email {string} 
   */
  constructor(email: string) {
    this.email = email;

    if(!this.isValid()) throw new Error("Invalid email address ");
  }


  /**
   * 
   * @returns {boolean} if is a valid email
   */
  private isValid() {

    const regex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const isValid = regex.test(this.email);

    return isValid ? true : false;

  }

  public getEmail(){
    return this.email.toLocaleLowerCase();
  }
}
