import create from 'zustand';

export interface ISubtitle {
  text: string;
  times: number[];
}

interface IVideoState {
  subtitles: ISubtitle[];
  setVideoState: (value?: any) => void;
}

const useVideoStore = create<IVideoState>((set) => ({
  subtitles: [
    // {
    //   text: 'hehehe 1',
    //   times: [1.7166666666666666, 2.95],
    // },
    // {
    //   text: ' sao the nho',
    //   times: [3.5166666666666666, 4.95],
    // },
    // {
    //   text: 'kakak',
    //   times: [5.316666666666666, 7.083333333333333],
    // },
  ],
  setVideoState: (value) => {
 
    set((state) => ({ ...state, ...value }));
  },
}));
export default useVideoStore;
