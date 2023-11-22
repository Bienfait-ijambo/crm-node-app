
import bcrypt from 'bcrypt'
import { requiredPropertyError } from '../../../../common/error/requiredProperty';

export class UserPassword{

 
    
  /**
   * 
   * @param password {password provide by the user}
   * @param hashPassword 
   * @returns boolean
   */
    public static async verifyPassword(password:string,hashPassword:string) : Promise<boolean> {
  
      const isMatch = await bcrypt.compare(password,hashPassword);
      
      return (isMatch) ? true : false;
    }


    /**
     * 
     * @param password 
     * @returns a hash password
     */
    public static async hashPassword(password:string)  : Promise<string>{

      const pwdLenth:number=8

      if(typeof password==='undefined' || password==='') throw new Error('Veuillez entre le mot de passe !')

      if(password.length < pwdLenth)
      throw new Error("Veuillez entre 8 charactères au minimum [Password] !");

      if(!UserPassword.isValidatePwd(password))
      throw new Error('Pwd Invalide : [4 chiffres, 2 Lettre en majuscule, 2 Lettre en miniscule]');

      

      const hash = await bcrypt.hash(password, 10);
      return hash;
    }


    private static isValidatePwd(password:string):boolean{
      const passwordRegex = /^(?=.*\d{4})(?=.*[a-z]{2})(?=.*[A-Z]{2}).{8,}$/;

        return (passwordRegex.test(password)) ? true : false;

    }





}



