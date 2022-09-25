import React, { useEffect, useMemo, useRef } from 'react';
import './index.css';
import 'video.js/dist/video-js.css';
import useActions from './useActions';
import VideoJS from 'components/atoms/videoJS';
import useVideoStore from 'stores/video.store';
import SubtitleAPI from 'services/subtitle.service';
import { SubtitlesDTO } from 'models/subtitle.model';
let time = 1000 * 45; // 2 minutes;
function HomePage() {
  const { subtitles, setVideoState } = useVideoStore((state) => state);
  useEffect(() => {
    (async () => {
      try {
        const response: any[] = await SubtitleAPI.getAll();
        if (response) {
          const subtitles = SubtitlesDTO(response || []);
          setVideoState({
            subtitles,
          });
        }
      } catch (error) {}
    })();
  }, []);
  console.log('subtitles', subtitles);
  const {
    playerRef,
    handlePlayerReady,
    can,
    isPlaying,
    handleClickPlay,
    handleClickSubtitle,
    handleClickSave,
    results,
  } = useActions({ time, defaultSubtitles: subtitles });

  return (
    <div>
      <VideoJS
        subtitles={subtitles}
        id="my-player"
        options={{}}
        onReady={handlePlayerReady}
      >
        <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
        <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
        <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that
        </p>
      </VideoJS>
      <div className="wrap">
        <div>
          <canvas ref={can} id="mycanvas"></canvas>
        </div>
      </div>

      <button id="btn-play" onClick={handleClickPlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button id="btn-subtitle" onClick={handleClickSubtitle}>
        Subtitle
      </button>
      <button id="btn-save" onClick={handleClickSave}>
        Save
      </button>
    </div>
  );
}

<ul>
  <li key={0}>first</li>
  <li key={1}>second</li>
</ul>;

export default HomePage;
