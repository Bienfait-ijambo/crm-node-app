import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

/**
 * When a user create an account by default the column ownByUserId takes 0 value,
 * this means that the user is the owner;
 * whereas when the owner  create its users, the column ownByUserId takes Id of the owner. so, when that user logged in
 * the system get accecced to owner data
 */
export enum OWNER_USER {
  id = 0,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  userName: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  telephone: string;

  @Column()
  role: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  image?: string;

  @Column({
    select: true,
  })
  password: string;

  @Column({
    nullable: true,
  })
  otpNumber: string;

  @Column({
    default: false,
  })
  emailIsVerified: boolean;

  @Column({
    default: false,
  })
  isValidPhoneNumber: boolean;

  @Column({
    default: false,
  })
  terms: boolean;

  @Column({
    nullable: true,
    type: 'text',
  })
  userCode: string;

  @Column()
  ownByUserId: number;

 
  @Column({
    nullable: true,
    type: 'json',
  })
  userpermissions: JSON;

  @Column({
    nullable: true,
  })
  userProviderId:string


  @Column({
    default: false,
  })
  userIsBlocked:boolean

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;

  constructor(
    userName: string,
    email: string,
    role: string,
    image: string,
    password: string,
    userCode: string,
    otpNumber: string,
    emailIsVerified:boolean,
    terms: boolean,
    ownByUserId: number,
    userProviderId:string
  ) {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.userCode = userCode;
    this.terms = terms;
    this.otpNumber = otpNumber;
    this.emailIsVerified=emailIsVerified
    this.ownByUserId = ownByUserId;
    this.image = image;
    this.userProviderId = userProviderId;
  }
}
