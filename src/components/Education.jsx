import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Education
          </h2>
          <p className="text-lg text-slate-600">
            Academic foundation that shaped my analytical thinking.
          </p>
        </motion.div>

        {/* Education Cards */}
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon */}
                <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl text-primary-600 self-start">
                  <GraduationCap size={32} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {edu.degree}
                      </h3>
                      <p className="text-primary-600 font-medium">
                        {edu.field}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full self-start">
                      {edu.year}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <GraduationCap size={14} />
                      {edu.university}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {edu.location}
                    </span>
                  </div>

                  {/* Highlights */}
                  {edu.highlights && edu.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                      {edu.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg"
                        >
                          <Award size={14} className="text-amber-500" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
