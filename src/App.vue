<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/chart">날짜별 추이</router-link> |
    <router-link to="/map">지역별 현황</router-link>
  </nav>
  <router-view />
</template>

<script lang="ts">
export default {
  setup() {
    return {};
  },
};
</script>
