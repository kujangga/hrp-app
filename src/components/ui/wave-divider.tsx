'use client'

interface WaveDividerProps {
  position?: 'top' | 'bottom'
  color?: string
  flip?: boolean
  className?: string
  opacity?: number
}

export function WaveDivider({
  position = 'bottom',
  color = '#ffffff',
  flip = false,
  className = '',
  opacity = 1,
}: WaveDividerProps) {
  const positionClass = position === 'top' ? 'top-0' : 'bottom-0'
  const transformClass = flip ? 'rotate-180' : ''

  return (
    <div className={`pointer-events-none absolute left-0 w-full ${positionClass} ${className}`}>
      <svg
        className={`w-full ${transformClass}`}
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ height: 'auto', minHeight: '60px' }}
      >
        <path
          d="M0,64 C240,100 480,100 720,80 C960,60 1200,20 1440,40 L1440,120 L0,120 Z"
          fill={color}
          fillOpacity={opacity}
        />
      </svg>
    </div>
  )
}

// Preset variations for common use cases
export function WaveDividerSubtle(props: Omit<WaveDividerProps, 'opacity'>) {
  return <WaveDivider {...props} opacity={0.3} />
}

export function WaveDividerMedium(props: Omit<WaveDividerProps, 'opacity'>) {
  return <WaveDivider {...props} opacity={0.6} />
}

export function WaveDividerStrong(props: WaveDividerProps) {
  return <WaveDivider {...props} opacity={1} />
}
