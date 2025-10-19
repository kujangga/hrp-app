'use client'

import { COLORS } from '@/lib/colors'

interface AnimatedMeshGradientProps {
  className?: string
}

export function AnimatedMeshGradient({ className = '' }: AnimatedMeshGradientProps) {
  return (
    <>
      {/* CSS Animation for mesh gradient */}
      <style jsx>{`
        @keyframes meshGradient {
          0%,
          100% {
            background: radial-gradient(at 0% 0%, ${COLORS.POWDER_LIGHT}40 0px, transparent 50%),
              radial-gradient(at 100% 0%, ${COLORS.BLUE_LIGHT}30 0px, transparent 50%),
              radial-gradient(at 100% 100%, ${COLORS.SLATE_MEDIUM}20 0px, transparent 50%),
              radial-gradient(at 0% 100%, ${COLORS.TAUPE_NEUTRAL}25 0px, transparent 50%),
              radial-gradient(at 50% 50%, ${COLORS.NAVY_DARK}10 0px, transparent 50%);
          }
          25% {
            background: radial-gradient(at 100% 0%, ${COLORS.POWDER_LIGHT}40 0px, transparent 50%),
              radial-gradient(at 100% 100%, ${COLORS.BLUE_LIGHT}30 0px, transparent 50%),
              radial-gradient(at 0% 100%, ${COLORS.SLATE_MEDIUM}20 0px, transparent 50%),
              radial-gradient(at 0% 0%, ${COLORS.TAUPE_NEUTRAL}25 0px, transparent 50%),
              radial-gradient(at 50% 50%, ${COLORS.NAVY_DARK}10 0px, transparent 50%);
          }
          50% {
            background: radial-gradient(at 100% 100%, ${COLORS.POWDER_LIGHT}40 0px, transparent 50%),
              radial-gradient(at 0% 100%, ${COLORS.BLUE_LIGHT}30 0px, transparent 50%),
              radial-gradient(at 0% 0%, ${COLORS.SLATE_MEDIUM}20 0px, transparent 50%),
              radial-gradient(at 100% 0%, ${COLORS.TAUPE_NEUTRAL}25 0px, transparent 50%),
              radial-gradient(at 50% 50%, ${COLORS.NAVY_DARK}10 0px, transparent 50%);
          }
          75% {
            background: radial-gradient(at 0% 100%, ${COLORS.POWDER_LIGHT}40 0px, transparent 50%),
              radial-gradient(at 0% 0%, ${COLORS.BLUE_LIGHT}30 0px, transparent 50%),
              radial-gradient(at 100% 0%, ${COLORS.SLATE_MEDIUM}20 0px, transparent 50%),
              radial-gradient(at 100% 100%, ${COLORS.TAUPE_NEUTRAL}25 0px, transparent 50%),
              radial-gradient(at 50% 50%, ${COLORS.NAVY_DARK}10 0px, transparent 50%);
          }
        }

        .animated-mesh {
          animation: meshGradient 20s ease-in-out infinite;
        }
      `}</style>

      <div
        className={`pointer-events-none absolute inset-0 animated-mesh ${className}`}
        style={{
          background: `
            radial-gradient(at 0% 0%, ${COLORS.POWDER_LIGHT}40 0px, transparent 50%),
            radial-gradient(at 100% 0%, ${COLORS.BLUE_LIGHT}30 0px, transparent 50%),
            radial-gradient(at 100% 100%, ${COLORS.SLATE_MEDIUM}20 0px, transparent 50%),
            radial-gradient(at 0% 100%, ${COLORS.TAUPE_NEUTRAL}25 0px, transparent 50%),
            radial-gradient(at 50% 50%, ${COLORS.NAVY_DARK}10 0px, transparent 50%)
          `,
        }}
      />
    </>
  )
}
