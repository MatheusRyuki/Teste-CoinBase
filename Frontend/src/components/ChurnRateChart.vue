<template>
  <div>
    <BarChart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const props = defineProps({
  metrics: Array,
});

const dynamicColors = computed(() => {
  return props.metrics.map((metric) => {
    const churnRate = metric.churnRate;
    if (churnRate < 10) {
      return "#76D7C4"; 
    } else if (churnRate < 20) {
      return "#F7DC6F"; 
    } else {
      return "#E74C3C";
    }
  });
});
const emit = defineEmits(["bar-click"]);

const onElementClick = (event, element, chart) => {
  if (element.length) {
    const index = element[0].index;
    const metric = props.metrics[index];
    emit("bar-click", metric);
  }
};

const chartData = ref({
  labels: props.metrics.map((metric) => metric.monthYear),
  datasets: [
    {
      label: "Taxa de Churn (%)",
      backgroundColor: dynamicColors.value,
      data: props.metrics.map((metric) => metric.churnRate),
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 2000,
    easing: "easeOutQuart",
  },
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: 100,
    },
  },
  plugins: {
    title: {
      display: true,
      text: "Taxa de Churn - Porcentagem de Cancelamento",
    },
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      callbacks: {
        title: (tooltipItems) => {
          return `Data: ${tooltipItems[0].label}`;
        },
        label: (tooltipItem) => {
          const label = tooltipItem.dataset.label || "";
          return `${label}: ${tooltipItem.formattedValue}`;
        },
      },
    },
  },
  onHover: (event, chartElement) => {
    event.native.target.style.cursor = chartElement[0] ? "pointer" : "default";
  },
  onClick: onElementClick,
});
</script>
