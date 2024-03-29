<template>
  <div>
    <!-- Seleção e upload de arquivo -->
    <input type="file" @change="handleFileUpload" />
    <button @click="submitFile">Upload</button>
    <!-- Mensagem de feedback para o usuário -->
    <div v-if="message" :class="`message ${messageType}`">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// Estados para controle do upload
const selectedFile = ref(null);
const isLoading = ref(false);
const message = ref("");
const messageType = ref("");

// Funções e estados adicionais para controle de UI e envio de dados
const emit = defineEmits(["upload-success"]);

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

const submitFile = async () => {
  // Implementação da lógica de upload, incluindo tratamento de sucesso e erro
  if (!selectedFile.value) {
    message.value = "Por favor, escolha um arquivo.";
    messageType.value = "error";
    return;
  }

  isLoading.value = true;
  const formData = new FormData();
  formData.append("file", selectedFile.value);

  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const response = await axios.post(`${backendUrl}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    emit("upload-success", response.data);
    message.value = "Arquivo carregado e métricas calculadas com sucesso!";
    messageType.value = "success";
  } catch (error) {
    console.error("Erro ao fazer upload do arquivo", error);
    message.value = "Falha ao carregar o arquivo. Tente novamente.";
    messageType.value = "error";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
/* Estilos para feedback visual das mensagens */
.message {
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  text-align: center;
}
.success {
  background-color: #d4edda;
  color: #155724;
}
.error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
