"use client"

import React, { useEffect, useState } from "react"

export function FloatingVideoGrid() {
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Responsive values
  const videoWidth = isMobile ? "40vw" : "220px"
  const videoHeight = isMobile ? "22.5vw" : "124px" // 16:9 aspect ratio

  // Define videos with responsive position (in vw for mobile, px for desktop)
  const videos = isMobile
    ? [
        // Row 1
        { src: "/videos/video1.mp4", bottom: "4vw", right: "4vw" },
        { src: "/videos/video0.mp4", bottom: "4vw", right: "48vw" },
        { src: "/videos/video0.mp4", bottom: "4vw", right: "92vw" },

        // Row 2
        { src: "/videos/video4.mp4", bottom: "30vw", right: "4vw" },
        { src: "/videos/video5.mp4", bottom: "30vw", right: "48vw" },

        // Row 3
        { src: "/videos/video6.mp4", bottom: "56vw", right: "4vw" },
      ]
    : [
        // Row 1
        { src: "/videos/video1.mp4", bottom: "20px", right: "20px" },
        { src: "/videos/video0.mp4", bottom: "20px", right: "260px" },
        { src: "/videos/video0.mp4", bottom: "20px", right: "500px" },

        // Row 2
        { src: "/videos/video4.mp4", bottom: "160px", right: "20px" },
        { src: "/videos/video5.mp4", bottom: "160px", right: "260px" },

        // Row 3
        { src: "/videos/video6.mp4", bottom: "300px", right: "20px" },
      ]

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: isMobile ? "150vw" : "600px",
        overflow: "hidden",
        marginTop: "2.5rem",
      }}
    >
      {/* Background Image */}
      <img
        src="/images/hongKong.jpeg"
        alt="City background"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Video Grid */}
      {videos.map((video, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: video.bottom,
            right: video.right,
            width: videoWidth,
            height: videoHeight,
            border: "2px solid white",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
            zIndex: 10,
          }}
        >
          <video
            src={video.src}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ))}
    </div>
  )
}
