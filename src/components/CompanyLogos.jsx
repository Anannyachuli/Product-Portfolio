import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export default function CompanyLogos() {
  const { companies } = portfolioData;
  
  // Triple the companies for seamless infinite loop
  const tripleCompanies = [...companies, ...companies, ...companies];

  return (
    <section className="py-16 bg-[#281e32] overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-200px * ${companies.length} - 4rem * ${companies.length}));
          }
        }
        .logo-track {
          animation: scroll 40s linear infinite;
        }
        .logo-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-[#ed9e67] text-sm font-semibold tracking-widest uppercase mb-3">
            Trusted By
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Companies I've Worked With
          </h2>
        </motion.div>
      </div>

      {/* Infinite Scrolling Logos */}
      <div className="relative">
        <div className="logo-track flex items-center gap-16">
          {tripleCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex-shrink-0"
            >
              <div className="w-[200px] h-[120px] flex items-center justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>
    </section>
  );
}
