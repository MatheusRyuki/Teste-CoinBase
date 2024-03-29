<template>
  <transition name="modal">
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <!-- Conteúdo do modal com detalhes da métrica e opção para fechar -->
      <div class="modal-content">
        <h2>Detalhes da Métrica</h2>
        <p>{{ details }}</p>
        <button @click="closeModal">Fechar</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from "vue";

// Define as props e emite evento para fechar o modal
const props = defineProps({
  showModal: Boolean,
  details: String,
});

const emit = defineEmits(["close"]);

// Função para fechar o modal
const closeModal = () => {
  emit("close");
};
</script>

<style>
/* Estilos do modal, incluindo transições */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  text-align: center;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
