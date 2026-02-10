"use client"

import { useEffect, useRef } from "react"
import { clx } from "@medusajs/ui"

interface Ball {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  size: number
  opacity: number
  element: HTMLDivElement | null
}

const FloatingTennisBallsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const ballsRef = useRef<Ball[]>([])
  const animationFrameRef = useRef<number>()
  const resizeTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.innerWidth < 768
    const ballCount = isMobile ? 9 : 17

    // Initialize balls
    const initBalls = () => {
      // Clean up existing balls
      ballsRef.current.forEach((ball) => {
        if (ball.element && ball.element.parentNode === container) {
          container.removeChild(ball.element)
        }
      })

      const balls: Ball[] = []
      const containerWidth = container.offsetWidth
      const containerHeight = container.offsetHeight

      for (let i = 0; i < ballCount; i++) {
        const size = 30 + Math.random() * 20 // 30-50px
        const ball: Ball = {
          id: i,
          x: Math.random() * (containerWidth - size),
          y: Math.random() * (containerHeight - size),
          vx: (Math.random() - 0.5) * 2, // velocity range similar to pills
          vy: (Math.random() - 0.5) * 2,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
          size,
          opacity: 0.6 + Math.random() * 0.2, // 0.6-0.8
          element: null,
        }

        // Create DOM element for the ball
        const element = document.createElement("div")
        element.className = "absolute tennis-ball"
        element.style.width = `${size}px`
        element.style.height = `${size}px`
        element.style.left = `${ball.x}px`
        element.style.top = `${ball.y}px`
        element.style.opacity = `${ball.opacity}`
        element.style.transform = `rotate(${ball.rotation}deg)`
        element.style.transition = "none"

        // Tennis ball visual design
        element.innerHTML = `
          <div style="
            width: 100%;
            height: 100%;
            background: #DFFF00;
            border-radius: 50%;
            position: relative;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), inset -2px -2px 4px rgba(0, 0, 0, 0.1);
          ">
            <svg width="100%" height="100%" viewBox="0 0 100 100" style="position: absolute; top: 0; left: 0;">
              <path d="M 20 10 Q 50 30, 80 10" fill="none" stroke="white" stroke-width="2.5" opacity="0.9"/>
              <path d="M 20 90 Q 50 70, 80 90" fill="none" stroke="white" stroke-width="2.5" opacity="0.9"/>
            </svg>
          </div>
        `

        container.appendChild(element)
        ball.element = element
        balls.push(ball)
      }

      ballsRef.current = balls
    }

    initBalls()

    // Animation loop
    const animate = () => {
      const containerWidth = container.offsetWidth
      const containerHeight = container.offsetHeight

      ballsRef.current.forEach((ball) => {
        if (!ball.element) return

        // Update position
        ball.x += ball.vx
        ball.y += ball.vy
        ball.rotation += ball.rotationSpeed

        // Bounce off edges
        if (ball.x <= 0 || ball.x >= containerWidth - ball.size) {
          ball.vx *= -1
          ball.x = Math.max(0, Math.min(ball.x, containerWidth - ball.size))
        }
        if (ball.y <= 0 || ball.y >= containerHeight - ball.size) {
          ball.vy *= -1
          ball.y = Math.max(0, Math.min(ball.y, containerHeight - ball.size))
        }

        // Apply transforms
        ball.element.style.left = `${ball.x}px`
        ball.element.style.top = `${ball.y}px`
        ball.element.style.transform = `rotate(${ball.rotation}deg)`
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize with debouncing
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      resizeTimeoutRef.current = setTimeout(() => {
        initBalls()
      }, 300)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      window.removeEventListener("resize", handleResize)
      
      // Clean up DOM elements
      ballsRef.current.forEach((ball) => {
        if (ball.element && ball.element.parentNode === container) {
          container.removeChild(ball.element)
        }
      })
      ballsRef.current = []
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={clx(
        "absolute inset-0 overflow-hidden pointer-events-none"
      )}
      aria-hidden="true"
    />
  )
}

export default FloatingTennisBallsBackground
