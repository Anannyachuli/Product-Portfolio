import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ChevronDown, Target, Lightbulb, Trophy } from 'lucide-react';

export default function AcademicCard({ project, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        {/* Icon & Year */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-violet-50 rounded-xl text-violet-600">
            <GraduationCap size={24} />
          </div>
          <span className="text-sm font-medium text-slate-400">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          {project.title}
        </h3>

        {/* Course & University */}
        <p className="text-sm text-violet-600 font-medium mb-1">
          {project.course}
        </p>
        <p className="text-sm text-slate-500 mb-4">
          {project.university}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs font-medium text-violet-600 bg-violet-50 px-2.5 py-1 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Expand Button */}
        {project.details && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
          >
            {isExpanded ? 'Hide Details' : 'View Details'}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={16} />
            </motion.span>
          </button>
        )}
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && project.details && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 space-y-4 border-t border-slate-100">
              {/* Problem */}
              {project.details.problem && (
                <div className="flex gap-3">
                  <div className="p-1.5 bg-red-50 rounded-lg text-red-500 h-fit">
                    <Target size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                      Problem
                    </p>
                    <p className="text-sm text-slate-600">
                      {project.details.problem}
                    </p>
                  </div>
                </div>
              )}

              {/* Solution */}
              {project.details.solution && (
                <div className="flex gap-3">
                  <div className="p-1.5 bg-blue-50 rounded-lg text-blue-500 h-fit">
                    <Lightbulb size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                      Solution
                    </p>
                    <p className="text-sm text-slate-600">
                      {project.details.solution}
                    </p>
                  </div>
                </div>
              )}

              {/* Outcome */}
              {project.details.outcome && (
                <div className="flex gap-3">
                  <div className="p-1.5 bg-green-50 rounded-lg text-green-500 h-fit">
                    <Trophy size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                      Outcome
                    </p>
                    <p className="text-sm text-slate-600">
                      {project.details.outcome}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
