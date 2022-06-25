import { fetchDistricts } from "@/api";

export const districts = {
  namespaced: true,
  state: {
    districts: {},
  }, //state.distrcits.district
  mutations: {
    updateDistricts(state, payload) {
      console.log("init districts", payload);
      state.districts = payload;
    }, //store.commit("distrcits/updateDistricts", params)
  },
  actions: {
    async setDistricts({ commit }) {
      const districts = {};
      const res = await fetchDistricts();
      res.forEach((value) => {
        const district = value.gubunEn.replace("-", "");
        const place = districts[district];
        if (place === undefined) {
          districts[district] = {
            today: value.incDec,
            diff: 0,
            gubun: value.gubun,
            color: "",
          };
          return;
        }
        const diff = place.today - value.incDec;
        if (diff > 0) {
          place.diff = `▲${diff.toLocaleString()} `;
          place.color = "red";
        } else {
          place.diff = `▼${Math.abs(diff).toLocaleString()}`;
          place.color = "blue";
        }
      });
      commit("updateDistricts", districts);
    },
  },
  //store.dispatch("districts/setDistricts", params)
};
