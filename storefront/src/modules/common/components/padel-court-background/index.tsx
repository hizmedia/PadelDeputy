"use client"

import React, { useEffect, useRef, useState } from "react"

interface PadelCourtBackgroundProps {
  className?: string
}

const PadelCourtBackground: React.FC<PadelCourtBackgroundProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Canvas sizing
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Determine orientation based on window dimensions
    const isPortrait = () => window.innerHeight > window.innerWidth

    // Ball physics state
    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 4,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      gravity: 0.05,
      bounce: 0.95,
    }

    // Player bars state
    const player1 = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      targetY: canvas.height / 2,
    }

    const player2 = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      targetY: canvas.height / 2,
    }

    // Initialize player positions based on orientation
    const initializePlayers = () => {
      const portrait = isPortrait()

      if (portrait) {
        // Vertical layout (rotated 90 degrees)
        player1.width = canvas.width * 0.2
        player1.height = canvas.height * 0.04
        player1.x = canvas.width / 2 - player1.width / 2
        player1.y = canvas.height * 0.05

        player2.width = canvas.width * 0.2
        player2.height = canvas.height * 0.04
        player2.x = canvas.width / 2 - player2.width / 2
        player2.y = canvas.height * 0.91
      } else {
        // Horizontal layout (traditional)
        player1.width = canvas.width * 0.03
        player1.height = canvas.height * 0.2
        player1.x = canvas.width * 0.05
        player1.y = canvas.height / 2 - player1.height / 2

        player2.width = canvas.width * 0.03
        player2.height = canvas.height * 0.2
        player2.x = canvas.width * 0.92
        player2.y = canvas.height / 2 - player2.height / 2
      }

      player1.targetY = player1.y
      player2.targetY = player2.y
    }

    initializePlayers()

    // Drawing functions
    const drawCourt = () => {
      const portrait = isPortrait()

      ctx.strokeStyle = "rgba(0, 255, 0, 0.6)"
      ctx.lineWidth = 2
      ctx.shadowColor = "rgba(0, 255, 0, 0.5)"
      ctx.shadowBlur = 8

      // Court boundaries
      const padding = 20
      ctx.strokeRect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2)

      // Center net
      ctx.setLineDash([10, 10])
      if (portrait) {
        ctx.beginPath()
        ctx.moveTo(padding, canvas.height / 2)
        ctx.lineTo(canvas.width - padding, canvas.height / 2)
        ctx.stroke()
      } else {
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, padding)
        ctx.lineTo(canvas.width / 2, canvas.height - padding)
        ctx.stroke()
      }
      ctx.setLineDash([])

      ctx.shadowBlur = 0
    }

    const drawPlayers = () => {
      ctx.fillStyle = "rgba(0, 255, 0, 0.8)"
      ctx.shadowColor = "rgba(0, 255, 0, 0.6)"
      ctx.shadowBlur = 10

      // Player 1
      ctx.fillRect(player1.x, player1.y, player1.width, player1.height)

      // Player 2
      ctx.fillRect(player2.x, player2.y, player2.width, player2.height)

      ctx.shadowBlur = 0
    }

    const drawBall = () => {
      ctx.fillStyle = "rgba(0, 255, 0, 1)"
      ctx.shadowColor = "rgba(0, 255, 0, 0.8)"
      ctx.shadowBlur = 15

      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.shadowBlur = 0
    }

    // Physics and collision detection
    const updateBall = () => {
      const portrait = isPortrait()

      // Apply gravity
      if (portrait) {
        ball.vx += ball.gravity * (Math.random() > 0.5 ? 1 : -1) * 0.3
      } else {
        ball.vy += ball.gravity
      }

      // Update position
      ball.x += ball.vx
      ball.y += ball.vy

      // Boundary collisions
      const padding = 20

      if (ball.x - ball.radius < padding || ball.x + ball.radius > canvas.width - padding) {
        ball.vx *= -ball.bounce
        ball.x = ball.x - ball.radius < padding ? padding + ball.radius : canvas.width - padding - ball.radius
      }

      if (ball.y - ball.radius < padding || ball.y + ball.radius > canvas.height - padding) {
        ball.vy *= -ball.bounce
        ball.y = ball.y - ball.radius < padding ? padding + ball.radius : canvas.height - padding - ball.radius
      }

      // Player collision detection
      if (portrait) {
        // Vertical layout - players at top and bottom
        if (
          ball.y - ball.radius <= player1.y + player1.height &&
          ball.x >= player1.x &&
          ball.x <= player1.x + player1.width
        ) {
          ball.vy = Math.abs(ball.vy) * ball.bounce
          ball.y = player1.y + player1.height + ball.radius
        }

        if (
          ball.y + ball.radius >= player2.y &&
          ball.x >= player2.x &&
          ball.x <= player2.x + player2.width
        ) {
          ball.vy = -Math.abs(ball.vy) * ball.bounce
          ball.y = player2.y - ball.radius
        }
      } else {
        // Horizontal layout - players at left and right
        if (
          ball.x - ball.radius <= player1.x + player1.width &&
          ball.y >= player1.y &&
          ball.y <= player1.y + player1.height
        ) {
          ball.vx = Math.abs(ball.vx) * ball.bounce
          ball.x = player1.x + player1.width + ball.radius
        }

        if (
          ball.x + ball.radius >= player2.x &&
          ball.y >= player2.y &&
          ball.y <= player2.y + player2.height
        ) {
          ball.vx = -Math.abs(ball.vx) * ball.bounce
          ball.x = player2.x - ball.radius
        }
      }
    }

    const updatePlayers = () => {
      const portrait = isPortrait()
      const smoothing = 0.1

      if (portrait) {
        // Vertical layout - track ball horizontally
        player1.targetY = player1.y
        player2.targetY = player2.y

        const targetX1 = ball.x - player1.width / 2
        const targetX2 = ball.x - player2.width / 2

        player1.x += (targetX1 - player1.x) * smoothing
        player2.x += (targetX2 - player2.x) * smoothing

        // Constrain to boundaries
        const padding = 20
        player1.x = Math.max(padding, Math.min(canvas.width - padding - player1.width, player1.x))
        player2.x = Math.max(padding, Math.min(canvas.width - padding - player2.width, player2.x))
      } else {
        // Horizontal layout - track ball vertically
        player1.targetY = ball.y - player1.height / 2
        player2.targetY = ball.y - player2.height / 2

        player1.y += (player1.targetY - player1.y) * smoothing
        player2.y += (player2.targetY - player2.y) * smoothing

        // Constrain to boundaries
        const padding = 20
        player1.y = Math.max(padding, Math.min(canvas.height - padding - player1.height, player1.y))
        player2.y = Math.max(padding, Math.min(canvas.height - padding - player2.height, player2.y))
      }
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(17, 24, 39, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawCourt()
      drawPlayers()
      drawBall()
      updateBall()
      updatePlayers()

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [prefersReducedMotion])

  // Render static court if reduced motion is preferred
  const renderStaticCourt = () => {
    return (
      <div className="absolute inset-0 bg-gray-900">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Court boundaries */}
          <rect
            x="20"
            y="20"
            width="calc(100% - 40px)"
            height="calc(100% - 40px)"
            fill="none"
            stroke="rgba(0, 255, 0, 0.6)"
            strokeWidth="2"
            filter="url(#glow)"
          />

          {/* Center net */}
          <line
            x1="50%"
            y1="20"
            x2="50%"
            y2="calc(100% - 20px)"
            stroke="rgba(0, 255, 0, 0.6)"
            strokeWidth="2"
            strokeDasharray="10,10"
            filter="url(#glow)"
            className="hidden landscape:block"
          />
          <line
            x1="20"
            y1="50%"
            x2="calc(100% - 20px)"
            y2="50%"
            stroke="rgba(0, 255, 0, 0.6)"
            strokeWidth="2"
            strokeDasharray="10,10"
            filter="url(#glow)"
            className="block landscape:hidden"
          />

          {/* Player bars */}
          <rect
            x="5%"
            y="40%"
            width="3%"
            height="20%"
            fill="rgba(0, 255, 0, 0.8)"
            filter="url(#glow)"
            className="hidden landscape:block"
          />
          <rect
            x="92%"
            y="40%"
            width="3%"
            height="20%"
            fill="rgba(0, 255, 0, 0.8)"
            filter="url(#glow)"
            className="hidden landscape:block"
          />
          <rect
            x="40%"
            y="5%"
            width="20%"
            height="4%"
            fill="rgba(0, 255, 0, 0.8)"
            filter="url(#glow)"
            className="block landscape:hidden"
          />
          <rect
            x="40%"
            y="91%"
            width="20%"
            height="4%"
            fill="rgba(0, 255, 0, 0.8)"
            filter="url(#glow)"
            className="block landscape:hidden"
          />

          {/* Ball */}
          <circle
            cx="50%"
            cy="50%"
            r="4"
            fill="rgba(0, 255, 0, 1)"
            filter="url(#glow)"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {prefersReducedMotion ? (
        renderStaticCourt()
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full bg-gray-900"
          style={{ opacity: 0.8 }}
        />
      )}
    </div>
  )
}

export default PadelCourtBackground
