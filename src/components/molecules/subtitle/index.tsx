import { ISubtitle } from 'interfaces/subtitle';
import React, { ChangeEvent } from 'react';
import { convertTime } from 'utils/commons';
import useActions from './hooks/useActions';
import './index.css';
interface ISubtitleProps {
  subtitle: ISubtitle;
  handleSave: (text: string) => void;
}
const Subtitle: React.FC<ISubtitleProps> = ({ subtitle, handleSave }) => {
  const [start, end] = subtitle.times;
  const { handleChange, text } = useActions({ defaultText: subtitle.text });
  return (
    <div className="subtitle">
      <div className="subtitle__times">
        {convertTime(start)} - {convertTime(end)}
        <input value={text} onChange={handleChange} />
        <button onClick={() => handleSave(text)}>Save</button>
      </div>
    </div>
  );
};

export default Subtitle;
