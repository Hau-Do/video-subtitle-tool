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
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const subtitles = await SubtitleAPI.getAll();
  //       if (subtitles) {
  //         setVideoState({
  //           subtitles,
  //         });
  //       }
  //     } catch (error) {}
  //   })();
  // }, []);

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
  } = useActions({ defaultSubtitles: subtitles });
  return (
    <div>
      <VideoJS
        subtitles={subtitles}
        id="my-player"
        onReady={handlePlayerReady}
        type="data"
        src={
          'http://weverse.video.p.rmcnmv.naver.net/c/read/v2/VOD_ALPHA/weverse_2022_10_07_0/925baf22-460b-11ed-ab33-a0369ffdae2c.mp4?_lsu_sa_=68c599f9a1026ec6efdb45e76985d6bf3e933b68b10edfd33c271bc777b632b513221a526465630f90d73d32e239abfbb5fa72abf165658c591f4ba5bf9e9871c1e23f959428c9cc7482631367522037'
          // vod video
          //'vod://27001:V125f19c7e6a0577ab92fc2262953fcca04ad38960d0c728ff255c2262953fcca04ad@563C02F842EC4770E5CB6AC265F0176E6ECC?env=dev'
        }
      ></VideoJS>
      <div className="wrap">
        <div>
          <canvas ref={can} id="mycanvas"></canvas>
        </div>
      </div>

      <div className="btns">
        <button id="btn-subtitle" onClick={handleClickSubtitle}>
          Subtitle
        </button>
        <button id="btn-save" onClick={handleClickSave}>
          Save
        </button>
      </div>
    </div>
  );
}

<ul>
  <li key={0}>first</li>
  <li key={1}>second</li>
</ul>;

export default HomePage;
