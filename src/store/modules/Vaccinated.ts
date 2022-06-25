import { fetchVaccinated } from "@/api";

export const vaccinated = {
  namespaced: true,
  state: {
    vaccinated: 0,
  },
  mutations: {
    updateVaccinated(state, payload) {
      console.log("init vaccinated", payload);
      state.vaccinated = payload;
    },
  },
  actions: {
    async setVaccinated({ commit }) {
      const res = await fetchVaccinated();
      commit("updateVaccinated", res);
    },
  },
};
