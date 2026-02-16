import { motion } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';

export default function WorkCard({ project, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-primary-100 transition-all duration-300 cursor-pointer"
    >
      {/* Company Logo & Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
          <img
            src={project.logo}
            alt={project.company}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <Building2 
            size={20} 
            className="text-slate-400 hidden"
          />
        </div>
        {project.isInternship && (
          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            Internship
          </span>
        )}
      </div>

      {/* Title & Company */}
      <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-slate-500 mb-3">
        {project.company} • {project.role} • {project.timeline}
      </p>

      {/* Impact Line */}
      <div className="mb-4 py-3 px-4 bg-gradient-to-r from-primary-50 to-transparent rounded-lg">
        <p className="text-sm font-medium text-primary-700">
          "{project.impactLine}"
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-2 text-sm font-medium text-primary-600 group-hover:text-primary-700">
        View Case Study
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}
