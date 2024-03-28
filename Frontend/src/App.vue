<template>
  <div>
    <h1>Métricas</h1>
    <FileUpload @upload-success="handleUploadSuccess" :is-loading="isLoading" />
    <div v-if="isLoading">Carregando...</div>
    <MrrChart :mrr="metricsData.mrr" v-if="metricsData.mrr && !isLoading" />
    <ChurnRateChart
      :churnRate="metricsData.churnRate"
      v-if="metricsData.churnRate !== null && !isLoading"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import FileUpload from "./components/Upload.vue";
import MrrChart from "./components/MrrChart.vue";
import ChurnRateChart from "./components/ChurnRateChart.vue";

const metricsData = ref({
  mrr: null,
  churnRate: null,
});

const handleUploadSuccess = (data) => {
  metricsData.value = data.data;
};
</script>
