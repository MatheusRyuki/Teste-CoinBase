<template>
  <div class="metrics-container">
    <h1 class="page-title">Métricas de Desempenho</h1>
    <FileUpload @upload-success="handleUploadSuccess" :is-loading="isLoading" />
    <div v-if="isLoading" class="loading-indicator">Carregando...</div>
    <div v-if="!isLoading && metricsData.length" class="charts">
      <MrrChart :metrics="metricsData" />
      <ChurnRateChart :metrics="metricsData" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FileUpload from "./components/Upload.vue";
import MrrChart from "./components/MrrChart.vue";
import ChurnRateChart from "./components/ChurnRateChart.vue";

const metricsData = ref([]);

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
</style>
