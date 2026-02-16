import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Download, MapPin } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 15, scale: 0.96 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
};

const BentoTile = ({ children, className, onClick, href, style }) => {
  const Component = href ? motion.a : motion.div;
  const linkProps = href ? { 
    href, 
    target: href.startsWith('/') || href.startsWith('mailto:') ? '_self' : '_blank', 
    rel: 'noopener noreferrer',
    download: href.endsWith('.pdf') ? true : undefined
  } : {};
  
  return (
    <Component
      variants={item}
      whileHover={{ scale: 1.015, y: -2, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-[20px] overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-lg ${className}`}
      onClick={onClick}
      style={style}
      {...linkProps}
    >
      {children}
    </Component>
  );
};

export default function BentoHero() {
  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-white py-6 px-4 md:px-8">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1100px] mx-auto pt-24 md:pt-28"
      >
        {/* Bento Grid */}
        <div className="grid grid-cols-12 auto-rows-[85px] gap-3 md:gap-4">
          
          {/* Product Manager - col 1-5, row 1-2 */}
          <BentoTile 
            className="col-span-12 md:col-span-5 row-span-2 bg-gradient-to-br from-[#374151] to-[#1f2937] p-6 flex flex-col justify-center"
            onClick={() => scrollToSection('#work')}
          >
            <h1 className="text-[26px] md:text-[28px] font-bold text-white mb-3 leading-tight">
              Product Manager
            </h1>
            <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed">
              Building 0 → 1 Products in Agentic & Conversational AI for Scalable CX and Support Automation
            </p>
          </BentoTile>

          {/* Years - col 6-7, row 1-2 */}
          <BentoTile 
            className="col-span-6 md:col-span-2 row-span-2 bg-[#E07A5F] p-4 flex flex-col items-center justify-center"
            onClick={() => scrollToSection('#experience')}
          >
            <span className="text-[48px] font-bold text-white leading-none">2+</span>
            <span className="text-white/90 text-[14px] mt-2">Years of</span>
            <span className="text-white/90 text-[14px]">Experience</span>
          </BentoTile>

          {/* Profile Photo - col 8-12, row 1-5 */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.015, y: -2, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('#about')}
            className="col-span-6 md:col-span-5 row-span-3 md:row-span-5 relative cursor-pointer overflow-hidden bg-[#d4d4d4]"
            style={{ borderRadius: '20px' }}
          >
            <img 
              src="/images/profile.png" 
              alt="Anannya Chuli"
              className="w-full h-full object-cover absolute inset-0"
              style={{ objectPosition: 'center 20%' }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 z-10">
              <h2 className="text-[26px] md:text-[30px] font-bold text-white">Anannya Chuli</h2>
            </div>
          </motion.div>

          {/* Arizona - col 1-2, row 3-4 */}
          <BentoTile 
            className="col-span-4 md:col-span-2 row-span-2 relative group"
            href="https://maps.google.com/?q=Phoenix,Arizona"
          >
            <img 
              src="/images/arizona.png" 
              alt="Arizona"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <MapPin size={14} />
                <span>Currently based in Phoenix, Arizona</span>
              </div>
            </div>
          </BentoTile>

          {/* Norton Genie - col 3-5, row 3-4 */}
          <BentoTile 
            className="col-span-8 md:col-span-3 row-span-2 relative group"
            href="https://us.norton.com/products/genie"
          >
            <img 
              src="/images/norton-genie.png" 
              alt="Norton Genie"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
              <p className="text-white text-xs md:text-sm font-medium text-center leading-relaxed">
                AI-Powered Scam Detection | Product I'm currently building
              </p>
            </div>
          </BentoTile>

          {/* Google Cloud - col 6-7, row 3-4 */}
          <BentoTile 
            className="col-span-6 md:col-span-2 row-span-2 relative group"
            href="https://cloud.google.com"
          >
            <img 
              src="/images/gcp.png" 
              alt="Google Cloud"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
              <p className="text-white text-xs md:text-sm font-medium text-center leading-relaxed">
                GCP & Cloud Architecture | Scalable infrastructure solutions
              </p>
            </div>
          </BentoTile>

          {/* Gen - col 1-2, row 5-6 */}
          <BentoTile 
            className="col-span-6 md:col-span-2 row-span-2 relative group"
            href="https://www.gendigital.com"
          >
            <img 
              src="/images/gen.png" 
              alt="Gen Digital"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
              <p className="text-white text-xs md:text-sm font-medium text-center leading-relaxed">
                Product Manager building AI-powered cybersecurity solutions
              </p>
            </div>
          </BentoTile>

          {/* Jio - col 3-5, row 5-6 */}
          <BentoTile 
            className="col-span-6 md:col-span-3 row-span-2 relative group"
            href="https://www.jio.com"
          >
            <img 
              src="/images/jio.png" 
              alt="Jio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
              <p className="text-white text-xs md:text-sm font-medium text-center leading-relaxed">
                Data Science & ML Intern | Built predictive models at scale
              </p>
            </div>
          </BentoTile>

          {/* Duke - col 6-7, row 5-6 */}
          <BentoTile 
            className="col-span-6 md:col-span-2 row-span-2 relative group"
            href="https://duke.edu"
          >
            <img 
              src="/images/duke.png" 
              alt="Duke University"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
              <p className="text-white text-xs md:text-sm font-medium text-center leading-relaxed">
                M.Eng in Engineering Management | Duke University '24
              </p>
            </div>
          </BentoTile>

          {/* Social Icons Container - matches profile width (5 cols) */}
          <div className="col-span-6 md:col-span-5 row-span-1 grid grid-cols-3 gap-3 md:gap-4 h-full">
            {/* Mail */}
            <BentoTile 
              className="bg-[#3b82f6] hover:bg-[#2563eb] flex items-center justify-center h-full"
              href="mailto:anannya.chuli@gmail.com"
            >
              <Mail className="text-white" size={24} />
            </BentoTile>

            {/* LinkedIn */}
            <BentoTile 
              className="bg-[#3b82f6] hover:bg-[#2563eb] flex items-center justify-center h-full"
              href="https://linkedin.com/in/ananyachuli"
            >
              <Linkedin className="text-white" size={24} />
            </BentoTile>

            {/* GitHub */}
            <BentoTile 
              className="bg-[#3b82f6] hover:bg-[#2563eb] flex items-center justify-center h-full"
              href="https://github.com/ananyachuli"
            >
              <Github className="text-white" size={24} />
            </BentoTile>
          </div>

          {/* LAST ROW: Resume + Figma + BigQuery + Cursor + Google ADK - all on same row */}
          
          {/* Download Resume */}
          <BentoTile 
            className="col-span-6 md:col-span-4 row-span-1 bg-[#E07A5F] hover:bg-[#d06a4f] flex items-center justify-center gap-2"
            href="/resume.pdf"
          >
            <Download className="text-white" size={18} />
            <span className="text-white font-semibold text-[15px]">Download My Resume</span>
          </BentoTile>

          {/* Figma */}
          <BentoTile 
            className="col-span-2 md:col-span-1 row-span-1 relative group"
            href="https://figma.com"
          >
            <img 
              src="/images/figma.png" 
              alt="Figma"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
              <p className="text-white text-[10px] md:text-xs font-medium text-center leading-tight">
                Design & Prototyping
              </p>
            </div>
          </BentoTile>

          {/* BigQuery */}
          <BentoTile 
            className="col-span-4 md:col-span-2 row-span-1 bg-white p-2 flex items-center justify-center shadow-sm border border-gray-100 relative group"
            href="https://cloud.google.com/bigquery"
          >
            <img 
              src="/images/bigquery.png" 
              alt="Google BigQuery"
              className="h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 rounded-[20px]">
              <p className="text-white text-[10px] md:text-xs font-medium text-center leading-tight">
                SQL & Data Analytics
              </p>
            </div>
          </BentoTile>

          {/* Cursor */}
          <BentoTile 
            className="col-span-6 md:col-span-2 row-span-1 relative group"
            href="https://cursor.sh"
          >
            <img 
              src="/images/cursor.png" 
              alt="Cursor"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
              <p className="text-white text-[10px] md:text-xs font-medium text-center leading-tight">
                AI-Assisted Development & Rapid Prototyping
              </p>
            </div>
          </BentoTile>

          {/* Google ADK */}
          <BentoTile 
            className="col-span-6 md:col-span-3 row-span-1 bg-white p-2 flex items-center justify-center shadow-sm border border-gray-100 relative group"
            href="https://google.github.io/adk-docs/"
          >
            <img 
              src="/images/google-adk.png" 
              alt="Google ADK"
              className="h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 rounded-[20px]">
              <p className="text-white text-[10px] md:text-xs font-medium text-center leading-tight">
                Agentic AI Frameworks & Intelligent Automation
              </p>
            </div>
          </BentoTile>

        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-10"
        >
          <button
            onClick={() => scrollToSection('#about')}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="text-sm font-medium tracking-wide">Explore My Work</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </motion.div>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
