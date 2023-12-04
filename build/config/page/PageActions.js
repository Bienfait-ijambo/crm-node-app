"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageActions = exports.PageActions = void 0;
const ClientPages_1 = require("../../entities/ClientPages");
var PageActions;
(function (PageActions) {
    PageActions["CREATE"] = "CREER";
    PageActions["UPDATE"] = "MODIFIER";
    PageActions["DELETE"] = "SUPPRIMER";
    PageActions["VIEW"] = "VOIR";
})(PageActions = exports.PageActions || (exports.PageActions = {}));
exports.pageActions = [
    //journal
    {
        id: ClientPages_1.EnumClientPages.JOURNAL,
        name: '/journal',
        displayName: 'Journal',
        actions: [
            {
                id: 1,
                name: PageActions.CREATE
            },
            {
                id: 2,
                name: PageActions.UPDATE
            },
            {
                id: 3,
                name: PageActions.DELETE
            },
            {
                id: 4,
                name: PageActions.VIEW
            }
        ]
    },
    //bilan
    {
        id: ClientPages_1.EnumClientPages.BILAN,
        name: '/bilans',
        displayName: 'Bilan',
        actions: [
            {
                id: 4,
                name: PageActions.VIEW
            }
        ]
    },
    //balance
    {
        id: ClientPages_1.EnumClientPages.BALANCE,
        name: '/balances',
        displayName: 'Balance',
        actions: [
            {
                id: 4,
                name: PageActions.VIEW
            }
        ]
    },
    //project
    {
        id: ClientPages_1.EnumClientPages.PROJET,
        name: '/projects',
        displayName: 'Projets',
        actions: [
            {
                id: 1,
                name: PageActions.CREATE
            },
            {
                id: 2,
                name: PageActions.UPDATE
            },
            {
                id: 3,
                name: PageActions.DELETE
            },
            {
                id: 4,
                name: PageActions.VIEW
            }
        ]
    },
    //services
    {
        id: ClientPages_1.EnumClientPages.SERVICE,
        name: '/services',
        displayName: 'Services',
        actions: [
            {
                id: 1,
                name: PageActions.CREATE
            },
            {
                id: 2,
                name: PageActions.UPDATE
            },
            {
                id: 3,
                name: PageActions.DELETE
            },
            {
                id: 4,
                name: PageActions.VIEW
            }
        ]
    },
    //end service
    //dashboard
    {
        id: ClientPages_1.EnumClientPages.DASHBOARD,
        name: '/dashboard',
        displayName: 'Dashboard',
        actions: [
            {
                id: 4,
                name: PageActions.VIEW
            }
        ]
    },
    //end dashboard
    //partners
    {
        id: ClientPages_1.EnumClientPages.PARTNER,
        name: '/partners',
        displayName: 'Partenaire',
        actions: [
            {
                id: 1,
                name: PageActions.CREATE
            },
            {
                id: 2,
                name: PageActions.UPDATE
            },
            {
                id: 3,
                name: PageActions.DELETE
            },
            {
                id: 4,
                name: PageActions.VIEW
            }
        ]
    },
    //end partner
    //accounts
    {
        id: ClientPages_1.EnumClientPages.ACCOUNT,
        name: '/accounts',
        displayName: 'Liste des comptes',
        actions: [
            {
                id: 1,
                name: PageActions.CREATE
            },
            {
                id: 2,
                name: PageActions.UPDATE
            },
            {
                id: 3,
                name: PageActions.DELETE
            },
            {
                id: 4,
                name: PageActions.VIEW
            }
        ]
    },
    //end accounts
    //account-result
    {
        id: ClientPages_1.EnumClientPages.ACCOUNT_RESULT,
        name: '/account-results',
        displayName: 'Resultat',
        actions: [
            {
                id: 4,
                name: PageActions.VIEW
            }
        ]
    },
    //end accout-result
    //general-ledger
    {
        id: ClientPages_1.EnumClientPages.GENERAL_LEDGER,
        name: '/general-ledgers',
        displayName: 'Grand-Livre',
        actions: [
            {
                id: 4,
                name: PageActions.VIEW
            }
        ]
    },
    //end general-ledger
];
//# sourceMappingURL=PageActions.js.map