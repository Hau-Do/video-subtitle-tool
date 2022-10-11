export interface ISubtitle {
  times: number[];
  text: string;
}

interface IData {
  [name: string]: any;
}

function Subtitle(data: IData): ISubtitle {
  return {
    times: data?.times || [],
    text: data?.text || '',
  };
}

export const SubtitlesDTO = (arr: IData[]) => {
  return arr.map((item) => Subtitle(item));
};

export default Subtitle;
