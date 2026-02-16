import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import ResearchCard from './ResearchCard';

export default function Research() {
  const { research } = portfolioData;

  return (
    <section id="research" className="py-24 bg-slate-50">
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
            Research & Publications
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            Academic research and papers I've contributed to during my studies.
          </p>
        </motion.div>

        {/* Research Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {research.map((paper, index) => (
            <ResearchCard key={paper.id} paper={paper} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
