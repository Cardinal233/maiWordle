<template>
    <div class="feedback-table">
        <!-- 表头 -->
        <div class="table-header">
            <div v-for="field in fields" :key="field" class="cell">
                {{ fieldLabel(field) }}
            </div>
        </div>

        <!-- 每一次猜测 -->
        <div v-for="(entry, index) in feedbackList" :key="index" class="table-row">
            <span v-for="field in fields" 
            :key="field" 
            :class="['cell', colorClass(entry.feedback[field])]"
            :title="displayValue(entry.song[field], field, entry.feedback)">
                {{ displayValue(entry.song[field], field, entry.feedback) }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    feedbackList: Array
})

const fields = ['title', 'ds', 'bpm', 'genre', 'from', 'level', 'charter']

function fieldLabel(field) {
    const map = {
        title: '歌曲名',
        ds: '定数',
        bpm: 'BPM',
        genre: '分类',
        from: '版本',
        level: '级别',
        charter: '谱师'
    }
    return map[field] || field
}

// 显示文字内容
function displayValue(value, field, feedback) {
    // 只有 ds 和 bpm 可能带方向
    if ((field === 'ds' || field === 'bpm') && feedback[`${field}_direction`]) {
        const direction = feedback[`${field}_direction`]
        if (direction === 'up') return `${value} ↑`
        if (direction === 'down') return `${value} ↓`
    }
    return value
}

// 显示颜色类名
function colorClass(status) {
    return {
        correct: 'cell-correct',
        close: 'cell-close',
        wrong: 'cell-wrong'
    }[status]
}
</script>

<style scoped>
.feedback-table {
  margin-top: 20px;
  font-size: 12px; /* ✅ 缩小整体字体 */
}

/* 使用更具体列宽度布局（非等宽） */
.table-header,
.table-row {
  display: grid;
  grid-template-columns:
    3fr  /* title */
    1fr    /* ds */
    1fr    /* bpm */
    2fr  /* genre */
    2fr  /* from */
    2fr    /* level */
    2fr;   /* charter */
  gap: 6px;
  padding: 6px 0;
}

.cell {
  display: flexbox;
  padding: 6px 6px;               /* ✅ 左右间距 */
  border-radius: 6px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;              /* ✅ 水平居中 */
  direction: ltr;                  /* ✅ 优先显示左边，右侧截断 */
}


/* 颜色样式 */
.cell-correct {
  background: #2e7d32;
  color: white;
}
.cell-close {
  background: #fbc02d;
  color: black;
}
.cell-wrong {
  background: #505050;
  color: white;
}
</style>