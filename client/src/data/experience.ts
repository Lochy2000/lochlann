import { 
  FaWordpress, 
  FaUsers, 
  FaChalkboardTeacher, 
  FaPenFancy, 
  FaClipboardList,
  FaHandsHelping,
  FaLaptopCode,
  FaFilm,
  FaBriefcase
} from 'react-icons/fa';

export const experiences = [
  {
    date: '02/2024 - PRESENT',
    title: 'Co-Founder & Web Designer',
    company: 'EasyWeb',
    description: 'Co-founded a web design studio supporting startups and small businesses. Have worked on / launched and designed various websites including HerEdge.club and frenticfocus.com. Specialized in modern, responsive, and SEO-optimized WordPress and custom-built sites.',
    skills: ['WordPress', 'Web Design', 'SEO', 'Client Management', 'Responsive Design'],
    icon: FaLaptopCode,
    iconColor: 'blue',
    keyPoints: [
      'Launched and designed multiple client websites',
      'Specialized in responsive design and SEO optimization',
      'Built strong client relationships through consultative approach'
    ]
  },
  {
    date: '11/2023 - PRESENT',
    title: 'Website Specialist',
    company: 'Parallax Cinematics',
    description: 'Manage and update websites for a creative media company. Work closely with clients to deliver visually compelling, goal-oriented web experiences.',
    skills: ['WordPress', 'UI/UX', 'Client Management', 'Content Strategy'],
    icon: FaFilm,
    iconColor: 'purple',
    keyPoints: [
      'Lead WordPress website updates and edits',
      'Collaborate with clients to achieve visual goals',
      'Optimize website performance and user experience'
    ]
  },
  {
    date: '10/2023 - PRESENT',
    title: 'Head Table Tennis Coach',
    company: 'St Mary\'s University',
    description: 'Run weekly coaching sessions with an emphasis on technique and communication. Developed inclusive and engaging coaching programs for students of all levels.',
    skills: ['Coaching', 'Communication', 'Leadership', 'Program Development'],
    icon: FaChalkboardTeacher,
    iconColor: 'green',
    keyPoints: [
      'Lead multiple weekly training sessions',
      'Focus on technique development and player improvement',
      'Create inclusive programs for all skill levels'
    ]
  },
  {
    date: '06/2023 - 08/2023',
    title: 'Marketing & Project Coordinator (Internship)',
    company: 'Blonde Ambitions',
    description: 'Created sponsorship decks and client outreach strategies. Improved communication skills through hands-on experience in marketing and networking.',
    skills: ['Marketing', 'Project Coordination', 'Client Outreach', 'Networking'],
    icon: FaBriefcase,
    iconColor: 'yellow',
    keyPoints: [
      'Developed sponsorship materials and outreach strategies',
      'Enhanced communication and networking skills',
      'Contributed to project planning and execution'
    ]
  },
  {
    date: '10/2021 - 05/2023',
    title: 'Peer Tutor',
    company: 'St Mary\'s University',
    description: 'Tutored first-year students in small groups both online and in person. Helped students improve their academic performance through tailored support.',
    skills: ['Teaching', 'Remote Work', 'Mentoring', 'Academic Support'],
    icon: FaUsers,
    iconColor: 'indigo',
    keyPoints: [
      'Provided academic support in both remote and in-person settings',
      'Tailored instruction to individual student needs',
      'Facilitated small group learning environments'
    ]
  },
  {
    date: '07/2022 - 09/2022',
    title: 'Digital Communications Intern',
    company: 'Spear Homeless Charity',
    description: 'Analyzed engagement across social media and newsletters. Presented data insights to help guide communications strategy.',
    skills: ['Social Media', 'Data Analysis', 'Communication Strategy', 'Non-profit'],
    icon: FaHandsHelping,
    iconColor: 'red',
    keyPoints: [
      'Analyzed social media and newsletter engagement',
      'Presented data-driven insights to leadership',
      'Contributed to communications strategy development'
    ]
  },
  {
    date: '12/2019 - 08/2021',
    title: 'Blog Editor & SEO Assistant',
    company: 'ParentingSuccess',
    description: 'Led SEO-focused content strategy and blog optimization. Boosted visibility through keyword-aligned, high-ranking content.',
    skills: ['SEO', 'Content Writing', 'Blogging', 'Digital Marketing'],
    icon: FaPenFancy,
    iconColor: 'cyan',
    keyPoints: [
      'Developed SEO-focused content strategy',
      'Optimized blog content for better search visibility',
      'Aligned content with keyword research and search intent'
    ]
  },
  {
    date: '09/2019 - 01/2020',
    title: 'Admin Assistant',
    company: 'RealNetworking',
    description: 'Supported local business networking events through general admin and logistics.',
    skills: ['Administration', 'Event Support', 'Organization', 'Business Networking'],
    icon: FaClipboardList,
    iconColor: 'gray',
    keyPoints: [
      'Provided administrative support for networking events',
      'Assisted with event logistics and coordination',
      'Facilitated business connections and networking opportunities'
    ]
  },
  {
    date: '06/2017 - 07/2017',
    title: 'Corporate Intern',
    company: 'Great Ormond Street Charity',
    description: 'Conducted administrative support and research into partnership opportunities.',
    skills: ['Research', 'Administration', 'Charitable Work', 'Partnership Development'],
    icon: FaHandsHelping,
    iconColor: 'pink',
    keyPoints: [
      'Researched potential partnership opportunities',
      'Provided administrative support to the corporate team',
      'Contributed to charitable initiatives and fundraising efforts'
    ]
  }
];

export const educationTimeline = [
  {
    date: '03/2024 - 03/2025',
    title: 'Software Development (Full Stack)',
    institution: 'Code Institute',
    description: 'Full stack development training with focus on modern web technologies, JavaScript, Python, and responsive design.',
    skills: ['JavaScript', 'Python', 'Full Stack Development', 'Web Design'],
    ongoing: true
  },
  {
    date: '2020 - 2023',
    title: 'Sport Science - 1st Class Honours',
    institution: 'St Mary\'s University, Twickenham',
    description: 'Graduated with First Class Honours, specializing in sports performance and coaching methodologies.',
    skills: ['Sports Science', 'Research', 'Performance Analysis', 'Academic Writing'],
    achievement: 'First Class Honours'
  },
  {
    date: '2019',
    title: 'Sports Science Program',
    institution: 'Nordjyllands Idrætshøjskole, Denmark',
    description: 'Specialized sports science program with focus on practical applications and international sports development.',
    skills: ['Sports Science', 'International Perspective', 'Practical Training'],
  },
  {
    date: '2018',
    title: 'Foundation in Business Management',
    institution: 'Brighton University',
    description: 'Foundational business management concepts, entrepreneurship, and marketing principles.',
    skills: ['Business Management', 'Entrepreneurship', 'Marketing'],
  }
];

export const certifications = [
  {
    title: 'Level 2 Table Tennis Coach',
    issuer: 'Table Tennis England',
    date: '2023',
    description: 'Professional coaching certification enabling structured table tennis coaching and player development.'
  },
  {
    title: 'Level 2 Wheelchair Rugby Coach',
    issuer: 'Wheelchair Rugby League Association',
    date: '2023',
    description: 'Specialized certification for adaptive sports coaching, focusing on inclusive rugby techniques.'
  },
  {
    title: 'PADI Open Water Diver',
    issuer: 'Professional Association of Diving Instructors',
    date: '2022',
    description: 'Certification for scuba diving up to 18 meters, covering safety protocols and underwater navigation.'
  },
  {
    title: 'Hackathon Winner (2x)',
    issuer: 'Various Tech Organizations',
    date: '2024-2025',
    description: 'Recognized for technical excellence and innovation in two competitive coding events.'
  }
];

export const milestones = [
  {
    year: '2025',
    title: 'Hackathon Success',
    description: 'Won second hackathon, building on a growing reputation for innovative solutions and technical expertise in rapid development environments.'
  },
  {
    year: '2024',
    title: 'EasyWeb Launch',
    description: 'Co-founded EasyWeb, a web design studio supporting startups and small businesses with modern, responsive, and SEO-optimized websites.'
  },
  {
    year: '2024',
    title: 'Full Stack Journey',
    description: 'Began journey to become a Full Stack Developer at Code Institute, building on existing web design skills to create comprehensive digital solutions.'
  },
  {
    year: '2023',
    title: 'First Class Honours',
    description: 'Graduated from St Mary\'s University with a First Class Honours in Sport Science, while serving as Table Tennis President and coach.'
  },
  {
    year: '2022',
    title: 'London Marathon',
    description: 'Completed the London Marathon, the first of two, demonstrating commitment, endurance, and dedication to personal challenges.'
  }
];
