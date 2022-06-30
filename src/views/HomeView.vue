<template>
  <div class="home">
    <InfVaccinatedTable />
  </div>
  <div class="button">
    <button @click="periodToggleHandler(7)">7일</button>
    <button @click="periodToggleHandler(30)">30일</button>
  </div>
  <BarChart :key="componentKey" ref="bar" :period="requestedPeriod" />
</template>

<script lang="ts">
import InfVaccinatedTable from "@/components/InfVaccinatedTable.vue";
import { useStore } from "vuex";
import { ref } from "vue";
import BarChart from "@/components/barChart.vue";

export default {
  components: {
    InfVaccinatedTable,
    BarChart,
  },
  //define component
  setup() {
    const store = useStore();

    const setInfState = () => {
      store.dispatch("infState/setInfState"); //메모리낭비 바로사용
    };

    setInfState();
    let componentKey = ref(0);
    let requestedPeriod = ref(7);

    const periodToggleHandler = (period: number) => {
      requestedPeriod.value = period;
      console.log(period);
      componentKey.value++;
      //data 변경 후 컴포넌트 리렌더링이 안되는 경우 key 값을 이용할 수 있다.
      //key가 변하면 vue는 예전 컴포넌트를 지우고 새로운 컴포넌트를 만든다. ->나쁜  방식
    };

    return {
      periodToggleHandler,
      requestedPeriod,
      componentKey,
    };
  },
};
</script>

<style scoped>
.button {
  padding: 30px 8px;
}

.button button {
  margin: 0 2px;
}
</style>
