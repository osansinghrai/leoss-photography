'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Camera, Award, Star, Calendar, MapPin, Trophy, Zap, Palette, Camera as CameraIcon } from 'lucide-react'

// Types
interface ExperienceItem {
  id: number
  year: string
  title: string
  description: string
  location: string
  category: string
}

interface Skill {
  id: number
  name: string
  level: number
  icon: React.ReactNode
  color: string
}

interface AwardItem {
  id: number
  title: string
  description: string
  year: string
  image: string
  category: string
}

// Data
const experienceData: ExperienceItem[] = [
  {
    id: 1,
    year: '2023',
    title: 'Lead Wedding Photographer',
    description: 'Captured over 50+ luxury weddings across Europe, specializing in destination photography and intimate ceremonies.',
    location: 'Europe',
    category: 'Wedding'
  },
  {
    id: 2,
    year: '2022',
    title: 'Commercial Photography Director',
    description: 'Led photography campaigns for major fashion brands, creating compelling visual narratives for global audiences.',
    location: 'New York',
    category: 'Commercial'
  },
  {
    id: 3,
    year: '2021',
    title: 'Portrait Studio Owner',
    description: 'Established a premium portrait studio, serving high-profile clients and celebrities with bespoke photography services.',
    location: 'Los Angeles',
    category: 'Portrait'
  },
  {
    id: 4,
    year: '2020',
    title: 'Travel Photography Expedition',
    description: 'Documented cultural heritage across 15 countries, creating a visual anthology of world traditions and landscapes.',
    location: 'Global',
    category: 'Travel'
  },
  {
    id: 5,
    year: '2019',
    title: 'Photojournalism Assignment',
    description: 'Covered major international events and humanitarian stories, published in leading global publications.',
    location: 'Worldwide',
    category: 'Photojournalism'
  }
]

const skillsData: Skill[] = [
  { id: 1, name: 'Portrait Photography', level: 95, icon: <Camera className="w-5 h-5" />, color: 'from-gray-600 to-gray-800' },
  { id: 2, name: 'Adobe Lightroom', level: 90, icon: <Palette className="w-5 h-5" />, color: 'from-gray-600 to-gray-800' },
  { id: 3, name: 'Adobe Photoshop', level: 85, icon: <Zap className="w-5 h-5" />, color: 'from-gray-600 to-gray-800' },
  { id: 4, name: 'Drone Photography', level: 80, icon: <CameraIcon className="w-5 h-5" />, color: 'from-gray-600 to-gray-800' },
  { id: 5, name: 'Wedding Photography', level: 95, icon: <Star className="w-5 h-5" />, color: 'from-gray-600 to-gray-800' },
  { id: 6, name: 'Commercial Photography', level: 88, icon: <Trophy className="w-5 h-5" />, color: 'from-gray-600 to-gray-800' }
]

const awardsData: AwardItem[] = [
  {
    id: 1,
    title: 'International Wedding Photography Award',
    description: 'Recognized for exceptional creativity and technical excellence in wedding photography.',
    year: '2023',
    image: '/awards/award1.jpg',
    category: 'Wedding'
  },
  {
    id: 2,
    title: 'National Geographic Photo Contest Winner',
    description: 'First place in the Travel category for capturing authentic cultural moments.',
    year: '2022',
    image: '/awards/award2.jpg',
    category: 'Travel'
  },
  {
    id: 3,
    title: 'Professional Photographers of America Award',
    description: 'Lifetime achievement award for contributions to the photography industry.',
    year: '2021',
    image: '/awards/award3.jpg',
    category: 'Lifetime'
  },
  {
    id: 4,
    title: 'Fashion Photography Excellence',
    description: 'Awarded for innovative approach to fashion and editorial photography.',
    year: '2020',
    image: '/awards/award4.jpg',
    category: 'Fashion'
  }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1
  },
  hover: {
    scale: 1.05
  }
}

const ExperiencePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <motion.div 
        className="relative h-96 flex items-center justify-center overflow-hidden bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200"></div>
        <div className="relative z-10 text-center">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-gray-900 mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A journey through years of capturing life's most precious moments
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section 1: Photographer's Experience */}
        <motion.section 
          className="mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
            variants={itemVariants}
          >
            Professional Journey
          </motion.h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gray-300"></div>
            
            <div className="space-y-12">
              {experienceData.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:flex-row gap-8`}
                  variants={itemVariants}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gray-600 rounded-full border-4 border-white z-10"></div>
                  
                  {/* Content card */}
                  <motion.div 
                    className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-400 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl font-bold text-gray-900">{item.year}</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <div className="flex items-center gap-2 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 2: Skills */}
        <motion.section 
          className="mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
            variants={itemVariants}
          >
            Technical Expertise
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((skill) => (
              <motion.div
                key={skill.id}
                className="group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-400 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      {skill.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Proficiency</span>
                      <span className="text-gray-900 font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full bg-gray-600"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Awards & Accomplishments */}
        <motion.section 
          className="mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
            variants={itemVariants}
          >
            Awards & Recognition
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {awardsData.map((award) => (
              <motion.div
                key={award.id}
                className="group"
                variants={itemVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 hover:shadow-lg transition-all duration-300"
                  variants={cardVariants}
                >
                  {/* Award Image Placeholder */}
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <Award className="w-16 h-16 text-gray-600" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {award.category}
                      </span>
                      <span className="text-gray-900 font-semibold">{award.year}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                      {award.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Ready to Create Together?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life with professional photography that tells your unique story.
            </p>
            <motion.button
              className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default ExperiencePage