import VideoJS from 'components/atoms/videoJS';
import Subtitle from 'components/molecules/subtitle';
import React, { useState } from 'react';
import useVideoStore from 'stores/video.store';
import useActions from './hooks/useActions';
import './index.css';
function TranslatorPage() {
  const { activeIndex, subtitles, handleChangeSubtitle, handlePlayerReady } =
    useActions();
  const renderSubtitles = () =>
    subtitles.map((item, idx) => {
      //   const handleChange = () => {
      //     set;
      //   };
      return (
        <Subtitle
          key={idx}
          handleSave={handleChangeSubtitle(idx)}
          subtitle={item}
        />
      );
    });
  return (
    <div className="translator">
      <div className="translator__container">
        <div className="translator__video">
          <VideoJS
            id="my-player"
            subtitles={subtitles}
            options={{}}
            onReady={handlePlayerReady}
            src="http://weverse.video.p.rmcnmv.naver.net/c/read/v2/VOD_ALPHA/weverse_2022_10_07_0/925baf22-460b-11ed-ab33-a0369ffdae2c.mp4?_lsu_sa_=68c599f9a1026ec6efdb45e76985d6bf3e933b68b10edfd33c271bc777b632b513221a526465630f90d73d32e239abfbb5fa72abf165658c591f4ba5bf9e9871c1e23f959428c9cc7482631367522037"
            type="data"
          >
            <source
              src="//vjs.zencdn.net/v/oceans.mp4"
              type="video/mp4"
            ></source>
            <source
              src="//vjs.zencdn.net/v/oceans.webm"
              type="video/webm"
            ></source>
            <source
              src="//vjs.zencdn.net/v/oceans.ogv"
              type="video/ogg"
            ></source>
            <p className="vjs-no-js">
              To view this video please enable JavaScript, and consider
              upgrading to a web browser that
            </p>
          </VideoJS>
        </div>
        <div className="translator__subtitles">{renderSubtitles()}</div>
      </div>
    </div>
  );
}

export default TranslatorPage;
