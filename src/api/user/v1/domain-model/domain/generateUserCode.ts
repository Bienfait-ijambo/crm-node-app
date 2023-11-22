/**
 * generate unique code using email+timestamp+randomNumber
 * @param email 
 * @returns code
 * 
 */
export function generateUserCode(email:string) {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000000);
    const userCode = email + timestamp+randomNumber
    return userCode;
  }