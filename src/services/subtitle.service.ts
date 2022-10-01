import API from 'api';
import config from 'api/config';
import { ISubtitle, SubtitlesDTO } from 'models/subtitle.model';

const getAll: () => Promise<ISubtitle[]> = async () => {
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
