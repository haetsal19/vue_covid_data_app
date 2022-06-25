<template>
  <div class="home">
    <InfVaccinatedTable />
  </div>
</template>

<script lang="ts">
import InfVaccinatedTable from "@/components/InfVaccinatedTable.vue";
import { useStore } from "vuex";

export default {
  components: {
    InfVaccinatedTable,
  },
  setup() {
    const store = useStore();

    const setInfState = () => {
      store.dispatch("infState/setInfState");
    };

    const setVaccinated = () => {
      store.dispatch("vaccinated/setVaccinated");
    };

    setInfState();
    setVaccinated();
  },
};
</script>
