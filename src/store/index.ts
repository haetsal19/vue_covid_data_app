import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { infState } from "./modules/InfState";
import { districts } from "./modules/Districts";
// import { vaccinated } from "./modules/Vaccinated";

export default createStore({
  modules: {
    infState,
    // vaccinated,
    districts,
  },
  plugins: [
    createPersistedState({
      paths: ["infState"],
    }),
  ],
});
