'use client'

import { useState, useEffect } from 'react'
import { SocialIcon } from './SocialIcon'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        console.error('Fehler:', errorData.error);
        alert('Die Nachricht konnte nicht gesendet werden. Bitte versuche es erneut.');
      }
    } catch (error) {
      console.error('Fehler beim Senden:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.');
    }
  };
  

  const handleScroll = () => {
    const ctaSection = document.getElementById('contact-section')
    if (ctaSection) {
      const rect = ctaSection.getBoundingClientRect()
      setShowButton(rect.top <= window.innerHeight && rect.bottom >= 0)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div
      id="contact-section"
      className="h-screen flex flex-col justify-center items-center bg-white text-black relative overflow-hidden py-20">
      <h2 className="text-4xl font-bold m-5 animate-fade-in-up z-10">Überzeugt?</h2>
      <p className="text-[clamp(1rem, 2.5vw, 1.25rem)] mb-8 animate-fade-in-up text-gray-700 md:text-gray-400">Dann freue ich mich auf Deine Nachricht!</p>

      <div className="relative w-[80%] max-w-4xl h-[500px] perspective-1000 mx-auto md:w-full">
        <div className="w-full bg-black text-white p-8 rounded-lg shadow-custom">
          {isSubmitted ? (
            <div className="text-center text-green-400">
              <h3 className="text-2xl font-bold">Danke für Deine Nachricht!</h3>
              <p>Ich werde mich so schnell wie möglich bei Dir melden.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="text-left block text-sm font-bold text-white mb-2"
                >
                  Dein Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Gib Deinen Namen ein"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-left block text-sm font-bold text-white mb-2"
                >
                  Deine E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Gib Deine E-Mail ein"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="text-left block text-sm font-bold text-white mb-2"
                >
                  Deine Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Schreibe Deine Nachricht"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white p-3 rounded-md shadow-lg hover:bg-green-600 transition-all duration-300"
              >
                Jetzt absenden
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="flex justify-center space-x-6 m-10">
            <SocialIcon icon="github" />
            <SocialIcon icon="email" />
            <SocialIcon icon="instagram" />
            <SocialIcon icon="linkedin" />
      </div>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gray-800 text-white p-3 rounded-md shadow-lg hover:bg-gray-500 transition-all duration-400"
        >
          ↑
        </button>
      )}

      <style jsx global>{`
        .shadow-custom {
          box-shadow: 1px 1px 10px rgba(191, 191, 191, 0.5);
        }
      `}</style>
    </div>
  )
}
