
export enum sexEnum{
    MALE=1,
    FEMALE=2
}
export class Sex{
    private sex:number
    constructor(sex:number){
        this.sex = sex

        if(!this.isValidSex()){
            throw new Error(`Sex invalid Homme : ${sexEnum.MALE}, & FEMME ${sexEnum.FEMALE}`)
        }
    }

    private isValidSex(){
        if(this.sex!==sexEnum.MALE && this.sex!==sexEnum.FEMALE) return false

        return true
    }


    public getSex():number{
        return this.sex
    }
}