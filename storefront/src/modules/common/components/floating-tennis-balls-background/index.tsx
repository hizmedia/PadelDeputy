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

// Constants
const MOBILE_BREAKPOINT = 768 // Matches Tailwind's 'md' breakpoint
const RESIZE_DEBOUNCE_MS = 300

const FloatingTennisBallsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const ballsRef = useRef<Ball[]>([])
  const animationFrameRef = useRef<number>()
  const resizeTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT
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

        // Tennis ball visual design - create elements using DOM APIs
        const ballInner = document.createElement("div")
        ballInner.style.width = "100%"
        ballInner.style.height = "100%"
        ballInner.style.background = "#DFFF00"
        ballInner.style.borderRadius = "50%"
        ballInner.style.position = "relative"
        ballInner.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2), inset -2px -2px 4px rgba(0, 0, 0, 0.1)"

        // Create SVG for seam lines
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute("width", "100%")
        svg.setAttribute("height", "100%")
        svg.setAttribute("viewBox", "0 0 100 100")
        svg.style.position = "absolute"
        svg.style.top = "0"
        svg.style.left = "0"

        // Top seam line
        const topPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
        topPath.setAttribute("d", "M 20 10 Q 50 30, 80 10")
        topPath.setAttribute("fill", "none")
        topPath.setAttribute("stroke", "white")
        topPath.setAttribute("stroke-width", "2.5")
        topPath.setAttribute("opacity", "0.9")

        // Bottom seam line
        const bottomPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
        bottomPath.setAttribute("d", "M 20 90 Q 50 70, 80 90")
        bottomPath.setAttribute("fill", "none")
        bottomPath.setAttribute("stroke", "white")
        bottomPath.setAttribute("stroke-width", "2.5")
        bottomPath.setAttribute("opacity", "0.9")

        svg.appendChild(topPath)
        svg.appendChild(bottomPath)
        ballInner.appendChild(svg)
        element.appendChild(ballInner)

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
      }, RESIZE_DEBOUNCE_MS)
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
