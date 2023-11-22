import { journalMutations } from "./journal.mutation";
import { journalQueries } from "./journal.query";

export const journalResolvers={

    Query:journalQueries,
    Mutation:journalMutations
}


