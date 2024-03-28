// src/components/FileUpload.vue

<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <button @click="submitFile">Upload</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const selectedFile = ref(null);

function handleFileUpload(event) {
  selectedFile.value = event.target.files[0];
}

async function submitFile() {
  if (!selectedFile.value) {
    alert('Por favor, escolha um arquivo');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    const response = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Sucesso ao fazer Upload do arquivo', response.data);
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo', error);
  }
}
</script>
