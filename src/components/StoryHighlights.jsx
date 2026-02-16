import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Building2, Shield, BarChart3, Users, Cloud, 
  CreditCard, Smartphone, ShoppingCart, Sparkles, Database, Cpu
} from 'lucide-react';
import StoryModal from './StoryModal';
import { portfolioData } from '../data/portfolioData';

const categories = [
  { id: 'ai-ml', label: 'AI/ML', icon: Brain, color: '#fe6601' }, // Blaze Orange
  { id: 'b2b', label: 'B2B', icon: Building2, color: '#1d5191' }, // Matisse blue
  { id: 'security', label: 'Security', icon: Shield, color: '#86370e' }, // Korma brown
  { id: 'analytics', label: 'Analytics', icon: BarChart3, color: '#281e32' }, // Bleached Cedar
  { id: 'consumer', label: 'Consumer', icon: Users, color: '#ed9e67' }, // Porsche peachy
  { id: 'cloud', label: 'Cloud', icon: Cloud, color: '#1d5191' }, // Matisse blue
  { id: 'fintech', label: 'FinTech', icon: CreditCard, color: '#fe6601' }, // Blaze Orange
  { id: 'mobile', label: 'Mobile', icon: Smartphone, color: '#7a7979' }, // Boulder gray
  { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart, color: '#86370e' }, // Korma brown
  { id: 'growth', label: 'Growth', icon: Sparkles, color: '#ed9e67' }, // Porsche peachy
  { id: 'data', label: 'Data', icon: Database, color: '#281e32' }, // Bleached Cedar
  { id: 'automation', label: 'Automation', icon: Cpu, color: '#7a7979' }, // Boulder gray
];

// Map project tags to category IDs
const tagToCategoryMap = {
  'AI/ML': 'ai-ml',
  'B2B': 'b2b',
  'Security': 'security',
  'Analytics': 'analytics',
  'Consumer': 'consumer',
  'Cloud': 'cloud',
  'FinTech': 'fintech',
  'Mobile': 'mobile',
  'E-commerce': 'ecommerce',
  'Growth': 'growth',
  'Data': 'data',
  'Automation': 'automation',
  'Privacy': 'security',
  'Payments': 'fintech',
  'Personalization': 'ai-ml',
};

export default function StoryHighlights() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get all projects
  const allProjects = [
    ...(portfolioData.professionalWork || []).map(p => ({ ...p, type: 'professional' })),
    ...(portfolioData.research || []).map(p => ({ ...p, type: 'research' })),
    ...(portfolioData.academicProjects || []).map(p => ({ ...p, type: 'academic' })),
  ];

  // Get projects for a category
  const getProjectsForCategory = (categoryId) => {
    return allProjects.filter(project => {
      const tags = project.tags || project.skills || [];
      return tags.some(tag => tagToCategoryMap[tag] === categoryId);
    });
  };

  // Filter categories that have projects
  const activeCategories = categories.filter(cat => getProjectsForCategory(cat.id).length > 0);

  const handleCategoryClick = (category) => {
    const projects = getProjectsForCategory(category.id);
    if (projects.length > 0) {
      setSelectedCategory({ ...category, projects });
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <section className="py-4 bg-white">
        <div className="max-w-[935px] mx-auto px-4">
          {/* Scrollable Highlights */}
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {activeCategories.map((category, index) => {
              const Icon = category.icon;
              const projectCount = getProjectsForCategory(category.id).length;
              
              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCategoryClick(category)}
                  className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer"
                >
                  {/* Circle with full color fill */}
                  <div 
                    className="w-[77px] h-[77px] rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105"
                    style={{ 
                      backgroundColor: category.color
                    }}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  {/* Label */}
                  <span className="text-xs text-gray-900 font-normal truncate max-w-[77px]">
                    {category.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Modal */}
      <StoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={selectedCategory}
      />

      {/* Hide scrollbar styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
