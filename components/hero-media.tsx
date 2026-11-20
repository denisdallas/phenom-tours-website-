"use client"

import { useEffect, useRef, useState } from "react"

function selectSource(customVideo?: string) {
  if (customVideo) return customVideo
  return matchMedia("(max-width: 700px)").matches
    ? "/media/safari-mobile.mp4"
    : "/media/safari-desktop.mp4"
}

export function HeroMedia({ customVideo, customPoster }: { customVideo?: string; customPoster?: string }) {
  const video = useRef<HTMLVideoElement>(null)
  const [source, setSource] = useState<string>()
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotion = () => {
      if (motion.matches) {
        video.current?.pause()
        setSource(undefined)
        setShowVideo(false)
      } else {
        setSource(selectSource(customVideo))
      }
    }
    updateMotion()
    motion.addEventListener("change", updateMotion)
    return () => motion.removeEventListener("change", updateMotion)
  }, [customVideo])

  useEffect(() => {
    if (source) void video.current?.play().catch(() => setShowVideo(false))
  }, [source])

  return <>
    <picture>
      {!customPoster && <source media="(max-width: 700px)" srcSet="/media/safari-poster-mobile.webp" />}
      <img className="hero-media" src={customPoster || "/media/safari-poster.webp"} alt="" fetchPriority="high" width={1080} height={1080} />
    </picture>
    {source && <video ref={video} className={`hero-media hero-video${showVideo ? " is-visible" : ""}`}
      src={source} muted loop playsInline preload="none" aria-hidden="true"
      onPlaying={() => setShowVideo(true)}
      onError={() => setShowVideo(false)} />}
  </>
}
