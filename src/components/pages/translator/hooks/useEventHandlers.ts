import React, { useRef, useState } from 'react'
import useVideoStore from 'stores/video.store'

function useEventHandlers() {
  const { subtitles, setVideoState } = useVideoStore()
  const playerRef = useRef<HTMLVideoElement | null>(null)

  const handleChangeSubtitle = (idx: number) => (text: string) => {
    const updatedSubtitles = [...subtitles]
    const subtitle = updatedSubtitles[idx]
    subtitle.text = text
    setVideoState({
      subtitles: updatedSubtitles
    })
  }
  const handlePlayerReady = (player: HTMLVideoElement) => {
    playerRef.current = player
  }
  return { subtitles, handleChangeSubtitle, handlePlayerReady }
}

export default useEventHandlers
