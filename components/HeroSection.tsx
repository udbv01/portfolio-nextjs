'use client'

import { useState } from 'react'
import { Header } from './Header'
import { TypedHeadline } from './TypedHeadline'
import { SocialIcon } from './SocialIcon'

const headlines = [
  { text: "Moin, ich bin der Ubaid", lang: "de" },
  { text: "Hi, I'm Ubaid", lang: "en" },
  { text: "Siema, jestem Ubaid", lang: "pl" },
  { text: "Здарова, я Убайд", lang: "ru" },
]

export default function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToContent = () => {
    const skillsSection = document.getElementById('skills-section')
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div 
      id="hero-section" 
      className="relative w-full min-h-screen bg-white text-black flex flex-col justify-center items-center text-center md:flex-row md:bg-black md:text-white"
    >
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Left white column (social icons) - hidden on mobile */}
      <div className="hidden md:flex md:w-[15%] bg-white justify-left items-center p-4 min-h-screen">
        <div className="flex flex-col space-y-4">
        <SocialIcon icon="github" />
        <SocialIcon icon="mail" />
        <SocialIcon icon="instagram" />
        <SocialIcon icon="linkedin" />
        </div>
      </div>

      {/* Middle column */}
      <div className="w-full md:w-[70%] flex flex-col justify-center items-center px-4 py-20">
        <TypedHeadline headlines={headlines} />
        <p className="text-[clamp(1rem, 2.5vw, 1.25rem)] mb-8 animate-fade-in-up text-gray-700 md:text-gray-400">
          Dein mehrsprachiger Webdesigner und leidenschaftlicher Frontend-Developer!
        </p>

        {/* Scroll button */}
        <button 
          onClick={scrollToContent}
          className="mt-10 bg-black text-white px-6 py-3 rounded-md shadow-lg hover:bg-gray-300 transition-all duration-400 md:bg-white md:text-black"
        >
          Skills anzeigen
        </button>
      </div>

      {/* Right white column */}
      <div className="hidden md:block md:w-[15%] bg-white min-h-screen"></div>
    </div>
  )
}
