import { ISubtitle } from 'interfaces/subtitle'
import React, { useMemo } from 'react'
import useLifecycleOperations from './hooks/useLifecycleOperations'
import stylesVideo from './videoPlayer.module.scss'

interface IVideoPlayer {
  options?: object
  onReady: (player: HTMLVideoElement) => void
  subtitles?: ISubtitle[]
  src: string
  type: 'vod' | 'data' | 'live'
  [key: string]: any
}

export const VideoPlayer: React.FC<IVideoPlayer> = (props) => {
  const { idx, videoRef } = useLifecycleOperations(props)
  const { subtitles } = props
  return (
    <div className={stylesVideo.videoPlayer}>
      {useMemo(
        () => (
          <pzp-pc-layout class={stylesVideo.player} ref={videoRef} id="player">
            <pzp-pc-header class="pzp-pc__header">
              <pzp-pc-content-info class="pzp-pc__content-info">
                <pzp-live-badge class="pzp-pc__live-badge"></pzp-live-badge>
                <pzp-viewer-count class="pzp-pc__viewer-count"></pzp-viewer-count>
              </pzp-pc-content-info>
            </pzp-pc-header>
            <pzp-ad-click-through-button class="pzp-pc__ad-click-through-button"></pzp-ad-click-through-button>
          </pzp-pc-layout>
        ),
        []
      )}
      {idx > -1 && subtitles?.[idx]?.text && (
        <div className={stylesVideo.videoSubtitle}>{subtitles?.[idx]?.text}</div>
      )}
    </div>
  )
}

export default React.memo(VideoPlayer)
