import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { personal } = portfolioData;

  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            About Me
          </h2>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <p className="text-lg text-slate-600 leading-relaxed">
              {personal.aboutShort}
            </p>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    {personal.aboutFull.split('\n\n').map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-slate-600 leading-relaxed mb-4 last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-6 inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors group"
            >
              {isExpanded ? 'Show less' : 'Read more about me'}
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={18} />
              </motion.span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
