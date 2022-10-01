import { IAPIEndpoint, IConfig } from './api.d';

const REACT_APP_API_URL =
  process.env.REACT_APP_RESTFUL_ENDPOINT ||
  // mock api postman
  'https://ac15ee5c-49e0-46e5-ba23-8b5a01b63761.mock.pstmn.io';
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
