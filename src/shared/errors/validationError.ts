


export class ValidationError extends Error {

    constructor(message?: string) {
      super(message);
      Object.defineProperty(this,'name',{value:'ValidationError'})
    }
  }
  