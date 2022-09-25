import { IAPIEndpoint, IConfig } from './api.d';

const REACT_APP_API_URL =
  process.env.REACT_APP_RESTFUL_ENDPOINT || 'http://localhost:3003';
const config: IConfig = {
  API: {
    SUBTITLE_SERVICE: '/subtitles',
  },
};

Object.keys(config.API).forEach((item: string) => {
  config.API[item as keyof IAPIEndpoint] =
    REACT_APP_API_URL + config.API[item as keyof IAPIEndpoint];
});

export default config;
