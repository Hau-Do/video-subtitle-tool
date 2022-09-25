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
