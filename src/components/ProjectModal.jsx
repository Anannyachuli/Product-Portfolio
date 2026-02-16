import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, Target, User, Compass, TrendingUp, Lightbulb, FileText, GraduationCap, ExternalLink } from 'lucide-react';

const sections = [
  { key: 'context', label: 'Context', icon: Target, description: 'The problem or opportunity' },
  { key: 'role', label: 'My Role', icon: User, description: 'What I owned' },
  { key: 'approach', label: 'Approach', icon: Compass, description: 'How I tackled it' },
  { key: 'impact', label: 'Impact', icon: TrendingUp, description: 'Metrics & outcomes' },
  { key: 'learnings', label: 'Learnings', icon: Lightbulb, description: 'What I learned' },
];

const academicSections = [
  { key: 'problem', label: 'Problem', icon: Target, description: 'The challenge addressed' },
  { key: 'solution', label: 'Solution', icon: Compass, description: 'How it was solved' },
  { key: 'outcome', label: 'Outcome', icon: TrendingUp, description: 'Results achieved' },
];

export default function ProjectModal({ project, isOpen, onClose }) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  // Determine project type and icon
  const isResearch = project.type === 'research' || project.authors;
  const isAcademic = project.type === 'academic' || project.course;
  const isProfessional = !isResearch && !isAcademic;

  const TypeIcon = isResearch ? FileText : isAcademic ? GraduationCap : Building2;

  // Get tags (research uses tags, academic uses skills)
  const tags = project.tags || project.skills || [];

  // Get subtitle info
  const getSubtitle = () => {
    if (isResearch) {
      return `${project.venue} • ${project.year}`;
    }
    if (isAcademic) {
      return `${project.course} • ${project.university} • ${project.year}`;
    }
    return `${project.company} • ${project.role} • ${project.timeline}`;
  };

  // Get the right sections to display
  const getSections = () => {
    if (isAcademic && project.details) {
      return academicSections;
    }
    if (isProfessional && project.fullStory) {
      return sections;
    }
    return [];
  };

  // Get section content
  const getSectionContent = (key) => {
    if (isAcademic && project.details) {
      return project.details[key];
    }
    if (isProfessional && project.fullStory) {
      return project.fullStory[key];
    }
    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 md:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                  {project.logo ? (
                    <img
                      src={project.logo}
                      alt={project.company || project.venue || project.university}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <TypeIcon size={24} className="text-slate-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                      {project.title}
                    </h2>
                    {project.isInternship && (
                      <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                        Internship
                      </span>
                    )}
                    {isResearch && (
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                        Research
                      </span>
                    )}
                    {isAcademic && (
                      <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                        Academic
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500">{getSubtitle()}</p>
                  
                  {/* Authors for research papers */}
                  {isResearch && project.authors && (
                    <p className="text-sm text-slate-400 mt-1">
                      {project.authors.join(', ')}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {/* Impact Banner (for professional projects) */}
              {project.impactLine && (
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 via-blue-50/50 to-transparent rounded-xl border border-blue-100">
                  <p className="text-sm font-medium text-blue-600 mb-1">Key Impact</p>
                  <p className="text-xl md:text-2xl font-semibold text-blue-700">
                    "{project.impactLine}"
                  </p>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description / Abstract */}
              {(project.description || project.abstract) && (
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  {project.description || project.abstract}
                </p>
              )}

              {/* Paper Link for research */}
              {isResearch && project.paperUrl && project.paperUrl !== '#' && (
                <a
                  href={project.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-8"
                >
                  <FileText size={18} />
                  Read Paper
                  <ExternalLink size={14} />
                </a>
              )}

              {/* Case Study / Details Sections */}
              {getSections().length > 0 && (
                <div className="space-y-8">
                  {getSections().map(({ key, label, icon: Icon, description }) => {
                    const content = getSectionContent(key);
                    if (!content) return null;

                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: getSections().findIndex(s => s.key === key) * 0.1 }}
                        className="group"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                            <Icon size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{label}</h3>
                            <p className="text-xs text-slate-400">{description}</p>
                          </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed pl-12">
                          {content}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 border-t border-slate-100 bg-slate-50">
              <button
                onClick={onClose}
                className="w-full md:w-auto px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
