'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
  level: number // 0 to 100
  x: number // 0 to 100
  y: number // 0 to 100
  connections: string[]
}

const skills: Skill[] = [
  { name: 'HTML', level: 89, x: 20, y: 20, connections: ['CSS', 'JavaScript', 'Webflow'] },
  { name: 'CSS', level: 80, x: 90, y: 30, connections: ['HTML', 'JavaScript', 'React', 'Next.js'] },
  { name: 'React', level: 50, x: 50, y: 50, connections: ['JavaScript', 'TypeScript', 'Next.js', 'CSS'] },
  { name: 'Next.js', level: 50, x: 60, y: 85, connections: ['React', 'TypeScript', 'Node.js', 'CSS'] },
  { name: 'Figma', level: 70, x: 30, y: 80, connections: ['HTML', 'CSS', 'Webflow'] },
  { name: 'JavaScript', level: 60, x: 10, y: 60, connections: ['HTML', 'CSS', 'TypeScript', 'React', 'Node.js', 'Webflow'] },
  { name: 'TypeScript', level: 55, x: 75, y: 75, connections: ['JavaScript', 'React', 'Next.js', 'CSS', 'Node.js'] },
  { name: 'Node.js', level: 30, x: 40, y: 30, connections: ['JavaScript', 'TypeScript', 'Next.js'] },
  { name: 'Webflow', level: 75, x: 50, y: 10, connections: ['HTML', 'CSS', 'JavaScript', 'Figma'] },
  { name: 'Wordpress', level: 80, x: 45, y: 85, connections: ['HTML', 'CSS', 'JavaScript', 'PHP'] },
  { name: 'PHP', level: 30, x: 75, y: 15, connections: ['HTML', 'JavaScript', 'Wordpress'] },
]

export function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <div id="skills-section" className="h-screen flex flex-col items-center bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden py-20">
      <h2 className="text-4xl font-bold mb-16 z-10">Tools und Skills</h2>

      <div className="relative w-full max-w-4xl px-4 h-[600px]">
        <svg className="w-full h-full">
          {/* Verbindungen */}
          {skills.map((skill, index) => (
            <React.Fragment key={skill.name}>
              {skill.connections.map((connectedSkill) => {
                const connectedSkillData = skills.find((s) => s.name === connectedSkill);
                if (connectedSkillData) {
                  return (
                    <motion.line
                      key={`${skill.name}-${connectedSkill}`}
                      x1={`${skill.x}%`}
                      y1={`${skill.y}%`}
                      x2={`${connectedSkillData.x}%`}
                      y2={`${connectedSkillData.y}%`}
                      stroke={hoveredSkill === skill.name || hoveredSkill === connectedSkill ? "#ffffff" : "#555555"}
                      strokeWidth={hoveredSkill === skill.name || hoveredSkill === connectedSkill ? 2 : 1}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: index * 0.05 }}
                    />
                  );
                }
                return null;
              })}
            </React.Fragment>
          ))}
          {/* Kreise */}
          {skills.map((skill, index) => (
            <motion.circle
              key={`circle-${skill.name}`}
              cx={`${skill.x}%`}
              cy={`${skill.y}%`}
              r={skill.level / 4} // Optimierte Größe für bessere Übersicht
              fill={hoveredSkill === skill.name ? "url(#hoverGradient)" : "url(#skillGradient)"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                scale: { type: "spring", stiffness: 300, damping: 20 },
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            />
          ))}
          {/* Text */}
          {skills.map((skill) => (
            <motion.text
              key={`text-${skill.name}`}
              x={`${skill.x}%`}
              y={`${skill.y}%`}
              dy="-1.5em"
              textAnchor="middle"
              fill={hoveredSkill === skill.name ? "#00ff00" : "#ffffff"}
              fontSize="12"
              fontWeight="bold"
            >
              {skill.name}
            </motion.text>
          ))}
          {/* Farbverläufe */}
          <defs>
            <radialGradient id="skillGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#007BFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#001F3F" stopOpacity="0.5" />
            </radialGradient>
            <radialGradient id="hoverGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="0.5" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="mt-8 text-center max-w-2xl px-4">
        <p className="text-lg">
          Diese interaktive Visualisierung zeigt meine Fähigkeiten als eine Konstellation von Technologien. 
          Die Größe jedes &quot;Sterns&quot; repräsentiert mein Fähigkeitsniveau, während die Verbindungen die Synergien zwischen den Technologien darstellen.
        </p>
      </div>
    </div>
  )
}
