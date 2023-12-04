// import { beforeAll, describe, expect, test } from "@jest/globals";
// import { buildSchema, graphql } from "graphql";
// // import { journalQueries } from "../../../api/journal/v1/presentation/resolvers/journal.query";
// // input CreateExpenseVsEarningInput{
// //   createdAt:String!
// //   userId:Int!
// // }
// describe("UserResolver", () => {
//   let schema;
//   beforeAll(async () => {
//     schema = await buildSchema(` 
//           input CreateExpenseVsEarningInput{
//             createdAt:String!
//             userId:Int!
//         } 
//           type CreateExpenseVsEarningResponse{
//             totalExpenses:String!
//             totalEarnings:String!
//           }  
//           type Query{
//             expensesVsEarnings(input:CreateExpenseVsEarningInput!):CreateExpenseVsEarningResponse!}`);
//   });
//   it("should return  no null", async () => {
//     // const {expensesVsEarnings,...rest}=journalQueries
//     const input = {
//       createdAt: "2023-05-27",
//       userId: 1,
//     };
//     var rootValue = {
//       expensesVsEarnings: ({ input }) => {
//         return {
//           totalExpenses: null,
//           totalEarnings: null,
//         };
//       },
//     };
//     const query = `
//     query expensesVsEarnings($input: CreateExpenseVsEarningInput!){
//       expensesVsEarnings(input: $input) {
//         totalEarnings
//         totalExpenses
//       }
//     }
//     `;
//     const response = await graphql({
//       schema,
//       source: query,
//       rootValue,
//       variableValues: { input: input },
//     });
//     // expect(response).rejects.toThrow()
//     expect(response.data).toBeNull();
//     expect(response.errors).toBeDefined();
//     // expect(response).toEqual({
//     //   data: {
//     //     expensesVsEarnings: {
//     //       totalExpenses: null,
//     //       totalEarnings: null,
//     //     },
//     //   },
//     // });
//   });
// });
//# sourceMappingURL=query.test.js.map