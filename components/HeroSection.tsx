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
    const projectSection = document.getElementById('project-section');
    if (projectSection) {
      projectSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero-section" className="relative w-full h-[100vh] bg-black text-white flex flex-col md:flex-row">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Left white column (social icons) - hidden on mobile */}
      <div className="hidden md:flex md:w-[15%] bg-white justify-left items-center p-4">
        <div className="flex flex-col space-y-4">
          <SocialIcon icon="facebook" />
          <SocialIcon icon="twitter" />
          <SocialIcon icon="instagram" />
          <SocialIcon icon="linkedin" />
        </div>
      </div>

      {/* Middle black column */}
      <div className="w-full md:w-[70%] bg-black flex flex-col justify-center items-center text-white text-center px-4 py-20 md:py-0 pt-[60px]">
        <TypedHeadline headlines={headlines} />
        <p className="text-lg md:text-xl mb-8 animate-fade-in-up text-gray-400">
          Dein mehrsprachiger Webdesigner und leidenschaftlicher Frontend-Developer!
        </p>

        {/* Scroll button */}
        <button 
          onClick={scrollToContent}
          className="absolute bottom-4 items-center transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full shadow-lg hover:bg-gray-300 transition-all duration-400 animate-bounce"
        >
          was kann ich?
        </button>
      </div>

      {/* Right white column */}
      <div className="hidden md:block md:w-[15%] bg-white"></div>
    </div>
  )
}
