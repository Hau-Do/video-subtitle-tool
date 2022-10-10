import React, { useEffect, useMemo, useState } from 'react';
import { ISubtitle } from 'stores/video.store';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './index.css';

import PrismPlayer from '@webplayer/prismplayer-pc';

interface IVideoJS {
  options?: any;
  onReady: (player: any) => void;
  subtitles?: ISubtitle[];
  [key: string]: any;
}

export const VideoJS: React.FC<IVideoJS> = (props) => {
  const videoRef = React.useRef<HTMLElement>(null);
  const playerRef = React.useRef<any>(null);
  const { options, onReady, children, subtitles, ...remainProps } = props;
  const [idx, setIdx] = useState(-1);
  const handleUpdateTime = (subtitles: any) => (e: any) => {
    const currentTime = e.target.currentTime;
    if (subtitles && subtitles.length > 0) {
      const idxFound = subtitles.findIndex((item: any) => {
        const [start, end] = item.times;
        return start <= currentTime && currentTime <= end;
      });
      setIdx(idxFound);
    }
  };
  useEffect(() => {
    if (playerRef.current) {
      onReady && onReady(playerRef.current);
    }
  }, [options, playerRef.current]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.removeEventListener(
        'timeupdate',
        handleUpdateTime(subtitles),
        true
      );
      playerRef.current.addEventListener(
        'timeupdate',
        handleUpdateTime(subtitles),
        true
      );
    }
  }, [subtitles, playerRef.current]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        playerRef.current.removeEventListener(
          'timeupdate',
          handleUpdateTime(subtitles),
          true
        );
        playerRef.current = null;
      }
    };
  }, [playerRef.current]);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = PrismPlayer.upgrade(videoRef.current);
      playerRef.current.src =
        'vod://27001:V125f19c7e6a0577ab92fc2262953fcca04ad38960d0c728ff255c2262953fcca04ad@A7D002E08A5793B083F3539917A6A68D3809?env=dev';
    }
  }, [videoRef.current]);

  return (
    <div className="videojs">
      {useMemo(
        () => (
          <pzp-pc-layout ref={videoRef} id="player">
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
        <div id="video-subtitle">{subtitles?.[idx]?.text}</div>
      )}
    </div>
  );
};

export default React.memo(VideoJS);
