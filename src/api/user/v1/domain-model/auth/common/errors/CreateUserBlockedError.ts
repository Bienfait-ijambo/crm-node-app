

export class CreateUserBlockedError extends Error {

    constructor(message?: string){
        super(message ='Votre compte a été bloqué, Veuillez contacter UBS !');
        this.name="InvalidUserInput"
    }
}


