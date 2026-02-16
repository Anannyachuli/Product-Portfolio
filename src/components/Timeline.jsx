import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Calendar, GraduationCap, Briefcase } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Academic timeline data
const academicTimeline = [
  {
    id: 'masters',
    degree: "Master's in Engineering Management",
    institution: "Duke University",
    location: "Durham, NC, USA",
    startYear: "2024",
    endYear: "2026",
    type: "masters",
    highlights: [
      "Specialized in Product Management and Technology Strategy",
      "Product Management Club President",
      "Graduate Teaching Assistant"
    ]
  },
  {
    id: 'bachelors',
    degree: "Bachelor of Technology in Computer Science Engineering",
    institution: "University Name",
    location: "India",
    startYear: "2020",
    endYear: "2024",
    type: "bachelors",
    highlights: [
      "First Class with Distinction",
      "Published 2 research papers",
      "Hackathon Winner"
    ]
  }
];

export default function Timeline() {
  const { experience } = portfolioData;
  const [activeYear, setActiveYear] = useState(null);
  const [viewMode, setViewMode] = useState('career'); // 'career' or 'academic'
  const sectionRefs = useRef({});
  
  // All years from 2020 to 2026
  const allYears = ['2026', '2025', '2024', '2023', '2022', '2021', '2020'];

  // Group experiences by year for career
  const getCareerByYear = (year) => {
    return experience.filter(exp => exp.timeline.includes(year));
  };

  // Get academic items for a year
  const getAcademicByYear = (year) => {
    return academicTimeline.filter(item => {
      const start = parseInt(item.startYear);
      const end = parseInt(item.endYear);
      const y = parseInt(year);
      return y >= start && y <= end;
    });
  };

  // Handle scroll to detect active year
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const year of allYears) {
        const element = sectionRefs.current[year];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveYear(year);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToYear = (year) => {
    const element = sectionRefs.current[year];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="experience" className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#281e32] mb-6">
            {viewMode === 'career' ? 'Career Timeline' : 'Academic Timeline'}
          </h2>
          
          {/* Toggle Switch */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm border border-[#bcbcbc]">
            <button
              onClick={() => setViewMode('career')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                viewMode === 'career'
                  ? 'bg-[#281e32] text-white'
                  : 'text-[#7a7979] hover:text-[#281e32]'
              }`}
            >
              <Briefcase size={16} />
              Career
            </button>
            <button
              onClick={() => setViewMode('academic')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                viewMode === 'academic'
                  ? 'bg-[#281e32] text-white'
                  : 'text-[#7a7979] hover:text-[#281e32]'
              }`}
            >
              <GraduationCap size={16} />
              Academic
            </button>
          </div>
        </motion.div>

        {/* Timeline Layout */}
        <div className="flex gap-8 md:gap-16">
          {/* Years Navigation - Left Side */}
          <div className="hidden md:block sticky top-32 h-fit">
            <nav className="space-y-3">
              {allYears.map((year) => (
                <button
                  key={year}
                  onClick={() => scrollToYear(year)}
                  className={`block text-left text-5xl font-bold transition-colors duration-500 ease-in-out ${
                    activeYear === year
                      ? 'text-[#281e32]'
                      : 'text-[#bcbcbc] hover:text-[#7a7979]'
                  }`}
                >
                  {year}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area - Right Side */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {viewMode === 'career' ? (
                <motion.div
                  key="career"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {allYears.map((year) => {
                    const yearExperiences = getCareerByYear(year);
                    
                    return (
                      <div
                        key={year}
                        ref={(el) => (sectionRefs.current[year] = el)}
                        className="mb-20"
                      >
                        {/* Year Divider */}
                        <div className="flex items-center gap-4 mb-10">
                          <div className="flex-1 h-[1px] bg-[#bcbcbc]" />
                          <span className="text-2xl font-bold text-[#7a7979]">{year}</span>
                          <div className="flex-1 h-[1px] bg-[#bcbcbc]" />
                        </div>

                        {/* Experience Cards for this year */}
                        {yearExperiences.length > 0 ? (
                          <div className="space-y-12">
                            {yearExperiences.map((exp, index) => (
                              <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="grid md:grid-cols-2 gap-8 items-start"
                              >
                                {/* Image/Visual Card */}
                                <div 
                                  className={`aspect-[4/3] rounded-lg overflow-hidden ${
                                    index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                                  }`}
                                  style={{ 
                                    backgroundColor: exp.type === 'internship' ? '#ed9e67' : '#1d5191'
                                  }}
                                >
                                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-white">
                                    <Building2 size={48} className="mb-4 opacity-80" />
                                    <h4 className="text-2xl font-bold text-center mb-2">{exp.company}</h4>
                                    <p className="text-white/80 text-sm">{exp.timeline}</p>
                                    {exp.type === 'internship' && (
                                      <span className="mt-3 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                                        Internship
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Content Card */}
                                <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                                  <div className="flex items-center gap-2 text-sm text-[#7a7979] mb-3">
                                    <span className="uppercase tracking-wider font-medium">
                                      {exp.type === 'internship' ? 'Internship' : 'Full-time'}
                                    </span>
                                    <span>•</span>
                                    <span>{exp.location}</span>
                                  </div>

                                  <h3 className="text-2xl md:text-3xl font-black text-[#281e32] mb-4 leading-tight">
                                    {exp.role} at {exp.company}
                                  </h3>

                                  <p className="text-[#7a7979] mb-6 leading-relaxed">
                                    {exp.highlights[0]}
                                  </p>

                                  {/* Highlights */}
                                  <ul className="space-y-3">
                                    {exp.highlights.slice(1).map((highlight, i) => (
                                      <li 
                                        key={i}
                                        className="flex items-start gap-3 text-[#281e32]"
                                      >
                                        <span 
                                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                          style={{ backgroundColor: '#fe6601' }}
                                        />
                                        <span>{highlight}</span>
                                      </li>
                                    ))}
                                  </ul>

                                  {/* Meta Info */}
                                  <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-[#bcbcbc]">
                                    <span className="flex items-center gap-2 text-sm text-[#7a7979]">
                                      <Calendar size={16} />
                                      {exp.timeline}
                                    </span>
                                    <span className="flex items-center gap-2 text-sm text-[#7a7979]">
                                      <MapPin size={16} />
                                      {exp.location}
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[#bcbcbc] text-center py-8 italic">No career events this year</p>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="academic"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {allYears.map((year) => {
                    const yearAcademics = getAcademicByYear(year);
                    
                    return (
                      <div
                        key={year}
                        ref={(el) => (sectionRefs.current[year] = el)}
                        className="mb-20"
                      >
                        {/* Year Divider */}
                        <div className="flex items-center gap-4 mb-10">
                          <div className="flex-1 h-[1px] bg-[#bcbcbc]" />
                          <span className="text-2xl font-bold text-[#7a7979]">{year}</span>
                          <div className="flex-1 h-[1px] bg-[#bcbcbc]" />
                        </div>

                        {/* Academic Cards for this year */}
                        {yearAcademics.length > 0 ? (
                          <div className="space-y-12">
                            {yearAcademics.map((item, index) => {
                              const isGraduationYear = item.endYear === year;
                              const isStartYear = item.startYear === year;
                              
                              return (
                                <motion.div
                                  key={`${item.id}-${year}`}
                                  initial={{ opacity: 0, y: 40 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: index * 0.1, duration: 0.5 }}
                                  className="grid md:grid-cols-2 gap-8 items-start"
                                >
                                  {/* Image/Visual Card */}
                                  <div 
                                    className={`${
                                      index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                                    }`}
                                  >
                                    {item.image ? (
                                      <div className="w-full rounded-lg shadow-md overflow-hidden">
                                        <img 
                                          src={item.image} 
                                          alt={item.institution}
                                          className="w-full h-auto"
                                          style={{ clipPath: 'inset(8% 0 0 0)' }}
                                        />
                                      </div>
                                    ) : (
                                      <div 
                                        className="aspect-[4/3] rounded-lg overflow-hidden flex flex-col items-center justify-center p-8 text-white"
                                        style={{ 
                                          backgroundColor: item.type === 'masters' ? '#86370e' : '#281e32'
                                        }}
                                      >
                                        <GraduationCap size={48} className="mb-4 opacity-80" />
                                        <h4 className="text-2xl font-bold text-center mb-2">{item.institution}</h4>
                                        <p className="text-white/80 text-sm">{item.startYear} - {item.endYear}</p>
                                        {isGraduationYear && (
                                          <span className="mt-3 px-3 py-1 bg-[#fe6601] rounded-full text-xs font-semibold">
                                            🎓 Graduated
                                          </span>
                                        )}
                                        {isStartYear && !isGraduationYear && (
                                          <span className="mt-3 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                                            Started
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  {/* Content Card */}
                                  <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                                    <div className="flex items-center gap-2 text-sm text-[#7a7979] mb-3">
                                      <span className="uppercase tracking-wider font-medium">
                                        {item.type === 'masters' ? "Master's Degree" : "Bachelor's Degree"}
                                      </span>
                                      <span>•</span>
                                      <span>{item.location}</span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-black text-[#281e32] mb-4 leading-tight">
                                      {item.degree}
                                    </h3>

                                    <p className="text-[#1d5191] font-semibold mb-6">
                                      {item.institution}
                                    </p>

                                    {/* Highlights */}
                                    <ul className="space-y-3">
                                      {item.highlights.map((highlight, i) => (
                                        <li 
                                          key={i}
                                          className="flex items-start gap-3 text-[#281e32]"
                                        >
                                          <span 
                                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                            style={{ backgroundColor: '#fe6601' }}
                                          />
                                          <span>{highlight}</span>
                                        </li>
                                      ))}
                                    </ul>

                                    {/* Meta Info */}
                                    <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-[#bcbcbc]">
                                      <span className="flex items-center gap-2 text-sm text-[#7a7979]">
                                        <Calendar size={16} />
                                        {item.startYear} - {item.endYear}
                                      </span>
                                      <span className="flex items-center gap-2 text-sm text-[#7a7979]">
                                        <MapPin size={16} />
                                        {item.location}
                                      </span>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-[#bcbcbc] text-center py-8 italic">No academic events this year</p>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
