import { useState } from 'react';
import Navbar from './components/Navbar';
import BentoHero from './components/BentoHero';
import CompanyLogos from './components/CompanyLogos';
import InstagramProfile from './components/InstagramProfile';
import StoryHighlights from './components/StoryHighlights';
import ProfileTabs from './components/ProfileTabs';
import ProjectGrid from './components/ProjectGrid';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Bento Hero - unchanged */}
        <BentoHero />
        
        {/* Company Logos Section */}
        <CompanyLogos />
        
        {/* Instagram-Style Profile Section */}
        <InstagramProfile />
        <StoryHighlights />
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <ProjectGrid activeTab={activeTab} />
        
        {/* Original sections - unchanged from here */}
        <Timeline />
        <Skills />
        <Education />
        <Contact />
      </main>
      </div>
  );
}

export default App;
