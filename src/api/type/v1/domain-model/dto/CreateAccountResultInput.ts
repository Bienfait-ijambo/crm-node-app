import { ICreateAccountResultInput } from "../usecases/interfaces/typeInterfaces";
import { CreateBilanInput } from "./CreateBilanInput";



export class CreateAccountResultInput extends CreateBilanInput{

constructor(input:ICreateAccountResultInput){
    super(input);
}
}