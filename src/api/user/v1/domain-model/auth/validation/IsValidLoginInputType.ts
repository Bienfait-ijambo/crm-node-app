import { LoginByInputType } from "../../usecases/interfaces/userInterfaces"

export function IsValidLoginInputType(target:any,key:string){

    let value:string=target[key]

    const getter=()=>value

    const setter=(newValue:string)=>{
        value=newValue
        const inputType=newValue.toUpperCase()
        if(inputType!==LoginByInputType.TELEPHONE && inputType!==LoginByInputType.EMAIL)
        throw new Error(`Invalid login input type: ${inputType}`)
    }

    Object.defineProperty(target,key,{
        get:getter,
        set:setter,
        enumerable:true,
        configurable:true,
    })
}