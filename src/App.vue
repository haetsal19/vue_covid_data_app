<template>
  <nav>
    <router-link to="/chart">날짜별 추이</router-link> |
    <router-link to="/map">지역별 현황</router-link>
  </nav>
  <router-view />
</template>

<script>
import { fetchDistricts, fetchVaccinated, fetchInfState } from "@/api";
import { useStore } from "vuex";
import moment from "moment";

export default {
  setup() {
    const store = useStore();

    // const districts = getDistricts();
    // const vaccinated = getvaccinated();
    async function initInfState() {
      const res = await fetchInfState();
      const infState = {
        labels: [],
        infList: [],
        deathList: [],
        totalInf: 0,
        totalDeath: 0,
      };

      res.forEach((value, index) => {
        if (index === 0) return;

        infState.labels.push(moment(value.createDt).format("MM/DD"));
        infState.infList.push(res[index].decideCnt - res[index - 1].decideCnt);
        infState.deathList.push(res[index].deathCnt - res[index - 1].deathCnt);
        infState.totalInf = res[index].decideCnt;
        infState.totalDeath = res[index].deathCnt;
      });

      store.commit("initInfState", infState);
    }

    initInfState();
  },
};
</script>
