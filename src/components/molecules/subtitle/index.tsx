import { ISubtitle } from 'interfaces/subtitle'
import React, { ChangeEvent } from 'react'
import { convertTime } from 'utils/commons'
import useEventHandlers from './hooks/useEventHandlers'
import subtitleStyles from './subtitle.module.scss'
interface ISubtitleProps {
  subtitle: ISubtitle
  handleSave: (text: string) => void
}
const Subtitle: React.FC<ISubtitleProps> = ({ subtitle, handleSave }) => {
  const [start, end] = subtitle.times
  const { handleChange, text = '' } = useEventHandlers({ defaultText: subtitle.text })
  return (
    <div className={subtitleStyles.subtitle}>
      <div className={subtitleStyles.subtitleTimes}>
        {convertTime(start)} - {convertTime(end)}
        <input value={text} onChange={handleChange} />
        <button onClick={() => handleSave(text)}>Save</button>
      </div>
    </div>
  )
}

export default Subtitle
