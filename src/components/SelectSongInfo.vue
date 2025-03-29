<template>
    <div class="selected-info" v-if="song">
        <p> 你选择了：
        <strong>{{ song.title }} [{{ song.type }}] {{ song.level }}</strong>
        </p>
        <p> 版本：{{ song.from }}　｜　分类：{{ song.genre }}</p>
        <p> BPM：{{ song.bpm }}　｜　定数：{{ song.ds }}　｜　谱师：{{ song.charter }}</p>
    </div>
  </template>
  
 
<script setup>
import { defineProps } from 'vue'

defineProps({
  song: Object
})
</script>

<style scoped>
.selected-info {
  background-color: #1e1e1e;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 16px 0;
  border: 1px solid #333;
  font-size: 14px;
  line-height: 1.6;
}
.main-title {
  font-size: 16px;
  font-weight: bold;
  color: #ffcf33;
}
.type-level {
  margin-left: 6px;
  font-size: 14px;
  font-weight: normal;
  color: #ddd;
}
</style>