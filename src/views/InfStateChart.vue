<template>
  <div>
    <button>7일</button>
    <button>30일</button>
  </div>
  <BarChart />
</template>

<script>
import BarChart from "@/components/barChart";

export default {
  components: {
    BarChart,
  },

  // setup() {
  //   const periodToggleHandler = (period) => {};
  //
  //   return {
  //     periodToggleHandler,
  //   };
  // },
};
</script>
