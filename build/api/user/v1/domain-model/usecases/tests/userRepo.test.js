// import {describe, expect, test,jest,beforeEach} from '@jest/globals';
// import { GetUsersInteractor } from "../GetUsers";
// import { MockUserRepo } from '../_mocks/mockUserRepo';
// // let userInteractor: GetUsersInteractor;
// // const mockResponse = () => {
// //   const res = {
// //     status:null,
// //     json:null
// //   };
// //   res.status = jest.fn().mockReturnValue(res);
// //   res.json = jest.fn().mockReturnValue(res);
// //   return res;
// // };
// // beforeEach(() => {
// //   userInteractor = new GetUsersInteractor(
// //     new MockUserRepo() 
// //     // Speedy! And valid since it inherits IUserRepo.
// //   )
// // });
// // test ("Should 200 with an empty array of users", async () => {
// //   let res = mockResponse();
// //   await userInteractor.handle(null, res);
// //   expect(res.status).toHaveBeenCalledWith(200);
// //   expect(res.json).toHaveBeenCalledWith({ users: [] });
// // })
// describe('UserController', () => {
//   let userInteractor: GetUsersInteractor;
//   beforeEach(() => {
//     userInteractor = new GetUsersInteractor(new MockUserRepo());
//   });
//   test('should return an HTTP 200 response with an array of users', async () => {
//     const mockRes = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//     await userInteractor.handle(null, mockRes);
//     expect(mockRes.status).toHaveBeenCalledWith(200);
//     expect(mockRes.json).toHaveBeenCalledWith({
//       users: [
//         {
//           id: 8,
//           name: "Boroto",
//           email: "boroto@gmail.com",
//           role: "ADMIN",
//         },
//         {
//           id: 9,
//           name: "Jean-Marque",
//           email: "jeanMarque@gmail.com",
//           role: "ADMIN",
//         },
//         {
//           id: 10,
//           name: "Bienfait-Ijambo",
//           email: "bienfait@gmail.com",
//           role: "ADMIN",
//         },
//       ],
//     });
//   });
// });
//# sourceMappingURL=userRepo.test.js.map