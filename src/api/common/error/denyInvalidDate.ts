
export const denyInvalidDate=(inputDate:string):Boolean=>{
    const  date= new Date(inputDate)
    if(inputDate.length==10){
        return (date.toString()=='Invalid Date') ? false : true
    }else{
        return false;
    }
   

}





