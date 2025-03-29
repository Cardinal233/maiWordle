import { ref, computed } from 'vue'
import { randomSong } from './randomSong'

export function useGameLogic(charterAlias) {
  const currentSong = ref(null)
  const feedbackList = ref([])
  const showResult = ref(false)
  const resultTitle = ref('')
  const resultMessage = ref('')
  const answer = ref(randomSong())
  console.log('🎲 当前随机歌曲 answer:', answer.value)

  function judgeGuess(song, judgeFn) {
    if (!song) return
    const feedback = judgeFn(song, answer.value, charterAlias)
    feedbackList.value.push({ song, feedback })

    // 判断是否答对或失败
    const requiredFields = ['ds', 'bpm', 'charter', 'genre', 'from', 'level', 'title']
    const isCorrect = requiredFields.every(field => feedback[field] === 'correct')

    if (isCorrect) {
      resultTitle.value = '恭喜你答对了！'
      resultMessage.value = `正确答案是：${answer.value.title}`
      showResult.value = true
    } else if (feedbackList.value.length >= 8) {
      resultTitle.value = '游戏结束'
      resultMessage.value = `正确答案是：${answer.value.title}`
      showResult.value = true
    }
  }

  function resetGame() {
    answer.value = randomSong() 
    currentSong.value = null
    feedbackList.value = []
    showResult.value = false
    resultTitle.value = ''
    resultMessage.value = ''
  }

  return {
    currentSong,
    feedbackList,
    showResult,
    resultTitle,
    resultMessage,
    judgeGuess,
    resetGame,
  }
}