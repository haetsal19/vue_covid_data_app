import { fetchDistricts } from "@/api";
import { IDistrictsResponse, IDistrictsState, IRootState } from "@/type";
import { Module } from "vuex";

export const districts: Module<IDistrictsState, IRootState> = {
  namespaced: true,
  state: {} as IDistrictsState,
  mutations: {
    updateDistricts(state: IDistrictsState, payload: IDistrictsState) {
      console.log("init districts", payload);
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
  },
  actions: {
    async setDistricts({ commit }) {
      const districts = {} as IDistrictsState;
      const res = <IDistrictsResponse[]>await fetchDistricts();
      console.log("districts", res);
      res.forEach((value) => {
        const district: string = value.gubunEn.replace("-", "");
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
        //actions는 데이터를 발췌해서 가져오는 것 까지만
        //계산 가공 내보내는건 게터가 한다
        //mutation은 받은 데이터를 state에 전달해 변경
        //mutations getters 분리파일

        const diff = place.today - value.incDec;

        if (diff > 0) {
          place.diff = `▲${diff.toLocaleString()} `;
          place.color = "red";
        } else {
          place.diff = `▼${Math.abs(diff).toLocaleString()}`;
          place.color = "blue";
        }
      });

      console.log("store", districts);
      commit("updateDistricts", districts);
    },
  },
};
