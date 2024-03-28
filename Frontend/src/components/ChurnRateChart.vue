<template>
  <div>
    <BarChart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const props = defineProps({
  churnRate: Number,
});

const chartData = ref({
  labels: ['Taxa de Churn'],
  datasets: [
    {
      label: 'Taxa de Churn (%)',
      backgroundColor: '#FF6384',
      data: [props.churnRate],
    }
  ]
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    }
  }
});
</script>
