import { IUserPermission } from "./ILoginResponse"

export interface IExpressUserSessionResponse {
    message: Message
  }
  
  export interface Message {
    passport: Passport
  }
  
  export interface Passport {
    user: User
  }
  
  export interface User {
    enterpriseInfo: EnterpriseInfo
    permissions: IUserPermission
    response: Response
    tokens: Tokens
    user: IUserSession
  }
  
  export interface EnterpriseInfo {
    email: string
    idNat: string
    name: string
    rccm: string
    taxNumberId: string
    telephone: string
    userId: number
  }
  

  
  export interface Response {
    isValidEmail: boolean
    message: string
    status: number
    success: boolean
  }
  
  export interface Tokens {
    accessToken: string
    refreshToken: string
  }
  
  export interface IUserSession {
    createdAt: string
    deletedAt: any
    email: string
    emailIsVerified: boolean
    id: number
    image: string
    isValidPhoneNumber: boolean
    otpNumber: string
    ownByUserId: number
    password: string
    role: string
    telephone: any
    terms: boolean
    updatedAt: string
    userCode: string
    userName: string
    userpermissions: any
  }
  