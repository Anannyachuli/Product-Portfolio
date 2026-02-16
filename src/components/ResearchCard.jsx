import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';

export default function ResearchCard({ paper, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300"
    >
      {/* Icon & Year */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
          <FileText size={24} />
        </div>
        <span className="text-sm font-medium text-slate-400">
          {paper.year}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-900 mb-3 leading-snug">
        {paper.title}
      </h3>

      {/* Authors */}
      <p className="text-sm text-slate-500 mb-2">
        {paper.authors.join(', ')}
      </p>

      {/* Venue */}
      <p className="text-sm font-medium text-emerald-600 mb-4">
        {paper.venue}
      </p>

      {/* Abstract */}
      <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
        {paper.abstract}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {paper.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={paper.paperUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors group"
      >
        Read Paper
        <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </motion.div>
  );
}
