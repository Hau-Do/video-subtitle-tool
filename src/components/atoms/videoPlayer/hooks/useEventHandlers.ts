import { ISubtitle } from 'interfaces/subtitle'
import React, { ChangeEvent } from 'react'
import useLifecycleOperations from './useLifecycleOperations'

interface IUseEventHandlers {
  setIdx: (idx: number) => void
}

function useEventHandlers({ setIdx }: IUseEventHandlers) {
  const handleUpdateTime = (subtitles: ISubtitle[]) => (e: Event) => {
    const currentTime = (e.target as HTMLMediaElement).currentTime
    if (subtitles && subtitles.length > 0) {
      const idxFound = subtitles.findIndex((item) => {
        const [start, end] = item.times
        return start <= currentTime && currentTime <= end
      })
      setIdx(idxFound)
    }
  }
  return { handleUpdateTime }
}

export default useEventHandlers
