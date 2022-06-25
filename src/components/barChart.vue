<script>
import { defineComponent, h, computed } from "vue";
import { Bar } from "vue-chartjs";
import "chart.js/auto";
import { useStore } from "vuex";

export default defineComponent({
  name: "BarChart",
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
  },
  setup(props) {
    const store = useStore();

    const infState = computed(() => store.state.infState.infState);
    console.log(infState);
    const chartData = {
      labels: infState.value.labels,
      datasets: [
        {
          label: "일일 확진자수",
          yAxisID: "left-axis",
          borderColor: "white",
          borderWidth: 0,
          data: infState.value.infList,
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
          data: infState.value.deathList,
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
