<template>
  <div>
    <h1>Métricas</h1>
    <FileUpload @upload-success="handleUploadSuccess" :is-loading="isLoading" />
    <div v-if="isLoading">Carregando...</div>
    <MrrChart :metrics="metricsData" v-if="metricsData.length && !isLoading" />
    <ChurnRateChart
      :metrics="metricsData"
      v-if="metricsData.length && !isLoading"
    />
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
