import { IMassDto } from "../../dto/IMassDto";


export interface ICreateMassInput extends Omit<IMassDto,'id'>{}

export interface IUpdateMassInput extends IMassDto{}