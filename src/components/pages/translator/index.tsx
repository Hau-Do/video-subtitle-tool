import VideoPlayer from 'components/atoms/videoPlayer';
import Subtitle from 'components/molecules/subtitle';
import useActions from './hooks/useActions';
import translatorStyles from './translator.module.scss';
function TranslatorPage() {
  const { subtitles, handleChangeSubtitle, handlePlayerReady } = useActions();
  const renderSubtitles = () =>
    subtitles.map((item, idx) => {
      return (
        <Subtitle
          key={idx}
          handleSave={handleChangeSubtitle(idx)}
          subtitle={item}
        />
      );
    });
  return (
    <div className={translatorStyles.translator}>
      <div className={translatorStyles.translator_container}>
        <div className={translatorStyles.translator_video}>
          <VideoPlayer
            subtitles={subtitles}
            options={{}}
            onReady={handlePlayerReady}
            src="http://weverse.video.p.rmcnmv.naver.net/c/read/v2/VOD_ALPHA/weverse_2022_10_07_0/925baf22-460b-11ed-ab33-a0369ffdae2c.mp4?_lsu_sa_=62b579f6f1b96c16a4dc750e6b0506b4fe4336981005dfbe35174ac6470e321593215a966c258b07c05b35f2d7313bedc241d449ed151ae3a86ecbda8d29d7370f48b6355c95358e2226ea2205e4123e"
            type="data"
          />
        </div>
        <div className={translatorStyles.translator_subtitles}>
          {renderSubtitles()}
        </div>
      </div>
    </div>
  );
}

export default TranslatorPage;
