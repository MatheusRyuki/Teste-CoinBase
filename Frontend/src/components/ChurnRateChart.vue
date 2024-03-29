<template>
  <div>
    <BarChart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables); // Registra componentes do Chart.js

// Recebe os dados das métricas como prop
const props = defineProps({
  metrics: Array,
});

// Calcula cores dinâmicas para o gráfico baseadas na taxa de Churn
const dynamicColors = computed(() => {
  return props.metrics.map((metric) => {
    // Define a cor baseada no valor da taxa de Churn
    const churnRate = metric.churnRate;
    return churnRate < 10 ? "#76D7C4" : churnRate < 20 ? "#F7DC6F" : "#E74C3C";
  });
});

// Emite evento quando um ponto do gráfico é clicado
const emit = defineEmits(["bar-click"]);

const onElementClick = (event, element, chart) => {
  if (element.length) {
    const index = element[0].index;
    const metric = props.metrics[index];
    emit("bar-click", metric);
  }
};

// Configuração dos dados e opções do gráfico
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
   // Configurações adicionais, incluindo interatividade
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
