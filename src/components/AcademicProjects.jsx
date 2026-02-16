import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import AcademicCard from './AcademicCard';

export default function AcademicProjects() {
  const { academicProjects } = portfolioData;

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Academic Projects
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            University coursework and case studies that shaped my analytical and technical skills.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {academicProjects.map((project, index) => (
            <AcademicCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
