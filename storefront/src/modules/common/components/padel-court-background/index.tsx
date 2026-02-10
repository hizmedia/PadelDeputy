"use client"

import React, { useEffect, useRef, useState } from "react"

interface PadelCourtBackgroundProps {
  className?: string
}

// Physics constants
const BALL_PHYSICS = {
  INITIAL_VELOCITY_RANGE: 5,
  GRAVITY: 0.08,
  BOUNCE_DAMPENING: 0.85,
  RADIUS: 6,
  HORIZONTAL_GRAVITY_FACTOR: 0.3,
} as const

const PLAYER_CONFIG = {
  HORIZONTAL_WIDTH_RATIO: 0.02,
  HORIZONTAL_HEIGHT_RATIO: 0.15,
  VERTICAL_WIDTH_RATIO: 0.15,
  VERTICAL_HEIGHT_RATIO: 0.03,
  HORIZONTAL_LEFT_X: 0.08,
  HORIZONTAL_RIGHT_X: 0.90,
  VERTICAL_TOP_Y: 0.08,
  VERTICAL_BOTTOM_Y: 0.89,
  TRACKING_SMOOTHING: 0.15,
  PREDICTION_FACTOR: 3,
} as const

const COURT_CONFIG = {
  PADDING: 20,
  LINE_WIDTH: 2,
  LINE_COLOR: "#00AFB5",
  SHADOW_BLUR: 8,
  SHADOW_COLOR: "rgba(0, 175, 181, 0.5)",
  BG_COLOR: "#004777",
} as const

const COLORS = {
  PLAYER: "#00AFB5",
  PLAYER_SHADOW: "rgba(0, 175, 181, 0.6)",
  BALL_PRIMARY: "#D4FF00",
  BALL_SECONDARY: "#FFEB3B",
  BALL_LINES: "#9E9E9E",
} as const

const PadelCourtBackground: React.FC<PadelCourtBackgroundProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const resizeTimeoutRef = useRef<number>()
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

    // Canvas sizing with debounce
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    const debouncedResize = () => {
      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current)
      }
      resizeTimeoutRef.current = window.setTimeout(resizeCanvas, 100)
    }

    resizeCanvas()
    window.addEventListener("resize", debouncedResize)

    // Determine orientation based on window dimensions
    const isPortrait = () => window.innerHeight > window.innerWidth

    // Ball physics state
    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: BALL_PHYSICS.RADIUS,
      vx: (Math.random() - 0.5) * BALL_PHYSICS.INITIAL_VELOCITY_RANGE,
      vy: (Math.random() - 0.5) * BALL_PHYSICS.INITIAL_VELOCITY_RANGE,
      gravity: BALL_PHYSICS.GRAVITY,
      bounce: BALL_PHYSICS.BOUNCE_DAMPENING,
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
        player1.width = canvas.width * PLAYER_CONFIG.VERTICAL_WIDTH_RATIO
        player1.height = canvas.height * PLAYER_CONFIG.VERTICAL_HEIGHT_RATIO
        player1.x = canvas.width / 2 - player1.width / 2
        player1.y = canvas.height * PLAYER_CONFIG.VERTICAL_TOP_Y

        player2.width = canvas.width * PLAYER_CONFIG.VERTICAL_WIDTH_RATIO
        player2.height = canvas.height * PLAYER_CONFIG.VERTICAL_HEIGHT_RATIO
        player2.x = canvas.width / 2 - player2.width / 2
        player2.y = canvas.height * PLAYER_CONFIG.VERTICAL_BOTTOM_Y
      } else {
        // Horizontal layout (traditional)
        player1.width = canvas.width * PLAYER_CONFIG.HORIZONTAL_WIDTH_RATIO
        player1.height = canvas.height * PLAYER_CONFIG.HORIZONTAL_HEIGHT_RATIO
        player1.x = canvas.width * PLAYER_CONFIG.HORIZONTAL_LEFT_X
        player1.y = canvas.height / 2 - player1.height / 2

        player2.width = canvas.width * PLAYER_CONFIG.HORIZONTAL_WIDTH_RATIO
        player2.height = canvas.height * PLAYER_CONFIG.HORIZONTAL_HEIGHT_RATIO
        player2.x = canvas.width * PLAYER_CONFIG.HORIZONTAL_RIGHT_X
        player2.y = canvas.height / 2 - player2.height / 2
      }

      player1.targetY = player1.y
      player2.targetY = player2.y
    }

    initializePlayers()

    // Drawing functions
    const drawCourt = () => {
      const portrait = isPortrait()
      const padding = COURT_CONFIG.PADDING

      ctx.strokeStyle = COURT_CONFIG.LINE_COLOR
      ctx.lineWidth = COURT_CONFIG.LINE_WIDTH
      ctx.shadowColor = COURT_CONFIG.SHADOW_COLOR
      ctx.shadowBlur = COURT_CONFIG.SHADOW_BLUR

      // Court boundaries (outer walls)
      ctx.strokeRect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2)

      // Center net (solid line for padel)
      ctx.setLineDash([])
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

      // Service boxes (padel court specific)
      ctx.lineWidth = 1.5
      if (portrait) {
        // Horizontal service lines
        const serviceLineY1 = canvas.height * 0.30
        const serviceLineY2 = canvas.height * 0.70
        
        ctx.beginPath()
        ctx.moveTo(padding, serviceLineY1)
        ctx.lineTo(canvas.width - padding, serviceLineY1)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.moveTo(padding, serviceLineY2)
        ctx.lineTo(canvas.width - padding, serviceLineY2)
        ctx.stroke()

        // Center service line (splits the service boxes)
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, serviceLineY1)
        ctx.lineTo(canvas.width / 2, canvas.height / 2)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height / 2)
        ctx.lineTo(canvas.width / 2, serviceLineY2)
        ctx.stroke()
      } else {
        // Vertical service lines
        const serviceLineX1 = canvas.width * 0.30
        const serviceLineX2 = canvas.width * 0.70
        
        ctx.beginPath()
        ctx.moveTo(serviceLineX1, padding)
        ctx.lineTo(serviceLineX1, canvas.height - padding)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.moveTo(serviceLineX2, padding)
        ctx.lineTo(serviceLineX2, canvas.height - padding)
        ctx.stroke()

        // Center service line (splits the service boxes)
        ctx.beginPath()
        ctx.moveTo(serviceLineX1, canvas.height / 2)
        ctx.lineTo(canvas.width / 2, canvas.height / 2)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height / 2)
        ctx.lineTo(serviceLineX2, canvas.height / 2)
        ctx.stroke()
      }

      ctx.shadowBlur = 0
    }

    const drawPlayers = () => {
      ctx.fillStyle = COLORS.PLAYER
      ctx.shadowColor = COLORS.PLAYER_SHADOW
      ctx.shadowBlur = 10

      // Player 1 (with rounded corners)
      ctx.beginPath()
      const radius1 = Math.min(player1.width, player1.height) / 4
      ctx.roundRect(player1.x, player1.y, player1.width, player1.height, radius1)
      ctx.fill()

      // Player 2 (with rounded corners)
      ctx.beginPath()
      const radius2 = Math.min(player2.width, player2.height) / 4
      ctx.roundRect(player2.x, player2.y, player2.width, player2.height, radius2)
      ctx.fill()

      ctx.shadowBlur = 0
    }

    const drawBall = () => {
      // Draw tennis ball (yellow with curved lines)
      const x = ball.x
      const y = ball.y
      const r = ball.radius

      // Yellow gradient for ball
      const gradient = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r)
      gradient.addColorStop(0, COLORS.BALL_SECONDARY)
      gradient.addColorStop(0.7, COLORS.BALL_PRIMARY)
      gradient.addColorStop(1, "#B8C000")

      ctx.fillStyle = gradient
      ctx.shadowColor = "rgba(212, 255, 0, 0.6)"
      ctx.shadowBlur = 12

      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()

      ctx.shadowBlur = 0

      // Draw characteristic tennis ball curved lines
      ctx.strokeStyle = COLORS.BALL_LINES
      ctx.lineWidth = 1.2
      ctx.lineCap = "round"

      // Left curved line
      ctx.beginPath()
      ctx.arc(x, y, r * 0.8, Math.PI * 0.6, Math.PI * 1.4)
      ctx.stroke()

      // Right curved line (mirrored)
      ctx.beginPath()
      ctx.arc(x, y, r * 0.8, -Math.PI * 0.4, Math.PI * 0.4)
      ctx.stroke()

      ctx.lineCap = "butt"
    }

    // Physics and collision detection
    const updateBall = () => {
      const portrait = isPortrait()

      // Apply gravity
      // In portrait mode, add subtle horizontal gravity variation for visual interest
      if (portrait) {
        ball.vx += ball.gravity * (Math.random() > 0.5 ? 1 : -1) * BALL_PHYSICS.HORIZONTAL_GRAVITY_FACTOR
      } else {
        ball.vy += ball.gravity
      }

      // Update position
      ball.x += ball.vx
      ball.y += ball.vy

      // Boundary collisions
      const padding = COURT_CONFIG.PADDING

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
      const smoothing = PLAYER_CONFIG.TRACKING_SMOOTHING
      const predictionFactor = PLAYER_CONFIG.PREDICTION_FACTOR

      if (portrait) {
        // Vertical layout - track ball horizontally with prediction
        player1.targetY = player1.y
        player2.targetY = player2.y

        // Predict where ball will be based on velocity
        const predictedX1 = ball.x + ball.vx * predictionFactor
        const predictedX2 = ball.x + ball.vx * predictionFactor

        const targetX1 = predictedX1 - player1.width / 2
        const targetX2 = predictedX2 - player2.width / 2

        player1.x += (targetX1 - player1.x) * smoothing
        player2.x += (targetX2 - player2.x) * smoothing

        // Constrain to boundaries
        const padding = COURT_CONFIG.PADDING
        player1.x = Math.max(padding, Math.min(canvas.width - padding - player1.width, player1.x))
        player2.x = Math.max(padding, Math.min(canvas.width - padding - player2.width, player2.x))
      } else {
        // Horizontal layout - track ball vertically with prediction
        // Predict where ball will be based on velocity
        const predictedY1 = ball.y + ball.vy * predictionFactor
        const predictedY2 = ball.y + ball.vy * predictionFactor

        player1.targetY = predictedY1 - player1.height / 2
        player2.targetY = predictedY2 - player2.height / 2

        player1.y += (player1.targetY - player1.y) * smoothing
        player2.y += (player2.targetY - player2.y) * smoothing

        // Constrain to boundaries
        const padding = COURT_CONFIG.PADDING
        player1.y = Math.max(padding, Math.min(canvas.height - padding - player1.height, player1.y))
        player2.y = Math.max(padding, Math.min(canvas.height - padding - player2.height, player2.y))
      }
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = COURT_CONFIG.BG_COLOR
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
      window.removeEventListener("resize", debouncedResize)
      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [prefersReducedMotion])

  // Render static court if reduced motion is preferred
  const renderStaticCourt = () => {
    return (
      <div className="absolute inset-0" style={{ backgroundColor: COURT_CONFIG.BG_COLOR }}>
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
            stroke={COURT_CONFIG.LINE_COLOR}
            strokeWidth="2"
            filter="url(#glow)"
          />

          {/* Center net */}
          <line
            x1="50%"
            y1="20"
            x2="50%"
            y2="calc(100% - 20px)"
            stroke={COURT_CONFIG.LINE_COLOR}
            strokeWidth="2"
            filter="url(#glow)"
            className="hidden landscape:block"
          />
          <line
            x1="20"
            y1="50%"
            x2="calc(100% - 20px)"
            y2="50%"
            stroke={COURT_CONFIG.LINE_COLOR}
            strokeWidth="2"
            filter="url(#glow)"
            className="block landscape:hidden"
          />

          {/* Player bars */}
          <rect
            x="8%"
            y="42.5%"
            width="2%"
            height="15%"
            fill={COLORS.PLAYER}
            filter="url(#glow)"
            className="hidden landscape:block"
            rx="2"
          />
          <rect
            x="90%"
            y="42.5%"
            width="2%"
            height="15%"
            fill={COLORS.PLAYER}
            filter="url(#glow)"
            className="hidden landscape:block"
            rx="2"
          />
          <rect
            x="42.5%"
            y="8%"
            width="15%"
            height="3%"
            fill={COLORS.PLAYER}
            filter="url(#glow)"
            className="block landscape:hidden"
            rx="2"
          />
          <rect
            x="42.5%"
            y="89%"
            width="15%"
            height="3%"
            fill={COLORS.PLAYER}
            filter="url(#glow)"
            className="block landscape:hidden"
            rx="2"
          />

          {/* Ball - Tennis ball appearance */}
          <circle
            cx="50%"
            cy="50%"
            r="6"
            fill={COLORS.BALL_PRIMARY}
            filter="url(#glow)"
          />
          <circle
            cx="50%"
            cy="50%"
            r="4"
            fill="none"
            stroke={COLORS.BALL_LINES}
            strokeWidth="1"
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
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: COURT_CONFIG.BG_COLOR, opacity: 0.8 }}
        />
      )}
    </div>
  )
}

export default PadelCourtBackground
