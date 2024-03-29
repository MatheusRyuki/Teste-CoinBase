<template>
  <div>
    <BarChart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
// Importações e configurações semelhantes ao ChurnRateChart.vue
// Adaptado para os dados do MRR com cores dinâmicas alternadas
import { ref, computed } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const props = defineProps({
  metrics: Array,
});

const dynamicColors = computed(() => {
  return props.metrics.map((metric, index) => {
    return index % 2 === 0 ? "#36A2EB" : "#FFCD56";
  });
});

const emit = defineEmits(["bar-click"]);

const chartData = ref({
  // Dados e configurações específicas do gráfico MRR
  labels: props.metrics.map((metric) => metric.monthYear),
  datasets: [
    {
      label: "MRR (R$)",
      backgroundColor: dynamicColors.value,
      data: props.metrics.map((metric) => metric.mrr),
    },
  ],
});

const onElementClick = (event, element, chart) => {
  if (element.length) {
    const index = element[0].index;
    const metric = props.metrics[index];
    emit("bar-click", metric);
  }
};

const chartOptions = ref({
  // Configurações do gráfico, incluindo interações
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 2000,
    easing: "easeOutQuart",
  },
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
