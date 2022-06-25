<template>
  <div>
    <h2>지역별 확진자 현황</h2>
  </div>

  <svg-map />
</template>

<script setup>
import { useStore } from "vuex";

import SvgMap from "@/components/svgMap";

const store = useStore();
const setDistricts = () => {
  store.dispatch("districts/setDistricts");
};
setDistricts();
</script>
