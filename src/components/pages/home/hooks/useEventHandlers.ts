import { ISubtitle } from 'interfaces/subtitle'
import React, { ChangeEvent, useRef } from 'react'
import useVideoStore from 'stores/video.store'
import { convertTime } from 'utils/commons'
import useLifecycleOperations from './useLifecycleOperations'

interface IUseEventHandlers {
  defaultSubtitles?: ISubtitle[]
  isPlaying: boolean

  setIsPlaying: (isPlaying: boolean) => void
  setResults: (results: ISubtitle[]) => void
}
interface IElement {
  x: number
  y: number
  width: number
  height: number
  ellipse: Path2D
  isDragging: boolean
  subtitles: number[]
}
interface IRect {
  x: number
  y: number
  width: number
  height: number
}
function useEventHandlers({
  defaultSubtitles = [],
  setResults,
  setIsPlaying,
  isPlaying
}: IUseEventHandlers) {
  const setVideoState = useVideoStore((state) => state.setVideoState)

  const lastX = useRef<number>(0)
  const lastIdx = useRef<number>(defaultSubtitles.length || 0)
  const activeIdx = useRef<number>(-1)
  const elementList = useRef<IElement[]>([])
  const can = useRef<HTMLCanvasElement>(null)
  const centerX = window.innerWidth / 2
  const closeEnough = 10
  const w = window.innerWidth
  const h = 200
  const dx = 1
  let dragOK: boolean, startX: number, dragL: boolean, dragR: boolean
  const BB = can.current?.getBoundingClientRect()
  const offsetX = BB?.left || 0

  const subtitles = useRef<number[][]>(
    defaultSubtitles.map((item) => {
      const [start, end] = item.times
      return [-(start * 60), -(end * 60)]
    }) || []
  )
  const playerRef = useRef<HTMLVideoElement | null>(null)

  const drawBG = (context: CanvasRenderingContext2D) => {
    context.save()

    context.fillStyle = 'white'
    context.clearRect(0, 0, w * 1000, h)
    context.fillStyle = 'black'

    context.fillRect(0, 30, w * 1000, 80)

    context.fillStyle = 'black'

    context.lineWidth = 1
    context.strokeStyle = 'gray'

    context.beginPath()

    drawSubtitles(context, subtitles.current)
    context.fillStyle = 'black'
    for (let i = 0; i <= ((playerRef.current?.duration || 100) * 1000 || 0) / 100; i += 10) {
      const dx = centerX + i * 6
      if (i % 50 === 0) {
        context.moveTo(dx, 50)
        context.lineTo(dx, 80)
        context.fillText(` ${convertTime(i / 10)}`, dx - 20, 20)
      } else {
        context.moveTo(dx, 50)
        context.lineTo(dx, 60)
      }
    }
    // draw center
    context.fillStyle = 'black'
    context.strokeStyle = 'gray'

    context.moveTo(centerX - lastX.current, 0)
    context.lineTo(centerX - lastX.current, 180)

    context.closePath()
    context.stroke()

    context.restore()
  }
  const mapSubtitle = () => {
    if (can.current) {
      const ctx = can.current.getContext('2d')

      subtitles.current =
        defaultSubtitles.map((item) => {
          const [start, end] = item.times
          return [-(start * 60), -(end * 60)]
        }) || []
      lastIdx.current = defaultSubtitles.length
      ctx && drawBG(ctx)
    }
  }
  const draw = (ctx: CanvasRenderingContext2D, isMove = true) => {
    // ctx.save()
    if (isMove) {
      ctx.translate(-dx, 0)
      lastX.current -= dx
    }

    drawBG(ctx)
    // ctx.restore()
  }
  const handleClickSave = () => {
    const results = subtitles.current.map(([start, end]: number[], idx) => {
      return {
        text: defaultSubtitles?.[idx]?.text || '',
        times: [-start / 60, -(end || lastX) / 60]
      }
    })
    setResults(results.sort((a, b) => a.times[0] - b.times[0]))
    setVideoState({
      subtitles: results
    })
  }

  const checkCloseEnough = (p1: number, p2: number) => {
    return Math.abs(p1 - p2) < closeEnough
  }

  const drawCircle = (x: number, y: number, radius: number, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#FF0000'
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()
  }
  const drawHandles = (rect: IRect, ctx: CanvasRenderingContext2D) => {
    drawCircle(rect.x + rect.width, rect.y + rect.height / 2, closeEnough, ctx)
    drawCircle(rect.x, rect.y + rect.height / 2, closeEnough, ctx)
  }
  const convertSubtitlesToElements: (
    subtitles: number[][],
    ctx: CanvasRenderingContext2D
  ) => IElement[] = (subtitles: number[][], ctx: CanvasRenderingContext2D) => {
    const elements: IElement[] = []
    for (let i = 0; i < subtitles.length; i++) {
      const x = centerX - subtitles[i][0]
      const endTime = centerX - (subtitles[i][1] || lastX.current)
      const width = endTime - x
      const ellipse = new Path2D()
      const height = 40
      const y = 50
      ellipse.rect(x, y, width, height)
      const rect = {
        x,
        y,
        width,
        height
      }
      ctx.fillStyle = '#00FF00'
      if (i === activeIdx.current) {
        ctx.fillStyle = 'orange'
        drawHandles(rect, ctx)
      }
      ctx.fill(ellipse)
      elements.push({
        ...rect,
        ellipse,
        isDragging: false,
        subtitles: subtitles[i]
      })
      // ctx.fillRect(startTime, 50, endTime - startTime, 40);
    }
    return elements
  }
  const handleClickSubtitle = () => {
    const idx = lastIdx.current
    let subtitle = subtitles.current[idx] || []
    if (subtitle.length === 0) {
      subtitle = [lastX.current]
    } else {
      subtitle.push(lastX.current)
      lastIdx.current++
    }
    subtitles.current[idx] = subtitle
  }
  const handleClickPlay = () => {
    if (isPlaying) {
      playerRef.current?.pause()
    } else {
      playerRef.current?.play()
    }
  }

  const drawSubtitles = (ctx: CanvasRenderingContext2D, subtitles: number[][]) => {
    ctx.beginPath()
    elementList.current = convertSubtitlesToElements(subtitles, ctx)
    ctx.closePath()
    ctx.stroke()
  }

  const handlePlayerReady = (player: HTMLVideoElement) => {
    playerRef.current = player
    const ctx = can.current!.getContext('2d')

    // playerRef.current?.play();

    playerRef.current.addEventListener('playing', function () {
      setIsPlaying(true)
    })
    playerRef.current.addEventListener('pause', function () {
      setIsPlaying(false)
    })
    playerRef.current.addEventListener('waiting', function () {
      setIsPlaying(false)
    })

    playerRef.current.addEventListener('seeked', (e: Event) => {
      const timeX = ((e.target as HTMLMediaElement)?.currentTime || 0) * 60
      ctx!.translate(-lastX.current, 0)
      ctx!.translate(-timeX, 0)
      lastX.current = -timeX
      drawBG(ctx!)
    })
  }
  const myDown = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const ctx = can.current!.getContext('2d')

    // get the current mouse position
    const mx = parseInt((e.clientX - offsetX).toString())
    // test each rect to see if mouse is inside
    dragOK = false
    for (let i = 0; i < elementList.current.length; i++) {
      const r = elementList.current[i]
      if (r.ellipse && ctx!.isPointInPath(r.ellipse, e.offsetX, e.offsetY)) {
        // if yes, set that elementList isDragging=true
        activeIdx.current = i
        dragOK = true
      }
    }
    // save the current mouse position
    startX = mx
  }

  // handle mouseup events
  const myUp = (e: MouseEvent) => {
    // tell the browser we're handling this mouse event
    e.preventDefault()
    e.stopPropagation()

    // clear all the dragging flags
    dragOK = false
  }

  const myMove = (e: MouseEvent) => {
    const ctx = can.current!.getContext('2d')

    if (dragOK) {
      e.preventDefault()
      e.stopPropagation()
      // get the current mouse position
      const mx = parseInt((e.clientX - offsetX).toString())
      // calculate the distance the mouse has moved
      // since the last mousemove
      const dx = mx - (startX || 0)
      // move each rect that isDragging
      // by the distance the mouse has moved
      // since the last mousemove
      const [start, end] = subtitles.current[activeIdx.current]

      const updatedStart = start - dx

      const updatedEnd = end - dx

      subtitles.current[activeIdx.current] = [updatedStart, updatedEnd]

      // redraw the scene with the new rect positions
      ctx && drawBG(ctx)

      // reset the starting mouse position for the next mousemove
      startX = mx
    }
  }
  // resize rectangle

  const mouseDown = (e: MouseEvent) => {
    const rect = elementList.current[activeIdx.current]
    //   let mouseX = e.clientX - offsetX;
    const mouseX = e.clientX

    if (checkCloseEnough(mouseX - lastX.current, rect.x)) {
      dragL = true
    } else if (checkCloseEnough(mouseX - lastX.current, rect.x + rect.width)) {
      dragR = true
    }
  }

  const mouseUp = () => {
    dragL = dragR = false
  }

  const mouseMove = (e: MouseEvent) => {
    const ctx = can.current!.getContext('2d')

    if (activeIdx.current > -1) {
      const mx = e.pageX - offsetX
      const dx = mx - startX
      let [start, end] = subtitles.current[activeIdx.current]
      if (dragR) {
        end -= dx
      } else if (dragL) {
        start -= dx
        if (start > 0) start = 0
        if (start < end) start = end + 5
      }
      subtitles.current[activeIdx.current] = [start, end]
      drawBG(ctx!)
      startX = mx
    }
  }
  const init = () => {
    const ctx = can.current!.getContext('2d')

    ctx?.save()

    ctx?.fillRect(0, 0, w * 1000, h)

    ctx!.fillStyle = 'black'
    ctx!.lineWidth = 1
    ctx!.strokeStyle = 'gray'
    ctx?.beginPath()
    ctx?.moveTo(20, 0)
    ctx?.lineTo(20, 180)
    ctx?.stroke()
    elementList.current = convertSubtitlesToElements(subtitles.current, ctx!)
    ctx && draw(ctx, false)
    ctx?.restore()

    can.current?.addEventListener('mousedown', myDown)
    can.current?.addEventListener('mousedown', mouseDown)
    can.current?.addEventListener('mouseup', myUp)
    can.current?.addEventListener('mouseup', mouseUp)
    can.current?.addEventListener('mousemove', myMove)
    can.current?.addEventListener('mousemove', mouseMove)
  }

  return {
    mapSubtitle,
    handlePlayerReady,
    handleClickPlay,
    handleClickSubtitle,
    can,
    playerRef,
    init,
    handleClickSave,
    draw
  }
}

export default useEventHandlers
