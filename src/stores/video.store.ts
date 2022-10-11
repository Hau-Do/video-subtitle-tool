import create from 'zustand';

export interface ISubtitle {
  text: string;
  times: number[];
}

interface IVideoState {
  subtitles: ISubtitle[];
  setVideoState: <T>(value?: T) => void;
}

const useVideoStore = create<IVideoState>((set) => ({
  subtitles: [],
  setVideoState: (value) => {
    set((state) => ({ ...state, ...value }));
  },
}));
export default useVideoStore;
