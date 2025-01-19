import { useEffect, useState } from 'react'

interface Headline {
  text: string
  lang: string
}

interface AnimatedHeadlineProps {
  headlines: Headline[]
  currentIndex: number
}

export function AnimatedHeadline({ headlines, currentIndex }: AnimatedHeadlineProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 500)
    return () => clearTimeout(timer)
  }, [currentIndex])

  return (
    <h1 
      className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-500 ease-in-out ${
        isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      lang={headlines[currentIndex].lang}
    >
      {headlines[currentIndex].text}
    </h1>
  )
}

