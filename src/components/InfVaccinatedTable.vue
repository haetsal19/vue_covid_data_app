<template>
  <div class="container">
    <h2>코로나 확진자 동향</h2>
    <div class="newTable">
      <ul>
        <li>확진자</li>
        <li class="up">▲{{ diffInf }}명</li>
        <li>{{ totalInf }}명</li>
      </ul>
      <ul class="deathTable">
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
    //비동기 호출로 데이터가 세팅되기 전으로 값이 비어있기 때문에 tolocalestring이 먹지 않음
    //메서드 호출전에 값을 undefinded로 넣어주거나  optional chaining (?.) operator  연산자를 사용

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

<style scoped>
.newTable {
  display: table;
  table-layout: fixed;
  width: 300px;
}

.newTable ul {
  border: 1px solid gray;
  padding: 8px 12px;
  display: table-cell;
}

.newTable ul li {
  list-style: none;
  text-align: center;
}
</style>
