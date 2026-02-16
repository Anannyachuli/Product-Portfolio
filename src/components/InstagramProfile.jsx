import { motion } from 'framer-motion';
import { MapPin, BadgeCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function InstagramProfile() {
  const { personal } = portfolioData;
  
  // Calculate stats
  const internships = portfolioData.professionalWork?.filter(p => p.isInternship).length || 0;
  const projects = (portfolioData.professionalWork?.length || 0) + 
                   (portfolioData.academicProjects?.length || 0);
  const skills = Object.values(portfolioData.skills || {}).flat().length;

  return (
    <section id="about" className="pt-16 pb-10 bg-white">
      <div className="max-w-[1000px] mx-auto px-5">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
          
          {/* Profile Picture with Instagram Gradient Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex-shrink-0"
          >
            <div className="w-[160px] h-[160px] md:w-[190px] md:h-[190px] rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
              <div className="w-full h-full rounded-full p-[3px] bg-white">
                <img
                  src="/images/Instagrampic.jpg"
                  alt={personal.name}
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex-1 text-center md:text-left"
          >
            {/* Name Row */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-5">
              <h1 className="text-[22px] font-normal text-gray-900 flex items-center gap-2">
                {personal.name.toLowerCase().replace(' ', '')}
                <BadgeCheck className="w-5 h-5 text-white fill-[#3b82f6]" />
              </h1>
            </div>

            {/* Stats Row */}
            <div className="flex justify-center md:justify-start gap-9 mb-5">
              <div className="text-center md:text-left">
                <span className="font-semibold text-gray-900 text-[15px]">10</span>
                <span className="text-gray-900 ml-1 text-[15px]">companies</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-semibold text-gray-900 text-[15px]">{projects}</span>
                <span className="text-gray-900 ml-1 text-[15px]">projects</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-semibold text-gray-900 text-[15px]">{skills}+</span>
                <span className="text-gray-900 ml-1 text-[15px]">skills</span>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <p className="font-semibold text-gray-900 text-[15px]">
                About Myself
              </p>
              <p className="text-gray-500 text-[15px]">
                {personal.title} @ {personal.company}
              </p>
              <p className="text-gray-900 text-[15px] max-w-lg">
                {personal.tagline}
              </p>
              <p className="text-gray-900 text-[15px] flex items-center justify-center md:justify-start gap-1">
                <MapPin size={15} className="text-gray-500" />
                Phoenix, Arizona
              </p>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons - Full Width Below Profile */}
        <div className="flex gap-3 w-full mt-7">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 bg-[#0095f6] hover:bg-[#1877f2] text-white text-[15px] font-semibold rounded-lg transition-colors text-center"
          >
            Connect
          </a>
          <a
            href={`${personal.linkedin}/overlay/contact-info/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-[15px] font-semibold rounded-lg transition-colors text-center"
          >
            Message
          </a>
          <span className="flex-1 py-2 bg-[#00A693] text-white text-[15px] font-semibold rounded-lg text-center cursor-default">
            Open to Work
          </span>
        </div>
      </div>
    </section>
  );
}
