import React, { useRef, useState } from 'react';
import useVideoStore from 'stores/video.store';

function useActions() {
  const { subtitles, setVideoState } = useVideoStore();
  const [activeIndex, setActiveIndex] = useState(-1);
  const playerRef = useRef<any>(null);

  const handleChangeSubtitle = (idx: number) => (text: string) => {
    const updatedSubtitles = [...subtitles];
    const subtitle = updatedSubtitles[idx];
    subtitle.text = text;
    setVideoState({
      subtitles: updatedSubtitles,
    });
  };
  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
  };
  return { subtitles, activeIndex, handleChangeSubtitle, handlePlayerReady };
}

export default useActions;
