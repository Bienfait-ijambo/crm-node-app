import { EnumClientPages } from "../../entities/ClientPages";

export enum PageActions{
    CREATE='CREER',
    UPDATE='MODIFIER',
    DELETE='SUPPRIMER',
    VIEW='VOIR'
}


export const pageActions=[
    //journal
    {
        id:EnumClientPages.JOURNAL,
        name:'/journal',
        displayName:'Journal',
        actions:[
            {
                id:1,
                name:PageActions.CREATE
            },
            {
                id:2,
                name:PageActions.UPDATE
            },
            {
                id:3,
                name:PageActions.DELETE
            },
            {
                id:4,
                name:PageActions.VIEW
            }
        ]
    },
   
    //bilan
    {
        id:EnumClientPages.BILAN,
        name:'/bilans',
        displayName:'Bilan',
        actions:[
           
            {
                id:4,
                name:PageActions.VIEW
            }
        ]
    },
    //balance
    {
        id:EnumClientPages.BALANCE,
        name:'/balances',
        displayName:'Balance',
        actions:[
           
            {
                id:4,
                name:PageActions.VIEW
            }
        ]
    },
    //project

    {
        id:EnumClientPages.PROJET,
        name:'/projects',
        displayName:'Projets',

        actions:[
            {
                id:1,
                name:PageActions.CREATE
            },
            {
                id:2,
                name:PageActions.UPDATE
            },
            {
                id:3,
                name:PageActions.DELETE
            },
            {
                id:4,
                name:PageActions.VIEW
            }
        ]
    },


    //services
    {
        id:EnumClientPages.SERVICE,
        name:'/services',
        displayName:'Services',
        actions:[
            {
                id:1,
                name:PageActions.CREATE
            },
            {
                id:2,
                name:PageActions.UPDATE
            },
            {
                id:3,
                name:PageActions.DELETE
            },
            {
                id:4,
                name:PageActions.VIEW
            }
        ]
    },
   
    //end service

    //dashboard
    {
        id:EnumClientPages.DASHBOARD,
        name:'/dashboard',
        displayName:'Dashboard',
        actions:[
           
            {
                id:4,
                name:PageActions.VIEW
            }
        ]
    },
    //end dashboard

    //partners
    {
        id:EnumClientPages.PARTNER,
        name:'/partners',
        displayName:'Partenaire',
        actions:[
            {
                id:1,
                name:PageActions.CREATE
            },
            {
                id:2,
                name:PageActions.UPDATE
            },
            {
                id:3,
                name:PageActions.DELETE
            },
            {
                id:4,
                name:PageActions.VIEW
            }
        ]
    },
    //end partner

    //accounts
    {
        id:EnumClientPages.ACCOUNT,
        name:'/accounts',
        displayName:'Liste des comptes',
        actions:[
            {
                id:1,
                name:PageActions.CREATE
            },
            {
                id:2,
                name:PageActions.UPDATE
            },
            {
                id:3,
                name:PageActions.DELETE
            },
            {
                id:4,
                name:PageActions.VIEW
            }
        ]
    },
    //end accounts

    //account-result
    {
        id:EnumClientPages.ACCOUNT_RESULT,
        name:'/account-results',
        displayName:'Resultat',
        actions:[
          
            {
                id:4,
                name:PageActions.VIEW
            }
        ]
    },
    //end accout-result

    //general-ledger
    {
        id:EnumClientPages.GENERAL_LEDGER,
        name:'/general-ledgers',
        displayName:'Grand-Livre',
        actions:[
           
            {
                id:4,
                name:PageActions.VIEW
            }
        ]
    },

    //end general-ledger

]