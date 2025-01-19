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
  { name: 'HTML', level: 89, x: 20, y: 20, connections: ['CSS', 'JavaScript'] },
  { name: 'CSS', level: 80, x: 80, y: 30, connections: ['HTML', 'JavaScript'] },
  { name: 'React', level: 50, x: 50, y: 50, connections: ['JavaScript', 'TypeScript', 'Next.js'] },
  { name: 'Next.js', level: 50, x: 70, y: 70, connections: ['React', 'TypeScript', 'Node.js'] },
  { name: 'Figma', level: 70, x: 30, y: 80, connections: ['HTML', 'CSS'] },
  { name: 'JavaScript', level: 60, x: 10, y: 60, connections: ['HTML', 'CSS', 'TypeScript', 'React', 'Node.js'] },
  { name: 'TypeScript', level: 60, x: 90, y: 10, connections: ['JavaScript', 'React', 'Next.js'] },
  { name: 'Node.js', level: 30, x: 40, y: 30, connections: ['JavaScript', 'TypeScript', 'Next.js'] },
]

export function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <div id="skills-section" className="h-[100vh] flex flex-col items-center bg-black text-white relative overflow-hidden py-20">
      <h2 className="text-4xl font-bold mb-16 z-10">Tools und Skills</h2>

      <div className="relative w-full max-w-4xl h-[600px]">
        <svg className="w-full h-full">
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
                      stroke={hoveredSkill === skill.name || hoveredSkill === connectedSkill ? "#ffffff" : "#333333"}
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  );
                }
                return null;
              })}
            </React.Fragment>
          ))}
          {skills.map((skill, index) => (
            <motion.circle
              key={`circle-${skill.name}`}
              cx={`${skill.x}%`}
              cy={`${skill.y}%`}
              r={skill.level / 3}  // Increased the size of circles
              fill="url(#skillGradient)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}  // Reduced hover scale for better proportions
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                scale: { type: "spring", stiffness: 300, damping: 25 }
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            />
          ))}
          {skills.map((skill) => (
            <motion.text
              key={`text-${skill.name}`}
              x={`${skill.x}%`}
              y={`${skill.y}%`}
              dy="-1.5em"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold"
            >
              {skill.name}
            </motion.text>
          ))}
          <defs>
            <radialGradient id="skillGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#00ff00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00ff00" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="mt-8 text-center max-w-2xl">
        <p className="text-lg">
          Diese interaktive Visualisierung zeigt meine Fähigkeiten als eine Konstellation von Technologien. 
          Die Größe jedes &quot;Sterns&quot; repräsentiert mein Fähigkeitsniveau, während die Verbindungen die Synergien zwischen den Technologien darstellen.
        </p>
      </div>
    </div>
  )
}

