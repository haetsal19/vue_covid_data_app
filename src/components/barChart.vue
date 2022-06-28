<script>
import { defineComponent, h, computed, watch, ref } from "vue";
import { Bar } from "vue-chartjs";
import "chart.js/auto";
import { useStore } from "vuex";

export default defineComponent({
  name: "BarChart",
  emits: ["forceRerender"],
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },

    period: {
      type: Number,
      default: 7,
    },
  },

  setup(props) {
    console.log("dfdd", props.period);
    const store = useStore();
    let infState = ref("");

    if (props.period === 7) {
      infState.value = computed(() => store.getters["infState/weeklyInfected"]);
    } else {
      infState.value = computed(
        () => store.getters["infState/monthlyInfected"]
      );
    }

    console.log("infstate", infState);
    const chartData = {
      labels: infState.value.value.labels,
      datasets: [
        {
          label: "일일 확진자수",
          yAxisID: "left-axis",
          borderColor: "white",
          borderWidth: 0,
          data: infState.value.value.infList,
          backgroundColor: "#0069c0",
          order: 2,
          barThickness: 10,
        },
        {
          type: "line",
          label: "일일 사망자수",
          yAxisID: "right-axis",
          borderColor: "#c62828",
          borderWidth: 2,
          data: infState.value.value.deathList,
          backgroundColor: "#c62828",
          order: 1,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        mode: "index",
        intersect: true,
      },
      plugins: {
        legend: {
          position: "top",
          align: "center",
          rtl: true,
        },
        title: {
          display: true,
          text: "일일 확진자·사망자 추이",
        },
        subtitle: {
          display: true,
          text: "( 단위: 명 )",
          align: "end",
        },
      },
      scales: {
        "left-axis": {
          display: true,
          position: "left",
        },
      },
      "right-axis": {
        max: 300,
        display: true,
        position: "right",
        title: {
          display: true,
          align: "end",
          color: "#808080",
          font: {
            size: 12,
            weight: 300,
          },
          text: "단위: 배",
        },
      },
    };

    return () =>
      h(Bar, {
        chartData,
        chartOptions,
        // periodToggle,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        // cssClasses: props.cssClasses,
        // styles: props.styles,
        // plugins: props.plugins,
      });
  },
});
</script>
