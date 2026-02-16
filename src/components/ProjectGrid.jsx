import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3X3, List, Building2, FileText, GraduationCap, ArrowRight } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { portfolioData } from '../data/portfolioData';

// Generate placeholder image based on project
const getProjectColor = (project, index) => {
  // Specific project color overrides
  if (project.title === 'E-commerce Price Optimization Model') {
    return '#bcbcbc'; // Silver
  }
  
  const colors = [
    '#fe6601', // Blaze Orange
    '#281e32', // Bleached Cedar (dark purple)
    '#1d5191', // Matisse (blue)
    '#86370e', // Korma (brown)
    '#ed9e67', // Porsche (peachy orange)
    '#7a7979', // Boulder (gray)
    '#bcbcbc', // Silver
    '#fe6601', // Blaze Orange
  ];
  return colors[index % colors.length];
};

const getTypeIcon = (type) => {
  switch (type) {
    case 'professional': return Building2;
    case 'research': return FileText;
    case 'academic': return GraduationCap;
    default: return Building2;
  }
};

export default function ProjectGrid({ activeTab }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'card'
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  // Get filter options based on tab
  const workCompanies = portfolioData.workCompanies || [];
  const academicInstitutions = portfolioData.academicInstitutions || [];

  // Get unique companies that have projects
  const companiesWithProjects = workCompanies.filter(company => 
    portfolioData.professionalWork?.some(p => p.companyId === company.id)
  );

  // Get unique institutions that have projects
  const institutionsWithProjects = academicInstitutions.filter(inst => 
    portfolioData.academicProjects?.some(p => p.institutionId === inst.id)
  );

  // Combine all projects with type labels
  const allProjects = [
    ...(portfolioData.professionalWork || []).map(p => ({ ...p, type: 'professional' })),
    ...(portfolioData.research || []).map(p => ({ ...p, type: 'research' })),
    ...(portfolioData.academicProjects || []).map(p => ({ ...p, type: 'academic' })),
  ];

  // Filter based on active tab
  let filteredProjects = activeTab === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.type === activeTab);

  // Additional filter by company (for Work tab)
  if (activeTab === 'professional' && selectedCompany) {
    filteredProjects = filteredProjects.filter(p => p.companyId === selectedCompany);
  }

  // Additional filter by institution (for Academic tab)
  if (activeTab === 'academic' && selectedInstitution) {
    filteredProjects = filteredProjects.filter(p => p.institutionId === selectedInstitution);
  }

  // Sort by year/timeline (most recent first)
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const yearA = parseInt(a.year || a.timeline?.split(' - ')[0] || '0');
    const yearB = parseInt(b.year || b.timeline?.split(' - ')[0] || '0');
    return yearB - yearA;
  });

  // Reset filters when tab changes
  const handleCompanySelect = (companyId) => {
    setSelectedCompany(selectedCompany === companyId ? null : companyId);
  };

  const handleInstitutionSelect = (institutionId) => {
    setSelectedInstitution(selectedInstitution === institutionId ? null : institutionId);
  };

  return (
    <section className="bg-white min-h-[400px] pb-12">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* View Toggle + Company/Institution Filters */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100 mb-4">
          {/* Left side - Company/Institution Logos (Circular) */}
          <div className="flex items-center gap-3">
            {activeTab === 'professional' && companiesWithProjects.length > 0 && (
              <>
                {companiesWithProjects.map((company) => (
                  <motion.button
                    key={company.id}
                    onClick={() => handleCompanySelect(company.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div 
                      className={`w-9 h-9 rounded-full overflow-hidden transition-all duration-200 ${
                        selectedCompany === company.id 
                          ? 'ring-2 ring-[#fe6601] ring-offset-2 shadow-md' 
                          : 'hover:shadow-sm'
                      }`}
                    >
                      <img 
                        src={company.logo} 
                        alt={company.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.button>
                ))}
                {selectedCompany && (
                  <button 
                    onClick={() => setSelectedCompany(null)}
                    className="text-xs text-gray-400 hover:text-gray-600 ml-1"
                  >
                    ✕
                  </button>
                )}
              </>
            )}

            {activeTab === 'academic' && institutionsWithProjects.length > 0 && (
              <>
                {institutionsWithProjects.map((institution) => (
                  <motion.button
                    key={institution.id}
                    onClick={() => handleInstitutionSelect(institution.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div 
                      className={`w-9 h-9 rounded-full overflow-hidden transition-all duration-200 ${
                        selectedInstitution === institution.id 
                          ? 'ring-2 ring-[#1d5191] ring-offset-2 shadow-md' 
                          : 'hover:shadow-sm'
                      }`}
                    >
                      <img 
                        src={institution.logo} 
                        alt={institution.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.button>
                ))}
                {selectedInstitution && (
                  <button 
                    onClick={() => setSelectedInstitution(null)}
                    className="text-xs text-gray-400 hover:text-gray-600 ml-1"
                  >
                    ✕
                  </button>
                )}
              </>
            )}

            {/* Empty div to maintain layout when no filters */}
            {activeTab !== 'professional' && activeTab !== 'academic' && <div />}
          </div>

          {/* Right side - View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid3X3 size={16} />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'card' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List size={16} />
              <span className="hidden sm:inline">Cards</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            /* Grid View - Instagram Style */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5"
            >
              {sortedProjects.map((project, index) => {
                const TypeIcon = getTypeIcon(project.type);
                const bgColor = getProjectColor(project, index);
                
                return (
                  <motion.div
                    key={project.id || index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedProject(project)}
                    className="aspect-square cursor-pointer relative group overflow-hidden rounded-sm md:rounded-lg"
                  >
                    {/* Solid Color Background */}
                    <div className="absolute inset-0" style={{ backgroundColor: bgColor }} />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2 md:p-4 text-center">
                      <TypeIcon size={24} className="text-white/80 mb-2 md:mb-3" />
                      <h3 className="text-white font-semibold text-[10px] md:text-sm line-clamp-2 leading-tight">
                        {project.title}
                      </h3>
                      {project.impactLine && (
                        <p className="text-white/70 text-[8px] md:text-xs mt-1 line-clamp-1 hidden md:block">
                          {project.impactLine}
                        </p>
                      )}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-medium">View Details</span>
                    </div>

                    {/* Type Badge */}
                    {project.isInternship && (
                      <div className="absolute top-1 right-1 md:top-2 md:right-2 px-1.5 py-0.5 bg-amber-500 text-white text-[8px] md:text-xs rounded font-medium">
                        Intern
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* Card View - Detailed Cards */
            <motion.div
              key="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {sortedProjects.map((project, index) => {
                const TypeIcon = getTypeIcon(project.type);
                
                return (
                  <motion.div
                    key={project.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedProject(project)}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all cursor-pointer group"
                  >
                    {/* Icon & Type Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                        <TypeIcon size={24} className="text-gray-400" />
                      </div>
                      <div className="flex gap-2">
                        {project.isInternship && (
                          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                            Internship
                          </span>
                        )}
                        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full capitalize">
                          {project.type}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {project.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-sm text-gray-500 mb-3">
                      {project.company || project.venue || project.university}
                      {(project.timeline || project.year) && (
                        <span> • {project.timeline || project.year}</span>
                      )}
                    </p>

                    {/* Impact Line */}
                    {project.impactLine && (
                      <div className="mb-3 py-2 px-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-700">
                          "{project.impactLine}"
                        </p>
                      </div>
                    )}

                    {/* Description/Abstract */}
                    {(project.description || project.abstract) && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {project.description || project.abstract}
                      </p>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(project.tags || project.skills || []).slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                      View Details
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
