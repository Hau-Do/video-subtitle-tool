import httpClient from 'http-client';
import { ISubtitle } from 'interfaces/subtitle';
import { Subtitles } from 'models/subtitle.model';
import { ENDPOINT } from './endpoints';

const getSubtitles: () => Promise<ISubtitle[]> = async() => {
  const response = await httpClient.get(ENDPOINT.SUBTITLES);
  const subtitles = Subtitles(response.data);
  return subtitles;
};


const SubtitleService = {
  getSubtitles,
};
export default SubtitleService;
