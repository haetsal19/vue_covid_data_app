<template>
  <div>
    <button @click="periodToggleHandler(7)">7일</button>
    <button @click="periodToggleHandler(30)">30일</button>
  </div>
  <BarChart :key="componentKey" ref="bar" :period="requestedPeriod" />
</template>
//vue에서 key는 특정 컴포넌트에 특정값을 매핑해두는데 // key가 동일하면
컴포넌트가 변하지 않지만 key가 변하면 vue는 예전 컴포넌트를 지우고 새로운
컴포넌트를 만든다.
<script>
import BarChart from "@/components/barChart";
import { ref } from "vue";

export default {
  components: {
    BarChart,
  },

  setup() {
    let componentKey = ref(0);
    let requestedPeriod = ref(7);

    const periodToggleHandler = (period) => {
      requestedPeriod.value = period;
      console.log(period);
      componentKey.value++;
    };

    return {
      periodToggleHandler,
      requestedPeriod,
      componentKey,
    };
  },
};
</script>
