// 搜索输入组件：模糊匹配 + 歌曲名补全
<template>
  <div class="search-bar">
    <input       
      :value="modelValue"
      @input="updateQuery"
      @focus="showSuggestions = true"
      @blur="onBlur"
      placeholder="输入歌曲名..."
      class="search-input" />
    <ul v-if="showSuggestions && filteredSongs.length" class="suggestion-list">
      <li v-for="song in filteredSongs" :key="song.cid" @mousedown.prevent="selectSong(song)" class="suggestion-item">
        {{ song.title + " [" + song.type + "] " + song.level }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { songList } from '../composables/songs'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue', 'select'])

const showSuggestions = ref(false)

const filteredSongs = computed(() =>
  songList.filter(song =>
    song.title.toLowerCase().includes(props.modelValue.toLowerCase())
  )
)

function updateQuery(event) {
  emit('update:modelValue', event.target.value)
  showSuggestions.value = true
}

function selectSong(song) {
  emit('update:modelValue', song.title)
  emit('select', song)
  showSuggestions.value = false
}

function onBlur() {
  setTimeout(() => {
    showSuggestions.value = false
  }, 150)
}
</script>

<style scoped>
.search-bar {
  width: 80%;
  position: relative;
  border: 2px solid #ffcf33;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #1e1a22;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  outline: none;
}

.suggestion-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #2a2a2a;
  border-radius: 0 0 8px 8px;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  z-index: 10;
  padding: 0;
}

.suggestion-item {
  padding: 10px 12px;
  cursor: pointer;
  color: white;
  margin: 0;
}

.suggestion-item:hover {
  background-color: #444;
}
</style>
