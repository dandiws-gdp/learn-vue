import { GetterTree } from "vuex";
import { RootState } from "../types";
import { UserState } from "./types";
import { parse, differenceInYears } from "date-fns";

export const getters: GetterTree<UserState, RootState> = {
  ageYearsOld(state): number {
    const date = parse(state.birthdate, "yyyy-MM-dd", new Date());
    const age = differenceInYears(new Date(), date);
    return age;
  },
};
