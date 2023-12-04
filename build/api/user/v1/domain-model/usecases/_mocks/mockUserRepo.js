// import { IUserDto, User } from "../../../../data-access-layer/entity/User";
// import { UserRepo } from "../../../../data-access-layer/repository/user/typeorm/IuserRepo";
// import { ILoginDto } from "../../auth/Dto/LoginDto";
// type usersReturnType=Omit<User,'projects'|'attributions'>[]
// export class MockUserRepo implements UserRepo {
//   private users: usersReturnType= [
//     {
//       id: 8,
//       name: "Boroto",
//       email: "boroto@gmail.com",
//       role: "ADMIN",
//     },
//     {
//       id: 9,
//       name: "Jean-Marque",
//       email: "jeanMarque@gmail.com",
//       role: "ADMIN",
//     },
//     {
//       id: 10,
//       name: "Bienfait-Ijambo",
//       email: "bienfait@gmail.com",
//       role: "ADMIN",
//     },
//   ];
//   constructor() {}
//   public createUser(user: IUserDto): Promise<IUserDto> {
//     throw new Error("Method not implemented.");
//   }
//   public findUserByEmail(email: string): Promise<User> {
//     throw new Error("Method not implemented.");
//   }
//   public loginUser(dto: ILoginDto): Promise<IUserDto> {
//     throw new Error("Method not implemented.");
//   }
//   public findUserById(id: number): Promise<IUserDto> {
//     throw new Error("Method not implemented.");
//   }
//   public updateUser(user: IUserDto): Promise<Boolean> {
//     throw new Error("Method not implemented.");
//   }
//   public async getAllUsers(): Promise<usersReturnType> {
//     return this.users;
//   }
// }
//# sourceMappingURL=mockUserRepo.js.map