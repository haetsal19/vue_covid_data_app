import moment from "moment";
import { fetchInfState, IInfstate } from "@/api";

export const infState = {
  namespaced: true,
  state: {
    infState: {
      labels: [],
      infList: [],
      deathList: [],
      totalInf: 0,
      totalDeath: 0,
    },
  },
  mutations: {
    updateInfState(state, payload) {
      console.log("init inf state", payload);
      state.infState = payload;
    },
  },
  actions: {
    async setInfState({ commit }) {
      const infState: IInfstate = {
        labels: [],
        infList: [],
        deathList: [],
        totalInf: 0,
        totalDeath: 0,
      };
      const res = await fetchInfState();
      res.forEach((value, index) => {
        if (index === 0) return;
        infState.labels.push(moment(value.createDt).format("MM/DD"));
        infState.infList.push(res[index].decideCnt - res[index - 1].decideCnt);
        infState.deathList.push(res[index].deathCnt - res[index - 1].deathCnt);
        infState.totalInf = res[index].decideCnt;
        infState.totalDeath = res[index].deathCnt;
      });
      commit("updateInfState", infState);
    },
  },
  getters: {
    districtsWeek: (state) => {
      return {
        labels: state.infState.labels.slice(-7),
        infList: state.infState.infList.slice(-7),
        deathList: state.infState.deathList.slice(-7),
      };
    },
    districtsMonth: (state) => {
      return {
        labels: state.infState.labels.slice(-30),
        infList: state.infState.infList.slice(-30),
        deathList: state.infState.deathList.slice(-30),
      };
    },
  },
};
