export const portfolioData = {
  personal: {
    name: "Anannya Chuli",
    title: "Product Manager",
    company: "Gen Digital",
    tagline: "Building 0 → 1 Products in Agentic & Conversational AI for Scalable Customer Experience and Support Automation",
    photo: "/images/profile.png",
    email: "anannya.chuli@gmail.com",
    linkedin: "https://linkedin.com/in/ananyachuli",
    github: "https://github.com/ananyachuli",
    resume: "/resume.pdf",
    location: "Phoenix, Arizona",
    stats: [
      { label: "Years Experience", value: "2+" },
      { label: "Products Shipped", value: "8" },
      { label: "Users Impacted", value: "1M+" },
    ],
    aboutShort: "Product Manager with 2+ years of experience building impactful products across AI, data, and consumer tech. I thrive at the intersection of user needs, business goals, and technical possibilities.",
    aboutFull: `I'm a Product Manager currently at Gen Digital, where I lead product initiatives across AI and data-driven solutions. My journey spans startups in India and the US, as well as larger enterprises, giving me a unique perspective on building products at different scales.

With a Bachelor's in Computer Science and a Master's degree, I bring both technical depth and strategic thinking to every product I work on. I'm passionate about understanding user problems deeply and translating them into elegant, scalable solutions.

When I'm not building products, you'll find me exploring new technologies, reading about behavioral economics, or mentoring aspiring PMs.`,
  },

  companies: [
    { name: "Gen Digital", logo: "/images/gen.png", noCard: true },
    { name: "Jio", logo: "/images/jio.png", noCard: true },
    { name: "Ontribe", logo: "/images/Ontribe.png", noCard: true },
    { name: "Zenith", logo: "/images/Zenith.png" },
    { name: "Vidaksh", logo: "/images/vidaksh.png" },
    { name: "KYC Hub", logo: "/images/KYC Hub.png" },
    { name: "ThinkTankJr", logo: "/images/TTJ.png" },
    { name: "BrandAlive AI", logo: "/images/Brandaliveai.png", noCard: true },
  ],

  // Companies for Work filter
  workCompanies: [
    { id: "gen-digital", name: "Gen Digital", logo: "/images/gen.png" },
    { id: "jio", name: "Jio", logo: "/images/jio.png" },
    { id: "ontribe", name: "Ontribe", logo: "/images/Ontribe.png" },
    { id: "zenith", name: "Zenith", logo: "/images/Zenith.png" },
    { id: "vidaksh", name: "Vidaksh", logo: "/images/vidaksh.png" },
    { id: "kyc-hub", name: "KYC Hub", logo: "/images/KYC Hub.png" },
    { id: "thinktankjr", name: "ThinkTankJr", logo: "/images/TTJ.png" },
    { id: "brandalive", name: "BrandAlive AI", logo: "/images/Brandaliveai.png" },
  ],

  // Institutions for Academic filter
  academicInstitutions: [
    { id: "duke", name: "Duke University", logo: "/images/duke.png" },
    { id: "vit", name: "VIT University", logo: "/images/vit.jpeg" },
  ],

  professionalWork: [
    {
      id: 1,
      title: "AI-Powered Security Dashboard",
      company: "Gen Digital",
      companyId: "gen-digital",
      logo: "/images/gen.png",
      role: "Product Manager",
      timeline: "2024 - Present",
      isInternship: false,
      impactLine: "Reduced threat detection time by 60%",
      tags: ["AI/ML", "B2B", "Security"],
      description: "Led the development of an AI-powered dashboard that provides real-time threat intelligence and automated response recommendations.",
      fullStory: {
        context: "Enterprise customers were struggling with information overload from multiple security tools, leading to missed threats and slow response times.",
        role: "As the PM, I owned the entire product lifecycle from discovery to launch. Led a cross-functional team of 8 engineers, 2 designers, and collaborated with security researchers.",
        approach: "Conducted 30+ customer interviews to understand pain points. Used Jobs-to-be-Done framework to prioritize features. Implemented an agile sprint cycle with 2-week iterations.",
        impact: "Reduced mean time to detect threats by 60%. Achieved 40% increase in customer satisfaction scores. Generated $2M in new ARR within 6 months of launch.",
        learnings: "Learned the importance of involving customers early and often. Would have invested more in user education and onboarding from day one."
      }
    },
    {
      id: 2,
      title: "Consumer Identity Protection Platform",
      company: "Gen Digital",
      companyId: "gen-digital",
      logo: "/images/gen.png",
      role: "Product Manager",
      timeline: "2023 - 2024",
      isInternship: false,
      impactLine: "Grew user base by 150% YoY",
      tags: ["Consumer", "Growth", "Privacy"],
      description: "Revamped the consumer identity protection product, focusing on user experience and proactive protection features.",
      fullStory: {
        context: "The existing product had high churn rates and low engagement. Users found it confusing and didn't understand the value they were getting.",
        role: "Led product strategy and roadmap. Worked closely with UX research, engineering, and marketing teams.",
        approach: "Implemented a comprehensive user research program. Redesigned the onboarding flow based on behavioral insights. Introduced gamification elements to drive engagement.",
        impact: "150% YoY user growth. Reduced churn by 35%. NPS increased from 32 to 58.",
        learnings: "Simplicity wins. Users don't need more features—they need fewer, better-designed ones that solve their core problems."
      }
    },
    {
      id: 3,
      title: "Data Analytics Platform",
      company: "Jio",
      companyId: "jio",
      logo: "/images/jio.png",
      role: "Product Manager Intern",
      timeline: "Summer 2022",
      isInternship: true,
      impactLine: "Built MVP that secured Series A funding",
      tags: ["Data", "B2B", "Analytics"],
      description: "Developed the MVP for a self-service analytics platform targeting SMBs who couldn't afford enterprise BI tools.",
      fullStory: {
        context: "Small businesses were relying on spreadsheets and manual processes for data analysis, limiting their growth potential.",
        role: "Sole PM intern responsible for market research, feature prioritization, and working with the founding team.",
        approach: "Conducted competitive analysis of 15+ tools. Interviewed 25 SMB owners. Created a phased MVP roadmap focusing on core analytics needs.",
        impact: "MVP launched in 10 weeks. Helped secure $5M Series A. Acquired 50 beta customers.",
        learnings: "Speed matters in startups. Learned to make decisions with incomplete information and iterate quickly."
      }
    },
    {
      id: 4,
      title: "Mobile Payment Integration",
      company: "KYC Hub",
      companyId: "kyc-hub",
      logo: "/images/KYC Hub.png",
      role: "Associate Product Manager",
      timeline: "2021 - 2022",
      isInternship: false,
      impactLine: "Processed $50M+ in transactions",
      tags: ["FinTech", "Mobile", "Payments"],
      description: "Led the integration of UPI and other payment methods into the company's merchant app ecosystem.",
      fullStory: {
        context: "Merchants needed a unified payment solution that worked across multiple payment methods without technical complexity.",
        role: "Owned the payments vertical. Coordinated with banking partners, compliance teams, and engineering.",
        approach: "Created detailed API specifications. Built strong relationships with payment partners. Implemented a staged rollout strategy.",
        impact: "Processed $50M+ in first year. Onboarded 5,000+ merchants. 99.9% uptime achieved.",
        learnings: "In regulated industries, compliance isn't a blocker—it's a feature. Early engagement with legal and compliance saves time."
      }
    },
    {
      id: 5,
      title: "Recommendation Engine Optimization",
      company: "Ontribe",
      companyId: "ontribe",
      logo: "/images/Ontribe.png",
      role: "Product Intern",
      timeline: "Summer 2021",
      isInternship: true,
      impactLine: "Improved conversion rate by 25%",
      tags: ["AI/ML", "E-commerce", "Personalization"],
      description: "Worked on improving the product recommendation engine using collaborative filtering and user behavior analysis.",
      fullStory: {
        context: "The existing recommendation system was rule-based and wasn't driving meaningful conversions.",
        role: "Worked with the data science team to define product requirements and success metrics.",
        approach: "A/B tested multiple recommendation algorithms. Implemented real-time personalization based on browsing behavior.",
        impact: "25% improvement in conversion rate. 40% increase in average order value. Recommendations drove 30% of total revenue.",
        learnings: "Data-driven decisions require good data. Invested significant time in data quality before optimization."
      }
    },
  ],

  research: [
    {
      id: 1,
      title: "Machine Learning Approaches for Cybersecurity Threat Detection",
      authors: ["Your Name", "Dr. Jane Smith", "Prof. John Doe"],
      venue: "IEEE International Conference on Machine Learning and Applications",
      year: "2023",
      abstract: "This paper presents a novel approach to detecting cybersecurity threats using ensemble machine learning methods. Our model achieves 94% accuracy on the benchmark dataset, outperforming existing solutions by 12%.",
      tags: ["AI/ML", "Security", "Data"],
      paperUrl: "#",
    },
    {
      id: 2,
      title: "Natural Language Processing for Customer Support Automation",
      authors: ["Your Name", "Alex Johnson"],
      venue: "ACL Workshop on NLP Applications",
      year: "2022",
      abstract: "We explore the application of transformer-based models for automating customer support ticket classification and routing. Our system reduces average response time by 45%.",
      tags: ["AI/ML", "Automation", "Consumer"],
      paperUrl: "#",
    },
    {
      id: 3,
      title: "Predictive Analytics in Healthcare: A Systematic Review",
      authors: ["Your Name", "Dr. Sarah Williams"],
      venue: "Journal of Healthcare Informatics Research",
      year: "2021",
      abstract: "A comprehensive review of predictive analytics applications in healthcare, covering 150+ papers from 2015-2021. We identify key trends, challenges, and future research directions.",
      tags: ["Analytics", "Data", "AI/ML"],
      paperUrl: "#",
    },
  ],

  academicProjects: [
    {
      id: 1,
      title: "Smart Campus Navigation System",
      course: "Software Engineering",
      university: "Duke University",
      institutionId: "duke",
      year: "2025",
      description: "Built a real-time indoor navigation system for campus buildings using BLE beacons and computer vision. The app helped students find classrooms and facilities efficiently.",
      skills: ["Mobile", "AI/ML", "Consumer"],
      details: {
        problem: "Students and visitors struggled to navigate large campus buildings, especially during orientation week.",
        solution: "Developed a mobile app with indoor positioning using BLE beacons and AR-based directions.",
        outcome: "Won Best Project award. App was adopted by the university for official use.",
      }
    },
    {
      id: 2,
      title: "E-commerce Price Optimization Model",
      course: "Machine Learning",
      university: "Duke University",
      institutionId: "duke",
      year: "2024",
      description: "Developed a dynamic pricing model for e-commerce platforms using reinforcement learning to maximize revenue while maintaining competitive prices.",
      skills: ["AI/ML", "E-commerce", "Data"],
      details: {
        problem: "Static pricing strategies fail to capture market dynamics and competitor movements.",
        solution: "Implemented a Q-learning based pricing agent that adapts to market conditions in real-time.",
        outcome: "Model showed 15% revenue improvement in simulation compared to static pricing.",
      }
    },
    {
      id: 3,
      title: "Social Media Sentiment Analysis Dashboard",
      course: "Data Mining",
      university: "VIT University",
      institutionId: "vit",
      year: "2023",
      description: "Created a real-time dashboard for analyzing brand sentiment across Twitter and Reddit using NLP techniques.",
      skills: ["Analytics", "AI/ML", "Consumer"],
      details: {
        problem: "Brands lack real-time visibility into public sentiment during product launches or crises.",
        solution: "Built a streaming pipeline that processes social media posts and visualizes sentiment trends.",
        outcome: "Dashboard processed 10,000+ posts/hour with 87% sentiment classification accuracy.",
      }
    },
    {
      id: 4,
      title: "Supply Chain Optimization Case Study",
      course: "Operations Management",
      university: "VIT University",
      institutionId: "vit",
      year: "2022",
      description: "Analyzed and optimized the supply chain of a mid-sized manufacturing company, reducing costs and improving delivery times.",
      skills: ["Analytics", "B2B", "Data"],
      details: {
        problem: "Company faced frequent stockouts and high inventory carrying costs.",
        solution: "Implemented EOQ model with safety stock optimization and supplier diversification strategy.",
        outcome: "Recommendations projected to save $500K annually and reduce stockouts by 60%.",
      }
    },
  ],

  experience: [
    {
      id: 1,
      company: "Gen Digital",
      role: "Product Manager",
      location: "United States",
      timeline: "2023 - Present",
      type: "full-time",
      highlights: [
        "Led AI-powered security dashboard from 0 to 1",
        "Drove 150% YoY growth for consumer identity product",
        "Managed cross-functional team of 12",
      ],
    },
    {
      id: 2,
      company: "FinTech Corp",
      role: "Associate Product Manager",
      location: "India",
      timeline: "2021 - 2022",
      type: "full-time",
      highlights: [
        "Owned payments vertical processing $50M+",
        "Onboarded 5,000+ merchants",
        "Built partnerships with major banks",
      ],
    },
    {
      id: 3,
      company: "Startup XYZ",
      role: "Product Manager Intern",
      location: "United States",
      timeline: "Summer 2022",
      type: "internship",
      highlights: [
        "Built MVP in 10 weeks",
        "Conducted 25+ customer interviews",
        "Helped secure Series A funding",
      ],
    },
    {
      id: 4,
      company: "E-commerce Startup",
      role: "Product Intern",
      location: "India",
      timeline: "Summer 2021",
      type: "internship",
      highlights: [
        "Improved recommendation engine conversion by 25%",
        "Worked with data science team on ML models",
        "Drove 30% of revenue through recommendations",
      ],
    },
  ],

  skills: {
    product: [
      "Product Strategy",
      "Roadmap Planning",
      "User Research",
      "A/B Testing",
      "Agile/Scrum",
      "PRDs & Specs",
      "Go-to-Market",
      "Stakeholder Management",
    ],
    technical: [
      "SQL",
      "Python",
      "Data Analysis",
      "APIs",
      "System Design",
      "Machine Learning Basics",
    ],
    tools: [
      "Figma",
      "Jira",
      "Amplitude",
      "Mixpanel",
      "Tableau",
      "Notion",
      "Confluence",
      "Miro",
    ],
  },

  education: [
    {
      degree: "Master of Science",
      field: "Information Systems",
      university: "University Name",
      location: "United States",
      year: "2023",
      highlights: ["GPA: 3.9/4.0", "Product Management Club President", "Graduate Teaching Assistant"],
    },
    {
      degree: "Bachelor of Technology",
      field: "Computer Science",
      university: "University Name",
      location: "India",
      year: "2021",
      highlights: ["First Class with Distinction", "Published 2 research papers", "Hackathon Winner"],
    },
  ],
};
