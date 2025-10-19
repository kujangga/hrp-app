'use client'

import { useRef, useState, useCallback, MouseEvent as ReactMouseEvent } from 'react'
import { animate } from 'animejs'

interface MagnetProps {
  children: React.ReactNode
  magnitude?: number
  maxDistance?: number
  damping?: number
  stiffness?: number
  className?: string
}

export function Magnet({
  children,
  magnitude = 0.3,
  maxDistance = 150,
  damping = 15,
  stiffness = 100,
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance < maxDistance) {
        const factor = Math.min(distance / maxDistance, 1)
        const translateX = deltaX * magnitude * factor
        const translateY = deltaY * magnitude * factor

        animate(ref.current, {
          translateX: translateX,
          translateY: translateY,
          duration: 200,
          ease: 'out-quad',
        })
      }
    },
    [magnitude, maxDistance]
  )

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return

    setIsHovering(false)
    animate(ref.current, {
      translateX: 0,
      translateY: 0,
      duration: 400,
      ease: 'out-elastic',
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </div>
  )
}
