import { ISubtitle } from 'interfaces/subtitle';
import create from 'zustand';
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
