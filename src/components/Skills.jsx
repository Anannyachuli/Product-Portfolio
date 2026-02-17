import { motion } from 'framer-motion';
import { Sparkles, Code, Wrench } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const skillCategories = [
  {
    key: 'product',
    title: 'Product Skills',
    icon: Sparkles,
    color: 'primary',
    bgColor: 'bg-primary-50',
    textColor: 'text-primary-600',
    borderColor: 'border-primary-100',
  },
  {
    key: 'technical',
    title: 'Technical Skills',
    icon: Code,
    color: 'emerald',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-100',
  },
  {
    key: 'tools',
    title: 'Tools & Platforms',
    icon: Wrench,
    color: 'violet',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-600',
    borderColor: 'border-violet-100',
  },
];

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Skills & Tools
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The competencies and tools I leverage to build great products.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            const categorySkills = skills[category.key] || [];

            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
                className={`bg-white rounded-2xl p-6 border ${category.borderColor} shadow-sm`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl ${category.bgColor} ${category.textColor}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {category.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        duration: 0.3,
                      }}
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${category.bgColor} ${category.textColor} cursor-default`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
