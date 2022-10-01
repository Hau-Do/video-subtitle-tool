import API from 'api';
import config from 'api/config';
import Subtitle, { SubtitlesDTO } from 'models/subtitle.model';

const getAll: () => Promise<Subtitle[]> = async () => {
  const response = await API({
    url: config.API.SUBTITLE_SERVICE,
  });
  const subtitles = SubtitlesDTO(response);
  return subtitles;
};

const SubtitleAPI = {
  getAll,
};

export default SubtitleAPI;
