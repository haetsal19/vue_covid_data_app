import { createStore } from "vuex";
import { infState } from "./modules/InfState";
import { districts } from "./modules/Districts";
import { vaccinated } from "./modules/Vaccinated";

export default createStore({
  modules: {
    infState,
    vaccinated,
    districts,
  },
});
