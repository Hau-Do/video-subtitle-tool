import React, { useEffect, useRef, useState } from 'react'
import PrismPlayer, { DataProvider } from '@webplayer/prismplayer-pc'
import useEventHandlers from './useEventHandlers'
import { ISubtitle } from 'interfaces/subtitle'

interface ILifecycleOperations {
  options?: object
  onReady: (player: HTMLVideoElement) => void
  subtitles?: ISubtitle[]
  src: string
  type: 'vod' | 'data' | 'live'
}
interface IPrismPCPlayer extends PrismPlayer {
  srcObject?: object
}
const useLifecycleOperations = ({ onReady, subtitles, src, type }: ILifecycleOperations) => {
  const videoRef = useRef<HTMLElement>(null)
  const playerRef = useRef<HTMLVideoElement | IPrismPCPlayer | null>(null)
  const [idx, setIdx] = useState(-1)
  const { handleUpdateTime } = useEventHandlers({ setIdx })
  useEffect(() => {
    const player = playerRef.current
    if (player) {
      ;(player as HTMLVideoElement).addEventListener(
        'timeupdate',
        handleUpdateTime(subtitles!),
        true
      )
    }
    return () => {
      if (player) {
        ;(player as HTMLVideoElement).removeEventListener(
          'timeupdate',
          handleUpdateTime(subtitles!),
          true
        )
        playerRef.current = null
      }
    }
  }, [subtitles])

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        ;(playerRef.current as HTMLVideoElement).pause()
      }
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = PrismPlayer.upgrade(videoRef.current)
      if (type === 'data') {
        const dataProvider = new DataProvider({
          videoTracks: [
            {
              src, // 재생 URL required
              width: 1280, // 가로 (px) required
              height: 720, // 세로 (px) required
              duration: 300, // 영상길이 (단위: 초) // optional 기본값은 Infinity
              selected: true, // 기본 선택 해상도 optional 없을 경우 0번 video가 선택됩니다.
              label: 'optional-label', // optional
              id: 'optional-track-id' // optional
            }
          ]
        })
        ;(playerRef.current as IPrismPCPlayer).srcObject = dataProvider
      }
      if (type === 'vod') {
        playerRef.current.src = src
      }
    }
    onReady && playerRef.current && onReady(playerRef.current as HTMLVideoElement)
  }, [type])
  return { idx, videoRef, playerRef }
}

export default useLifecycleOperations
