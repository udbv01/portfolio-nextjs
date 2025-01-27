'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

interface Project {
  title: string;
  description: string;
  image: string;
  liveDemoUrl: string;
  moreInfoUrl: string;
}

const projects: Project[] = [
  {
    title: 'Diese Portfolio Website',
    description: 'Dieses Next.js Portfolio habe ich erstellt, um meine Fähigkeiten und Erfahrungen auf effektivster Art und Weise zu presentieren. ',
    image: '/mein-portfolio.jpg',
    liveDemoUrl: '/',
    moreInfoUrl: 'https://github.com/udbv01/portfolio-nextjs.git',
  },
  {
    title: 'Wordpress Homepage',
    description: 'Eine Unternehmensseite, die ich mithilfe von Elementor erstellt habe, um meine Fähigkeiten in Wordpress weiterzuentwickeln.',
    image: '/wp-eichlerwerbung.jpg',
    liveDemoUrl: 'https://eichlerwerbung.de/wordpress/',
    moreInfoUrl: '',
  },
  {
    title: 'To-Do List App',
    description: 'Aufgaben, Unteraufgaben und Routineaufgaben die man filtern kann. Eine so funktionale To-Do App ist vermutlich kostenpflicht. Probier sie kostenlos aus.',
    image: '/todoapp.jpg',
    liveDemoUrl: '/projects/todo-list',
    moreInfoUrl: 'https://github.com/udbv01/portfolio-nextjs/blob/b0213b700b1b34cc844a88fbf98c74fe6e005f6a/pages/projects/todo-list.tsx',
  },
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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    },
    onSwipedRight: () => {
      setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    },
    trackMouse: true, // Erlaubt auch das Swipen mit der Maus
  });

  return (
    <div
      id="project-section"
      className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden py-20"
      {...swipeHandlers}
    >
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
              whileHover={{
                scale: position === 0 ? 1 : 0.85,
                opacity: position === 0 ? 1 : 0.85,
                cursor: position === 1 || position === projects.length - 1 ? 'pointer' : 'auto',
              }}
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
                  <button className="px-4 py-2 bg-white border-2 border-gray-300 text-black rounded-md hover:bg-gray-300 hover:transition-colors duration-300 ease-in-out">
                     Live ansehen
                   </button>
                   </a>
                   {project.moreInfoUrl && ( <a href={project.moreInfoUrl} target="_blank" rel="noopener noreferrer">
                  <button className="px-4 py-2 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-black transition-colors duration-300 ease-in-out">
                    Repository ansehen
                    </button>
                  </a> )}
                  </div>

              </div>
              </div>
            </motion.div>
            );
        })}
      </div>
    </div>
  );
}
