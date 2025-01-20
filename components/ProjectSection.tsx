'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  image: string;
  liveDemoUrl: string;
  moreInfoUrl: string;
}

const projects: Project[] = [
  {
    title: 'To-Do List App',
    description: 'Eine einfache To-Do-Liste, die es Nutzern ermöglicht, Aufgaben zu erstellen, abzuhaken und zu löschen.',
    image: '/todoapp.jpg',
    liveDemoUrl: '/projects/todo-list',
    moreInfoUrl: '/projects/todo-list',
  },
  {
    title: 'Weather App',
    description: 'Eine App, die das aktuelle Wetter für eine eingegebene Stadt anzeigt.',
    image: '/weatherapp.jpg',
    liveDemoUrl: '/projects/weather-app',
    moreInfoUrl: '/projects/weather-app',
  },
  {
    title: 'Portfolio Website',
    description: 'Ein persönliches Portfolio, das meine Fähigkeiten und Projekte präsentiert.',
    image: '/portfolioapp.jpg',
    liveDemoUrl: '/projects/portfolio',
    moreInfoUrl: '/projects/portfolio',
  },
  // Weitere Projekte hier...
];

export function ProjectSection() {
  const [currentProject, setCurrentProject] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRotation = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentProject((prev) => (prev + 1) % projects.length);
      }, 8000);
    }
  };

  useEffect(() => {
    startRotation();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  const handleMouseEnter = (index: number) => {
    setIsHovered(true);
    if (index === currentProject) {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleMouseLeave = (index: number) => {
    setIsHovered(false);
    if (index === currentProject) {
      startRotation();
    }
  };

  return (
    <div id="project-section" className="h-screen flex flex-col justify-center items-center bg-black text-white relative overflow-hidden py-20">
      <h2 className="text-4xl font-bold mb-16 z-10">Meine Projekte</h2>

      <div className="relative w-[80%] max-w-4xl h-[500px] perspective-1000 mx-auto md:w-full">

        {projects.map((project, index) => {
          let position = index - currentProject;
          if (position < 0) position += projects.length;
          return (
            <motion.div
              key={index}
              className={`absolute top-0 left-0 w-full h-full ${index === currentProject ? 'z-20' : 'z-10'}`}
              initial={false}
              animate={{
                x: position === 0 ? '0%' : position === 1 ? '100%' : '-100%',
                scale: position === 0 ? 1 : 0.8,
                opacity: position === 0 ? 1 : 0.5,
                zIndex: position === 0 ? 20 : 10,
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: position === 0 ? 1.05 : 1, opacity: position === 0 ? 1 : 0.8 }}
              onClick={() => position !== 0 && setCurrentProject(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className={`relative w-full h-full bg-gray-900 rounded-lg p-8 flex flex-col md:flex-row items-center ${index === currentProject ? 'active-project' : ''}`}>
                <img src={project.image} alt={project.title} className="w-full md:w-1/2 h-auto rounded-lg mb-4 md:mb-0 md:mr-8 shadow-custom" />
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                  <p className="mb-6">{project.description}</p>
                  <div className="flex space-x-4">
                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                      <button className="px-4 py-2 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-black transition-colors duration-300 ease-in-out">
                        Live Demo
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style jsx global>{`
        .active-project {
          position: relative;
        }

        .active-project::before {
          content: '';
          position: absolute;
          top: -2px;
          right: -2px;
          bottom: -2px;
          left: -2px;
          background: linear-gradient(90deg, #ff0000, #ffa500, #ffff00, #008000, #0000ff, #4b0082, #ee82ee);
          background-size: 400% 400%;
          border-radius: 8px;
          z-index: -1;
          animation: moveGradient 8s linear infinite;
        }

        .active-project::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: #1a1a1a;
          border-radius: 6px;
          z-index: -1;
        }
        
        .shadow-custom {
          box-shadow: 1px 1px 10px rgba(191, 191, 191, 0.5); /* Grauer Schatten */
        }

        @keyframes moveGradient {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 400% 50%;
          }
        }
      `}</style>
    </div>
  );
}
