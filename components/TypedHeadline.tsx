'use client'

import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

interface Headline {
  text: string
  lang: string
}

interface TypedHeadlineProps {
  headlines: Headline[]
}

export function TypedHeadline({ headlines }: TypedHeadlineProps) {
  const el = useRef(null)
  const typed = useRef<Typed | null>(null)

  useEffect(() => {
    const options = {
      strings: headlines.map(h => h.text),
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    }

    typed.current = new Typed(el.current, options)

    return () => {
      if (typed.current) {
        typed.current.destroy()
      }
    }
  }, [headlines])

  return (
    <h1 
      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
    >
      <span ref={el} />
    </h1>
  )
}

