"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { SocialIcon } from './SocialIcon'

export function Header() {
  const [isAboveHero, setIsAboveHero] = useState(false) // Header über Hero Section
  const [isAboveProject, setIsAboveProject] = useState(false) // Header über Project Section
  const [isAboveSkills, setIsAboveSkills] = useState(false) // Header über Skills Section
  const [isAboveContact, setIsAboveContact] = useState(false) // Header über Contact Section
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section')
      const projectSection = document.getElementById('project-section')
      const skillsSection = document.getElementById('skills-section')
      const contactSection = document.getElementById('contact-section')

      const getRectTop = (section) => section?.getBoundingClientRect().top ?? Infinity
      const headerHeight = document.querySelector('header')?.offsetHeight || 0

      const isHeaderOverSection = (section) => {
        const top = getRectTop(section)
        return top <= headerHeight && top + (section?.offsetHeight || 0) > headerHeight
      }

      setIsAboveHero(isHeaderOverSection(heroSection))
      setIsAboveProject(isHeaderOverSection(projectSection))
      setIsAboveSkills(isHeaderOverSection(skillsSection))
      setIsAboveContact(isHeaderOverSection(contactSection))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initiale Überprüfung
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getTextColor = () => {
    if (isMenuOpen) return 'text-black'
    if (isAboveHero || isAboveContact) return 'text-black'
    if (isAboveProject || isAboveSkills) return 'text-white'
    return 'text-black'
  }

  const getBackgroundColor = () => {
    if (isMenuOpen) return 'bg-white'
    return 'bg-transparent'
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <div
        className={`flex justify-between items-center p-4 transition-colors duration-300 ${getBackgroundColor()}`}
      >
        {/* Logo */}
        <div
          onClick={() => {
            const heroSection = document.getElementById('hero-section')
            heroSection?.scrollIntoView({ behavior: 'smooth' })
          }}
          className={`text-2xl font-bold transition-colors duration-300 hover:cursor-pointer ${getTextColor()}`}
        >
          UBAID
        </div>

        {/* Hamburger Menu Button */}
        <button
          className={`z-50 relative transition-colors duration-300 ${getTextColor()}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Menü */}
      <div
        className={`fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } z-40`}
      >
        <nav className="h-full flex flex-col justify-center items-center">
          <ul className="space-y-8 text-center">
            <NavItem href="#hero-section" text="Start" setIsMenuOpen={setIsMenuOpen} />
            <NavItem href="#project-section" text="Projekte" setIsMenuOpen={setIsMenuOpen} />
            <NavItem href="#skills-section" text="Skills" setIsMenuOpen={setIsMenuOpen} />
            <NavItem href="#contact-section" text="Kontakt" setIsMenuOpen={setIsMenuOpen} />
          </ul>
          <div className="flex justify-center space-x-6 mt-12">
            <SocialIcon icon="facebook" />
            <SocialIcon icon="twitter" />
            <SocialIcon icon="instagram" />
            <SocialIcon icon="linkedin" />
          </div>
        </nav>
      </div>
    </header>
  )
}

function NavItem({
  href,
  text,
  setIsMenuOpen,
}: {
  href: string
  text: string
  setIsMenuOpen: (isOpen: boolean) => void
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-2xl font-semibold text-black hover:text-gray-600 transition-colors duration-300"
        onClick={() => setIsMenuOpen(false)}
      >
        {text}
      </Link>
    </li>
  )
}
