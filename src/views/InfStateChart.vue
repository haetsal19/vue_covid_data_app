<template>
  <div>
    <button @click="periodToggleHandler(7)">7일</button>
    <button @click="periodToggleHandler(30)">30일</button>
  </div>
  <BarChart :key="componentKey" ref="bar" :period="requestedPeriod" />
</template>

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
