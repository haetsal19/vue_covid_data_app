<template>
  <div class="container">
    <h2>코로나 확진자 동향</h2>
    <div class="newTable">
      <ul>
        <li>확진자</li>
        <li class="up">▲{{ diffInf }}명</li>
        <li>{{ totalInf }}명</li>
      </ul>
      <ul>
        <li>사망자</li>
        <li v-if="diffDeath" class="up">▲{{ diffDeath }}명</li>
        <li>{{ totalDeath }}명</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();

    const diffInf = computed(() =>
      store.state.infState.infList[
        store.state.infState.infList.length - 1
      ]?.toLocaleString()
    );

    const diffDeath = computed(() =>
      store.state.infState.deathList[
        store.state.infState.deathList.length - 1
      ]?.toLocaleString()
    );

    const totalInf = computed(() =>
      store.state.infState.totalInf.toLocaleString()
    );

    const totalDeath = computed(() =>
      store.state.infState.totalDeath.toLocaleString()
    );

    return {
      diffInf,
      diffDeath,
      totalInf,
      totalDeath,
    };
  },
};
</script>

<style scoped></style>
