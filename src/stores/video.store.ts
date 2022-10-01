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
  subtitles: [],
  setVideoState: (value) => {
    set((state) => ({ ...state, ...value }));
  },
}));
export default useVideoStore;
