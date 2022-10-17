import { ISubtitle } from 'interfaces/subtitle'
import { useEffect, useRef, useState } from 'react'
import useVideoStore from 'stores/video.store'
import { convertTime } from 'utils/commons'
import useEventHandlers from './useEventHandlers'
interface IUseLifecycleOperationsProps {
  defaultSubtitles?: ISubtitle[]
}

const fps = 60

const useLifecycleOperations = ({ defaultSubtitles = [] }: IUseLifecycleOperationsProps) => {
  const [results, setResults] = useState<ISubtitle[]>([])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const requestRef = useRef<number>(-1)

  const {
    playerRef,
    can,
    handleClickPlay,
    handleClickSubtitle,
    handlePlayerReady,
    mapSubtitle,
    init,
    handleClickSave,
    draw
  } = useEventHandlers({ defaultSubtitles, setIsPlaying, isPlaying, setResults })
  useEffect(() => {
    mapSubtitle()
  }, [defaultSubtitles])

  useEffect(() => {
    return () => {
      setIsPlaying(false)
    }
  }, [])

  useEffect(() => {
    can.current!.width = window.innerWidth

    init()
  }, [playerRef])

  useEffect(() => {
    const ctx = can.current!.getContext('2d')
    let fpsInterval: number, now, then: number, elapsed
    if (isPlaying) {
      startAnimating(fps)
    }

    function startAnimating(fps: number) {
      fpsInterval = 1000 / fps
      then = Date.now()
      animate()
    }

    function animate() {
      if (!isPlaying) {
        return
      }
      requestRef.current = requestAnimationFrame(animate)
      now = Date.now()
      elapsed = now - then

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval)
        draw(ctx!)
      }
    }

    return () => {
      requestRef.current && cancelAnimationFrame(requestRef.current)
    }
  }, [isPlaying])

  return {
    results,
    playerRef,
    handlePlayerReady,
    can,
    isPlaying: isPlaying,
    handleClickPlay,
    handleClickSubtitle,
    handleClickSave
  }
}

export default useLifecycleOperations
