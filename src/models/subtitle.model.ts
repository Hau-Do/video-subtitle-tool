export interface ISubtitle {
  times: number[];
  text: string;
}

function Subtitle(data: any): ISubtitle {
  return {
    times: data?.times || [],
    text: data?.text || '',
  };
}

export const SubtitlesDTO = (arr: any[]) => {
  return arr.map((item) => Subtitle(item));
};

export default Subtitle;
