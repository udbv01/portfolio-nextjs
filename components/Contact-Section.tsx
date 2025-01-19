'use client'

import { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here, e.g. send to an API or email service
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' }) // Reset the form
  }

  return (
    <div id="contact-section" className="w-full bg-white text-black py-20 md:py-20 flex items-center justify-center h-[100vh]">
      <div className="text-center w-full md:w-2/3 lg:w-1/2">
        <h2 className="text-4xl font-bold mb-16 z-10">
          CTA und Kontaktform!
        </h2>
        <div className="w-full bg-black text-white p-8 rounded-lg shadow-lg">
          {isSubmitted ? (
            <div className="text-center text-green-400">
              <h3 className="text-2xl font-bold">Danke für deine Nachricht!</h3>
              <p>Ich werde mich so schnell wie möglich bei dir melden.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-white mb-2">
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
                  placeholder="Gib deinen Namen ein"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
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
                  placeholder="Gib deine E-Mail ein"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-white mb-2">
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
                  placeholder="Schreibe deine Nachricht"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
              >
                Jetzt absenden
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo(0, 0)}
        className="relative left-10 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-400"
      >
        ↑
      </button>
    </div>
  )
}
