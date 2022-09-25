import { Method, CancelTokenSource } from 'axios';

export type ErrorObjectType = {
  property: string;
  invalidValue: string;
  message: string;
};

export interface DataProperty {
  url: string;
  params?: any | string | undefined;
  method?: Method;
  headers?: any;
  data?: any | string;
  cancelTokenSource?: CancelTokenSource;
  [key: string]: any;
}

export type APIFunction = (params: DataProperty) => any;

export interface IConfig {
  API: IAPIEndpoint;
}
export interface IAPIEndpoint {
  SUBTITLE_SERVICE: string;
}
