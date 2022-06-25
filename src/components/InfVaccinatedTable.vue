<template>
  <div class="container">
    <h2>코로나 확진자 동향</h2>
    <div class="newTable">
      <ul>
        <li>확진자</li>
        <li class="up">▲{{ diffInf }}명</li>
        <li>{{ totalInf }}명</li>
        <!--        비동기 호출로 데이터가 세팅되기 전으로 값이 비어있기 때문에 tolocalestring이 먹지 않음-->
        <!-- 에러발생app.js:472 Uncaught TypeError: Cannot read properties of undefined (reading 'toLocaleString')-->
        <!--        tolocalestring메서드 호출전에 값을 undefinded로 넣어주거나  optional chaining (?.) operator  연산자를 사용-->
      </ul>
      <ul>
        <li>사망자</li>
        <li class="up" v-if="diffDeath">▲{{ diffDeath }}명</li>
        <li>{{ totalDeath }}명</li>
      </ul>
      <!--      <ul>-->
      <!--        <li>접종완료</li>-->
      <!--        <li>{{ Math.round((data.vaccinated / 51628117) * 100) }}%</li>-->
      <!--        <li>{{ data.vaccinated.toLocaleString() }}명</li>-->
      <!--      </ul>-->
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
      store.state.infState.infState.infList[
        store.state.infState.infState.infList.length - 1
      ]?.toLocaleString()
    );

    const diffDeath = computed(() =>
      store.state.infState.infState.deathList[
        store.state.infState.infState.deathList.length - 1
      ]?.toLocaleString()
    ); //store.state.infState.deathList.length - 1

    const totalInf = computed(() =>
      store.state.infState.infState.totalInf?.toLocaleString()
    );

    const totalDeath = computed(() =>
      store.state.infState.infState.totalDeath?.toLocaleString()
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
