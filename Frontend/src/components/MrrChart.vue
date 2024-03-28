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
      label: "MRR (R$)",
      backgroundColor: "#36A2EB",
      data: props.metrics.map((metric) => metric.mrr),
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    title: {
      display: true,
      text: "MRR - Receita Mensal Recorrente",
    },
  },
});
</script>
