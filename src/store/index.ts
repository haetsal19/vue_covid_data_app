import { createStore } from "vuex";

export default createStore({
  state: {
    infState: {
      labels: [],
      infList: [],
      deathList: [],
      totalInf: 0,
      totalDeath: 0,
    },
    vaccinated: 0,
    districts: {},
  },

  mutations: {
    initInfState(state, payload) {
      console.log("initInfState", payload);
      state.infState = payload;
    },
    initVaccinated(state, payload) {
      state.vaccinated = payload;
    },
    initDistricts(state, payload) {
      state.districts = payload;
    },
  },
  actions: {},
  getters: {},
});
