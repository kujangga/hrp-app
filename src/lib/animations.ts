import { useEffect, useRef } from 'react'
import { animate, createTimeline, stagger, createSpring } from 'animejs'

/**
 * Anime.js Animation Presets
 * Reusable animation configurations
 */

export const animePresets = {
  // Spring physics for natural motion
  spring: {
    ease: 'out-quad',
    duration: 800,
  },

  // Smooth easing curves
  easeOutQuart: {
    ease: 'out-quart',
    duration: 600,
  },

  easeOutBack: {
    ease: 'out-back',
    duration: 700,
  },

  // Elastic bounce
  elastic: {
    ease: 'out-elastic',
    duration: 1000,
  },

  // Smooth in-out
  inOut: {
    ease: 'in-out-quad',
    duration: 500,
  },
}

/**
 * Text Reveal Animations
 */

export const textAnimations = {
  /**
   * Split text by characters and animate each
   */
  characterReveal: (element: HTMLElement, delay: number = 0) => {
    const text = element.textContent || ''
    element.innerHTML = text
      .split('')
      .map((char) => `<span class="inline-block" style="opacity: 0">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('')

    return animate(element.querySelectorAll('span'), {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(30, { start: delay }),
      ease: 'out-quad',
      duration: 600,
    })
  },

  /**
   * Word-by-word reveal
   */
  wordReveal: (element: HTMLElement, delay: number = 0) => {
    const text = element.textContent || ''
    const words = text.split(' ')
    element.innerHTML = words
      .map((word) => `<span class="inline-block" style="opacity: 0">${word}</span>`)
      .join(' ')

    return animate(element.querySelectorAll('span'), {
      opacity: [0, 1],
      translateY: [30, 0],
      delay: stagger(100, { start: delay }),
      ease: 'out-quart',
      duration: 800,
    })
  },

  /**
   * Gradient text shimmer effect
   */
  shimmer: (element: HTMLElement) => {
    element.style.backgroundImage = 'linear-gradient(90deg, #162533 0%, #7D97B6 50%, #162533 100%)'
    element.style.backgroundSize = '200% 100%'
    element.style.backgroundClip = 'text'
    element.style.webkitBackgroundClip = 'text'
    element.style.webkitTextFillColor = 'transparent'

    return animate(element, {
      backgroundPosition: ['0% 50%', '200% 50%'],
      ease: 'linear',
      duration: 3000,
      loop: true,
    })
  },
}

/**
 * Number Counter Animation
 */
export const numberCounter = (
  element: HTMLElement,
  endValue: number,
  duration: number = 2000,
  decimals: number = 0
) => {
  const obj = { value: 0 }

  return animate(obj, {
    value: endValue,
    round: decimals === 0 ? 1 : undefined,
    ease: 'out-quart',
    duration: duration,
    update: () => {
      element.textContent = obj.value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    },
  })
}

/**
 * Custom React Hooks for Animations
 */

/**
 * Hook for text reveal animation on mount
 */
export const useTextReveal = (mode: 'character' | 'word' = 'word', delay: number = 0) => {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const animation =
      mode === 'character'
        ? textAnimations.characterReveal(ref.current, delay)
        : textAnimations.wordReveal(ref.current, delay)

    return () => animation.pause()
  }, [mode, delay])

  return ref
}

/**
 * Hook for number counting animation
 */
export const useNumberCounter = (endValue: number, duration: number = 2000, trigger: boolean = true) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current || !trigger) return

    const animation = numberCounter(ref.current, endValue, duration)

    return () => animation.pause()
  }, [endValue, duration, trigger])

  return ref
}

/**
 * Hook for magnetic hover effect
 */
export const useMagneticHover = (strength: number = 0.3) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      animate(element, {
        translateX: x * strength,
        translateY: y * strength,
        duration: 300,
        ease: 'out-quad',
      })
    }

    const handleMouseLeave = () => {
      animate(element, {
        translateX: 0,
        translateY: 0,
        duration: 500,
        ease: 'out-elastic',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return ref
}

/**
 * Hook for icon rotation on hover
 */
export const useIconRotate = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseEnter = () => {
      animate(element, {
        rotate: [0, 360],
        scale: [1, 1.2, 1],
        duration: 600,
        ease: 'out-quart',
      })
    }

    element.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return ref
}

/**
 * Timeline Sequences
 * Pre-configured animation timelines for complex sequences
 */

export const createStaggerTimeline = (
  targets: string,
  options: {
    translateY?: number[]
    opacity?: number[]
    scale?: number[]
    rotate?: number[]
    stagger?: number
    duration?: number
    easing?: string
  } = {}
) => {
  const {
    translateY = [30, 0],
    opacity = [0, 1],
    scale,
    rotate,
    stagger: staggerDelay = 100,
    duration = 800,
    easing = 'out-quart',
  } = options

  const params: any = {
    translateY,
    opacity,
    delay: stagger(staggerDelay),
    duration,
    easing,
  }

  if (scale) params.scale = scale
  if (rotate) params.rotate = rotate

  return animate(targets, params)
}

/**
 * 3D Tilt Effect on Mouse Move
 */
export const use3DTilt = (maxTilt: number = 10) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * maxTilt
      const rotateY = ((centerX - x) / centerX) * maxTilt

      animate(element, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 200,
        ease: 'out-quad',
      })
    }

    const handleMouseLeave = () => {
      animate(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 500,
        ease: 'out-quart',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [maxTilt])

  return ref
}

export default animePresets
