import stylesHome from './home.module.scss';
import useActions from './hooks/useActions';
import VideoPlayer from 'components/atoms/videoPlayer';
import useVideoStore from 'stores/video.store';
function HomePage() {
  const { subtitles, setVideoState } = useVideoStore((state) => state);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const subtitles = await SubtitleService.getSubtitles();
  //       if (subtitles) {
  //         setVideoState({
  //           subtitles,
  //         });
  //       }
  //     } catch (error) {}
  //   })();
  // }, []);

  const { handlePlayerReady, can, handleClickSubtitle, handleClickSave } =
    useActions({ defaultSubtitles: subtitles });
  return (
    <div>
      <VideoPlayer
        subtitles={subtitles}
        id="my-player"
        onReady={handlePlayerReady}
        type="vod"
        src="vod://27001:V125f19c7e6a0577ab92fc2262953fcca04ad38960d0c728ff255c2262953fcca04ad@A7D002E08A5793B083F3539917A6A68D3809?env=dev"
        // src={
        //   // 'http://weverse.video.p.rmcnmv.naver.net/c/read/v2/VOD_ALPHA/weverse_2022_10_07_0/925baf22-460b-11ed-ab33-a0369ffdae2c.mp4?_lsu_sa_=62b579f6f1b96c16a4dc750e6b0506b4fe4336981005dfbe35174ac6470e321593215a966c258b07c05b35f2d7313bedc241d449ed151ae3a86ecbda8d29d7370f48b6355c95358e2226ea2205e4123e'
        // }
      />
      <div className={stylesHome.wrap}>
        <div>
          <canvas ref={can} id="mycanvas"></canvas>
        </div>
      </div>

      <div className={stylesHome.btns_container}>
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
