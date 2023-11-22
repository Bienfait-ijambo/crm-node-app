import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from "typeorm";

  @Entity()
  export class EnterpriseInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    name: string;
  
  
    @Column()
    email: string;
  
   
    @Column()
    telephone: string;

    @Column()
    taxNumberId: string;

    @Column()
    rccm: string;
  

    @Column()
    idNat: string;

    @Column({
      nullable:true,
    })
    image: string;


    @CreateDateColumn()
    readonly createdAt?: Date;
  
    @UpdateDateColumn()
    readonly updatedAt?: Date;
  
    @DeleteDateColumn()
    readonly deletedAt?: Date;
  
    constructor(userId:number,name:string,email:string,telephone:string,taxNumberId:string,rccm:string,idNat:string) {
     this.userId = userId;
     this.name = name;
     this.email = email;
     this.telephone = telephone;
     this.taxNumberId = taxNumberId;
     this.rccm = rccm;
     this.idNat = idNat;
      
    }
  }
  