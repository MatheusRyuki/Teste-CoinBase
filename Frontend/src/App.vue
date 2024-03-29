<template>
  <div class="metrics-container">
    <h1 class="page-title">Métricas de Desempenho</h1>
    <!-- Componente de Upload com tratamento de estado de carregamento e sucesso do upload -->
    <FileUpload @upload-success="handleUploadSuccess" :is-loading="isLoading" />
    <!-- Indicador de carregamento -->
    <div v-if="isLoading" class="loading-indicator">Carregando...</div>
    <!-- Exibe gráficos somente após o carregamento e quando há dados -->
    <div v-if="!isLoading && metricsData.length" class="charts">
      <!-- Componentes de gráficos para MRR e Churn Rate dentro de cards -->
      <div class="card">
        <MrrChart :metrics="metricsData" @bar-click="onChartClick" />
      </div>
      <div class="card">
        <ChurnRateChart :metrics="metricsData" @bar-click="onChartClick" />
      </div>
    </div>
    <!-- Modal para exibir detalhes da métrica selecionada -->
    <Modal
      :show-modal="showDetailsModal"
      :details="metricDetails"
      @close="showDetailsModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
// Importação de componentes
import FileUpload from "./components/Upload.vue";
import MrrChart from "./components/MrrChart.vue";
import ChurnRateChart from "./components/ChurnRateChart.vue";
import Modal from "./components/Modal.vue";

// Estado para armazenar os dados das métricas, estado do modal e detalhes da métrica selecionada
const metricsData = ref([]);
const showDetailsModal = ref(false);
const metricDetails = ref("");

// Função chamada quando o upload é bem-sucedido; processa e ordena os dados
const handleUploadSuccess = (data) => {
  const filteredAndSortedData = data.data
    .filter((item) => item.monthYear !== "NaN-NaN") // Filtra dados válidos
    .sort((a, b) => {
      // Ordena os dados por data
      const [monthA, yearA] = a.monthYear.split("-").map(Number);
      const [monthB, yearB] = b.monthYear.split("-").map(Number);
      if (yearA !== yearB) {
        return yearA - yearB;
      } else {
        return monthA - monthB;
      }
    });

  metricsData.value = filteredAndSortedData; // Atualiza os dados das métricas
};

// Função para tratar cliques nos gráficos, atualizando o modal com os detalhes
const onChartClick = (metric) => {
  metricDetails.value = `Análise detalhada para ${metric.monthYear}: MRR de ${metric.mrr} e uma taxa de Churn de ${metric.churnRate}%.`;
  showDetailsModal.value = true; // Exibe o modal
};
</script>

<style>
/* Estilos básicos e responsividade */
.metrics-container {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.page-title {
  text-align: center;
  margin-bottom: 20px;
}

.loading-indicator {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
}

.charts {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

@media (max-width: 768px) {
  .charts {
    flex-direction: column;
    align-items: center;
  }
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  padding: 20px;
  text-align: center;
}
</style>
