import { IData } from "interfaces/data";
import { ISubtitle } from "interfaces/subtitle";

const Subtitle = (item: IData): ISubtitle => {
  return {
    id: item?.id,
    times: item?.times || [],
    text: item?.text || '',
  };
}

const Subtitles = (items: IData[]): ISubtitle[] => {
  return items.map((item) => Subtitle(item));
};

export {
  Subtitles
};
