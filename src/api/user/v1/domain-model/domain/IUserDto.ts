export interface IUserDto {
  id: number;
  userName: string;
  email: string;
  telephone?: string;
  image?: string;
  role:string
  isValidPhoneNumber: boolean;
  password: string;
  userCode:string
  otpNumber:string
}

export  type UserDtoWithoutPassword=Promise<Omit<IUserDto,'password'>>
