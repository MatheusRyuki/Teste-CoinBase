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
  mrr: Number,
});

const chartData = ref({
  labels: ["MRR"],
  datasets: [
    {
      label: "MRR (R$)",
      backgroundColor: "#36A2EB",
      data: [props.mrr],
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
