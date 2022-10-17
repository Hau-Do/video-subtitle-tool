import stylesHome from './home.module.scss'
import VideoPlayer from 'components/atoms/videoPlayer'
import useVideoStore from 'stores/video.store'
import { useEffect } from 'react'
import { Button } from 'antd'
import SubtitleService from 'services/subtitle.service'
import useLifecycleOperations from './hooks/useLifecycleOperations'

function HomePage() {
  const { subtitles, setVideoState } = useVideoStore((state) => state)

  useEffect(() => {
    ;(async () => {
      try {
        const subtitles = await SubtitleService.getSubtitles()
        if (subtitles) {
          setVideoState({
            subtitles
          })
        }
      } catch (error) {
        console.log('error', error)
      }
    })()
  }, [])

  const { handlePlayerReady, can, handleClickSubtitle, handleClickSave } = useLifecycleOperations({
    defaultSubtitles: subtitles
  })

  return (
    <div>
      <VideoPlayer
        subtitles={subtitles}
        id="my-player"
        onReady={handlePlayerReady}
        type="vod"
        src="vod://27001:V125f19c7e6a0577ab92fc2262953fcca04ad38960d0c728ff255c2262953fcca04ad@A7D002E08A5793B083F3539917A6A68D3809?env=dev"
      />
      <div className={stylesHome.wrap}>
        <div>
          <canvas ref={can} id="mycanvas"></canvas>
        </div>
      </div>

      <div className={stylesHome.btns_container}>
        <Button id="btn-subtitle" onClick={handleClickSubtitle}>
          Subtitle
        </Button>
        <Button id="btn-save" onClick={handleClickSave}>
          Save
        </Button>
      </div>
    </div>
  )
}

;<ul>
  <li key={0}>first</li>
  <li key={1}>second</li>
</ul>

export default HomePage
