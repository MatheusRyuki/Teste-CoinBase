<template>
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>Detalhes da Métrica</h2>
      <p>{{ details }}</p>
      <button @click="closeModal">Fechar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  showModal: Boolean,
  details: String,
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>

<style>
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
</style>
