

export class ID {
    constructor(private id: number) {
      this.id = id;
  
      if(!this.isValid()) throw new Error('Invalid ID');
    }
  
    public getId() {
      return this.id;
    }
  
    private isValid(): boolean {
      const id = parseInt(this.toString());
      return !Number.isNaN(id) ? true : false;
    }
  
    public toString() {
      return this.id.toString();
    }
  }
  