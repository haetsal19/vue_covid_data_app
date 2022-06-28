import moment from "moment";
import { fetchInfState } from "@/api";
import { IInfResponse, IInfState, IRootState } from "@/type";
import { Module } from "vuex";

export const infState: Module<IInfState, IRootState> = {
  namespaced: true,
  state: {
    labels: [],
    infList: [],
    deathList: [],
    totalInf: 0,
    totalDeath: 0,
  } as IInfState,
  mutations: {
    updateInfState(state: IInfState, payload: IInfState) {
      console.log("init inf state", state, payload);
      state.labels = payload.labels;
      state.infList = payload.infList;
      state.deathList = payload.deathList;
      state.totalInf = payload.totalInf;
      state.totalDeath = payload.totalDeath;
    },
  },
  actions: {
    async setInfState({ commit }) {
      const infState: IInfState = {
        labels: [],
        infList: [],
        deathList: [],
        totalInf: 0,
        totalDeath: 0,
      };

      const res = <IInfResponse[]>await fetchInfState();
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
    weeklyInfected: (state) => {
      console.log("week", state);
      return {
        labels: state.labels.slice(-7),
        infList: state.infList.slice(-7),
        deathList: state.deathList.slice(-7),
      };
    },
    monthlyInfected: (state) => {
      return {
        labels: state.labels.slice(-30),
        infList: state.infList.slice(-30),
        deathList: state.deathList.slice(-30),
      };
    },
  },
};
