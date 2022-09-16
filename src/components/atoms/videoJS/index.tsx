import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface IVideoJS {
  options: any;
  onReady: (player: any) => void;
  children: React.ReactNode;
  [key: string]: any;
}

export const VideoJS: React.FC<IVideoJS> = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef<any>(null);
  const { options, onReady, children, ...remainProps } = props;

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef]);

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
    <video
      {...remainProps}
      controls
      preload="auto"
      ref={videoRef}
      className="video-js vjs-big-play-centered"
    >
      {children}
    </video>
  );
};

export default React.memo(VideoJS);
