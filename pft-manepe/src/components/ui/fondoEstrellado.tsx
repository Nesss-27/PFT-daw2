import { useState, useEffect } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  duration: number
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: 0.4 + Math.random() * 0.6,
    duration: 2 + Math.random() * 4,
  }))
}

export default function Starfield() {
  const [stars, setStars] = useState<Star[] | null>(null)

  useEffect(() => {
    setStars(generateStars(120))
  }, [])

  if (!stars) return <div className="fixed inset-0 bg-black -z-10" />

  return (
    <div className="fixed inset-0 bg-black overflow-hidden -z-10">
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--opacity': star.opacity,
            '--duration': `${star.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}