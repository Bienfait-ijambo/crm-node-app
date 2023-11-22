// import { roles } from "../../../infrastructure/typeorm/seeder/role";
import { requiredPropertyError } from "./requiredProperty";

/**
 *
 * @param param role
 */
export const denyIllegalRole = (param: string) => {
  if (typeof param !== "string") throw new Error("Role must be a string");

  requiredPropertyError(param, "role");
  
  // roles.forEach((role) => {
  //   if (role.name !== param) {
  //     throw new Error(`Invalid role !}`);
  //   }
  // });
};
