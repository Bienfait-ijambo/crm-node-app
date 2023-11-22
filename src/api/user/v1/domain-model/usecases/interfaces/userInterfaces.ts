export interface CreateUserInput {
  email: string;
  image:string
  role: string;
  password: string;
  terms: boolean;
  emailIsVerified:boolean
  userName:string
  userProviderId:string
}

export interface IUserOwnByMainUser {
  email: string;
  role: string;
  userCode: string;
  password: string;
  terms: boolean;
  ownByUserId: number;
}
export interface UpdateUserInput {
  userName: string;
  telephone: string;
  email: string;
}

export interface UpdatePasswordInput {
  id: number;
  newPassword: string;
  passwordConfirm:string
}

export interface ValidateTelephoneInput {
  id: number;
  telephone: string;
}

export enum LoginByInputType {
  EMAIL = "EMAIL",
  TELEPHONE = "TELEPHONE",
}
export interface LoginUserInput {
  email: string;
  telephone: string;
  password: string;
  loginByInputType: LoginByInputType;
}

export interface SearchUserInput {
  userName: string;
  userCode: string;
}

/**
 * upload user image
 */
export interface UploadImageInput {
  email: string;
  image: string;
}

export interface UploadUserEnterpriseLogoInput {
  userId: number;
  image: string;
}

export interface VerifyOTPNumberInput {
  id: number;
  email: string;
  otpNumber: string;
}

export interface IResetEmailInput {
  email: string;
}

export interface IActions {
  id: number;
  pageName: string;
  userId: number;
}

export interface IPageActionInput extends IActions {
  actions: Array<{
    id: number;
    name: string;
  }>;
}

export interface IUserDeleteInput{
  userId: number, userCode: string
}

export interface EnterPriseInfoInput {
  userId: number;
  name: string;
  email: string;
  telephone: string;
  taxNumberId: string;
  rccm: string;
  idNat: string;
}



