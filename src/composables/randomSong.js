import {songList} from '../composables/songs'
export function randomSong() {
    const idx = Math.floor(Math.random() * songList.length)
    return songList[idx]
  }