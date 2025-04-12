<template>
    <div class="main-container">
      <h1 class="title">maiWordle</h1>

      <div class="search-section">
        <SongSearchInput v-model="query" @select="onSongSelected" />
        <button @click="submitGuess" class="submit-button">提交猜测</button>
      </div>

      <SelectSongInfo :song="selectedSong" />

      <FeedbackTable v-if="feedbackList.length" :feedback-list="feedbackList" />

      <FinalResult :show="showResult" :title="resultTitle" :message="resultMessage" @restart="resetGame"/>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGameLogic } from './composables/gameLogic'
import { judgeGuess as judgeFn } from './composables/jugder'
import charterAlias from './assets/charter.json'
import SongSearchInput from './components/SearchInput.vue'
import SelectSongInfo from './components/selectSongInfo.vue'
import FeedbackTable from './components/feedbackTable.vue'
import FinalResult from './components/FinalResult.vue'

const {
  currentSong,
  feedbackList,
  showResult,
  resultTitle,
  resultMessage,
  selectedSong,
  judgeGuess,
  resetGame
} = useGameLogic(charterAlias)

function onSongSelected(song) {
  selectedSong.value = song
  currentSong.value = song
}

const query = ref('')
function submitGuess() {
  judgeGuess(currentSong.value, judgeFn)
  // ✅ 清空搜索框内容与候选歌曲
  query.value = '' 
  currentSong.value = null
}
</script>

<style scoped>
.full-page {
  min-height: 100vh;
  background-color: #393939;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* ✅ 内容容器，最大宽度 + 响应式 + 居中 */
.main-container {
  width: 100%;
  max-width: 1000px;
  background-color: #393939;
  color: #f5f5f5;
  padding: 24px;
  border-radius: 12px;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

/* ✅ 标题和表单区 */
.title {
  font-size: 2.2rem;
  margin-bottom: 20px;
  color: #ffcf33;
}

.search-section {
  display: flex;               /* ✅ 水平排列 */
  justify-content: center;    /* ✅ 水平居中 */
  align-items: center;        /* ✅ 垂直居中对齐 */
  gap: 12px;
  margin-bottom: 20px;
}

.submit-button {
  height: 40px;
  padding: 0 16px;
  white-space: nowrap;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}
.submit-button:hover {
  background-color: #0056b3;
}
</style>