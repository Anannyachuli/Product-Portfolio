import { motion } from 'framer-motion';
import { LayoutGrid, Briefcase, BookOpen, GraduationCap } from 'lucide-react';

const tabs = [
  { id: 'all', label: 'All', icon: LayoutGrid },
  { id: 'professional', label: 'Work', icon: Briefcase },
  { id: 'research', label: 'Research', icon: BookOpen },
  { id: 'academic', label: 'Academic', icon: GraduationCap },
];

export default function ProfileTabs({ activeTab, onTabChange }) {
  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="max-w-[935px] mx-auto">
        <div className="flex justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive 
                    ? 'text-gray-900' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon size={12} />
                <span className="hidden sm:inline">{tab.label}</span>
                
                {/* Active indicator line */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 left-0 right-0 h-[1px] bg-gray-900"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
