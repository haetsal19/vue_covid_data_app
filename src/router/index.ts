import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import InfStateChart from "@/views/InfStateChart.vue";
import DistrictsMap from "@/views/DistrictsMap.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/chart",
    name: "InfStateChart",
    component: InfStateChart,
  },
  {
    path: "/map",
    name: "DistrictsMap",
    component: DistrictsMap,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
