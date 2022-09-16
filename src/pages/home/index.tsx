import React, { useMemo, useRef } from 'react';
import './index.css';
import 'video.js/dist/video-js.css';
import useActions from './useActions';
import VideoJS from '../../components/atoms/videoJS';
let time = 1000 * 45; // 2 minutes;
function HomePage() {
  const {
    playerRef,
    handlePlayerReady,
    can,
    isPlaying,
    handleClickPlay,
    handleClickSubtitle,
    handleClickSave,
    results,
  } = useActions({ time });
  console.log('results', results);
  return (
    <div>
      <VideoJS id="my-player" options={{}} onReady={handlePlayerReady}>
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

export default HomePage;
