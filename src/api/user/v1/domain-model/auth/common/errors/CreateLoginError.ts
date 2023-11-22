

export class CreateLoginError extends Error {

    constructor(message?: string){
        super(message ='Mot de passe ou adresse mail invalide !');
        this.name="InvalidUserInput"
    }
}


