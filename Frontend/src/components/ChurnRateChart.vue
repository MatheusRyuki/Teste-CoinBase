<template>
  <div>
    <BarChart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const props = defineProps({
  metrics: Array,
});

const chartData = ref({
  labels: props.metrics.map((metric) => metric.monthYear),
  datasets: [
    {
      label: "Taxa de Churn (%)",
      backgroundColor: "#FF6384",
      data: props.metrics.map((metric) => metric.churnRate),
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
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
  },
});
</script>
