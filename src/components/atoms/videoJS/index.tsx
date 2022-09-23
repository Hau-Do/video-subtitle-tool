import React, { useEffect, useState } from 'react';
import { ISubtitle } from 'stores/video.store';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './index.css';
interface IVideoJS {
  options: any;
  onReady: (player: any) => void;
  children: React.ReactNode;
  subtitles?: ISubtitle[];
  [key: string]: any;
}

export const VideoJS: React.FC<IVideoJS> = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef<any>(null);
  const { options, onReady, children, subtitles, ...remainProps } = props;
  const [idx, setIdx] = useState(-1);
  const handleUpdateTime = (subtitles: any) => () => {
    const currentTime = playerRef.current.currentTime();
    if (subtitles && subtitles.length > 0) {
      const idxFound = subtitles.findIndex((item: any) => {
        const [start, end] = item.times;
        return start <= currentTime && currentTime <= end;
      });
      setIdx(idxFound);
    }
  };
  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      }));
    }
  }, [options, videoRef]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.off('timeupdate', handleUpdateTime(subtitles));
      playerRef.current.on('timeupdate', handleUpdateTime(subtitles));
    }
  }, [subtitles, playerRef.current]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className="videojs">
      <video
        {...remainProps}
        controls
        preload="auto"
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        data-setup='{"fluid": true}'
      >
        {children}
      </video>
      {idx > -1 && subtitles?.[idx]?.text && (
        <div id="video-subtitle">{subtitles?.[idx]?.text}</div>
      )}
    </div>
  );
};

export default React.memo(VideoJS);
