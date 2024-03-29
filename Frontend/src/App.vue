<template>
  <div class="metrics-container">
    <h1 class="page-title">Métricas de Desempenho</h1>
    <FileUpload @upload-success="handleUploadSuccess" :is-loading="isLoading" />
    <div v-if="isLoading" class="loading-indicator">Carregando...</div>
    <div v-if="!isLoading && metricsData.length" class="charts">
      <div class="card">
        <MrrChart :metrics="metricsData" @bar-click="onChartClick" />
      </div>
      <div class="card">
        <ChurnRateChart :metrics="metricsData" @bar-click="onChartClick" />
      </div>
    </div>
    <Modal
      :show-modal="showDetailsModal"
      :details="metricDetails"
      @close="showDetailsModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import FileUpload from "./components/Upload.vue";
import MrrChart from "./components/MrrChart.vue";
import ChurnRateChart from "./components/ChurnRateChart.vue";
import Modal from "./components/Modal.vue";

const metricsData = ref([]);
const showDetailsModal = ref(false);
const metricDetails = ref("");

const handleUploadSuccess = (data) => {
  const filteredAndSortedData = data.data
    .filter((item) => item.monthYear !== "NaN-NaN")
    .sort((a, b) => {
      const [monthA, yearA] = a.monthYear.split("-").map(Number);
      const [monthB, yearB] = b.monthYear.split("-").map(Number);
      if (yearA !== yearB) {
        return yearA - yearB;
      } else {
        return monthA - monthB;
      }
    });

  metricsData.value = filteredAndSortedData;
};

const onChartClick = (metric) => {
  metricDetails.value = `Análise detalhada para ${metric.monthYear}: MRR de ${metric.mrr} e uma taxa de Churn de ${metric.churnRate}%.`;
  showDetailsModal.value = true;
};
</script>

<style>
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
