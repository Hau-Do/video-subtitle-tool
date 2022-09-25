class Subtitle {
  times: number[];
  text: string;
  constructor(data: any) {
    this.times = data.times || [];
    this.text = data.text || '';
  }
}

export const SubtitlesDTO = (arr: any[]) => {
  return arr.map((item) => new Subtitle(item));
};

export default Subtitle;
