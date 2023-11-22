import { IPartnerDto } from "../../dto/IPartnerDto";

export interface ICreatePartnerInput extends Omit<IPartnerDto,'id'>{}

export interface IUpdatePartnerInput extends Omit<IPartnerDto,|'userId'>{}
