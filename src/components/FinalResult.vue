<template>
    <div v-if="show" class="overlay">
      <div class="modal">
        <h2 class="result-title">{{ title }}</h2>
        <p class="result-message">{{ message }}</p>
        <button @click="$emit('restart')" class="reset-button">再来一局</button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    show: Boolean,
    title: String,
    message: String
  })
  
  defineEmits(['restart'])
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色 */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000; /* 确保在最上层 */
  }
  
  .modal {
    background-color: #1e1e1e;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    text-align: center;
    max-width: 90%;
    width: 360px;
  }
  
  .result-title {
    font-size: 1.6rem;
    margin-bottom: 12px;
    color: #ffcf33;
  }
  .result-message {
    margin-bottom: 20px;
    color: #f5f5f5;
  }
  .reset-button {
    height: 40px;
    padding: 0 16px;
    background-color: #28a745;
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .reset-button:hover {
    background-color: #218838;
  }
  </style>
  