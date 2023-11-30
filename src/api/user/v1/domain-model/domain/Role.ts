import { Required } from "../../../../common/customer-decorators/Required";

export enum userRole {
  OWNER='OWNER',
  ADMIN = "ADMIN",
  ACCOUNTANT='COMPTABLE',
  CASHIER='CAISSIER',
  SUPERUSER='SUPER_UBS_USER_76375077'
}

type roleType=keyof typeof userRole
export class Roles{

  /**
   * @param {string}
   * returns all roles except [SUPERADMIN,OWNER]
   */
  protected roles: string[]=[userRole.ADMIN, userRole.ACCOUNTANT, userRole.CASHIER, userRole.OWNER,userRole.SUPERUSER];

  public getRoles(){
    const roles=[]
    for(let i=0;i<this.roles.length;++i){
      roles.push({
        name: this.roles[i]
      })
    }
    return roles
  }

}

export class Role extends Roles {
  
  @Required(4,10)
  private role: string;



  constructor(role: string) {
    super()
    this.role = role;
    if (!this.isInvalidRole()) {
      throw new Error("Provided role is invalid !");
    }
  }
  
  private isInvalidRole():boolean {
    const isValidRole=this.roles.includes(this.roleToUpperCase())
    return isValidRole
  
  }
  public getRole(): string {
    return this.roleToUpperCase()
  }

 

  private roleToUpperCase(): string {
    return this.role.toLocaleUpperCase()
  }
}


