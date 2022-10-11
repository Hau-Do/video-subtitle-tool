import React, { useEffect, useMemo, useState } from 'react';
import { ISubtitle } from 'stores/video.store';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './index.css';

import PrismPlayer, { DataProvider } from '@webplayer/prismplayer-pc';

interface IVideoJS {
  options?: any;
  onReady: (player: HTMLVideoElement) => void;
  subtitles?: ISubtitle[];
  src: string;
  type: 'vod' | 'data' | 'live';
  [key: string]: any;
}

export const VideoJS: React.FC<IVideoJS> = (props) => {
  const videoRef = React.useRef<HTMLElement>(null);
  const playerRef = React.useRef<any>(null);
  const { options, onReady, children, subtitles, src, type, ...remainProps } =
    props;
  const [idx, setIdx] = useState(-1);
  const handleUpdateTime = (subtitles: ISubtitle[]) => (e: any) => {
    const currentTime = e.target.currentTime;
    if (subtitles && subtitles.length > 0) {
      const idxFound = subtitles.findIndex((item) => {
        const [start, end] = item.times;
        return start <= currentTime && currentTime <= end;
      });
      setIdx(idxFound);
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.removeEventListener(
        'timeupdate',
        handleUpdateTime(subtitles!),
        true
      );
      playerRef.current.addEventListener(
        'timeupdate',
        handleUpdateTime(subtitles!),
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
          handleUpdateTime(subtitles!),
          true
        );
        playerRef.current = null;
      }
    };
  }, [playerRef.current]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = PrismPlayer.upgrade(videoRef.current);
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
              id: 'optional-track-id', // optional
            },
          ],
        });
        playerRef.current.srcObject = dataProvider;
      }
      if (type === 'vod') {
        playerRef.current.src = src;
      }
    }
    onReady && onReady(playerRef.current);
  }, [videoRef.current, type]);

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
