
/**
 * 
 * @param length 
 * @returns generated random string
 */
export function generateRandomNumber(length:number): string {

  let result = "";
  const characters = "0123456789";
  let charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
