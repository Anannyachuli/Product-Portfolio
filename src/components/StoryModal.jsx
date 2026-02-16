import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Building2, GraduationCap, FileText } from 'lucide-react';

export default function StoryModal({ isOpen, onClose, category }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const projects = category?.projects || [];

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
  }, [category]);

  // Auto-progress timer (like Instagram stories)
  useEffect(() => {
    if (!isOpen || projects.length === 0) return;

    const duration = 5000; // 5 seconds per story
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / duration) * 100);

      if (elapsed >= duration) {
        if (currentIndex < projects.length - 1) {
          setCurrentIndex(prev => prev + 1);
          elapsed = 0;
          setProgress(0);
        } else {
          onClose();
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, currentIndex, projects.length, onClose]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const goNext = useCallback(() => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, projects.length, onClose]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  if (!category || projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'professional': return Building2;
      case 'research': return FileText;
      case 'academic': return GraduationCap;
      default: return Building2;
    }
  };

  const TypeIcon = getTypeIcon(currentProject.type);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-50 p-2"
          >
            <X size={28} />
          </button>

          {/* Navigation arrows */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 z-50"
            >
              <ChevronLeft size={40} />
            </button>
          )}
          {currentIndex < projects.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 z-50"
            >
              <ChevronRight size={40} />
            </button>
          )}

          {/* Story Content */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] mx-4 bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden"
            style={{ aspectRatio: '9/16', maxHeight: '90vh' }}
          >
            {/* Progress bars */}
            <div className="absolute top-0 left-0 right-0 z-20 p-2 flex gap-1">
              {projects.map((_, index) => (
                <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-100"
                    style={{
                      width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Header */}
            <div className="absolute top-6 left-0 right-0 z-20 px-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon && <category.icon size={16} className="text-white" />}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{category.label}</p>
                  <p className="text-white/60 text-xs">{currentIndex + 1} of {projects.length}</p>
                </div>
              </div>
            </div>

            {/* Click areas for navigation */}
            <div className="absolute inset-0 z-10 flex">
              <div className="w-1/3 h-full cursor-pointer" onClick={goPrev} />
              <div className="w-1/3 h-full" />
              <div className="w-1/3 h-full cursor-pointer" onClick={goNext} />
            </div>

            {/* Project Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-6 pt-20">
              {/* Project Image/Icon */}
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <TypeIcon size={40} className="text-white/80" />
              </div>

              {/* Project Info */}
              <div className="text-center max-w-sm">
                <h3 className="text-white text-xl font-bold mb-2">
                  {currentProject.title}
                </h3>
                
                <p className="text-white/60 text-sm mb-4">
                  {currentProject.company || currentProject.venue || currentProject.university}
                  {currentProject.timeline && ` • ${currentProject.timeline}`}
                  {currentProject.year && ` • ${currentProject.year}`}
                </p>

                {/* Impact/Description */}
                {currentProject.impactLine && (
                  <div className="bg-white/10 rounded-xl p-4 mb-4">
                    <p className="text-[#E07A5F] font-semibold text-lg">
                      "{currentProject.impactLine}"
                    </p>
                  </div>
                )}

                {currentProject.abstract && (
                  <p className="text-white/70 text-sm line-clamp-3 mb-4">
                    {currentProject.abstract}
                  </p>
                )}

                {currentProject.description && (
                  <p className="text-white/70 text-sm line-clamp-3 mb-4">
                    {currentProject.description}
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {(currentProject.tags || currentProject.skills || []).slice(0, 4).map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/10 text-white/80 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Type Badge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1.5 bg-white/10 text-white/60 text-xs rounded-full capitalize">
                {currentProject.type} {currentProject.isInternship ? '• Internship' : ''}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
