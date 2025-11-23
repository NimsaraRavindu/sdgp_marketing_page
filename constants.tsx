
import React from 'react';
const Abinash = "/assets/Abinash.png";

export const LogoIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-green">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const FEATURES = [
  {
    title: 'AI-Agentic Framework',
    description: 'Leverage agentic AI and machine learning for automated meeting bookings and algorithmic content generation based on user preferences.',
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Smart Sponsorship Filtering',
    description: 'Utilize content-based filtering to match sponsors with events that meet their requirements and help communities find ideal partners.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
    ),
  },
  {
    title: 'Integrated Society Calendar',
    description: 'A unified calendar system allowing societies in the same institution to view upcoming events and coordinate schedules effectively.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Proposal Chat System',
    description: 'Streamline communication with an integrated chat feature specifically designed for proposal posting, reviewing, and negotiation.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Volunteer Portfolio',
    description: 'Build a professional profile that compiles your volunteer history and contributions, showcasing your impact to the community.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .884-.896 1.608-2 1.608-1.104 0-2-.724-2-1.608" />
      </svg>
    ),
  },
  {
    title: 'Sponsor Leaderboard',
    description: 'Increase visibility and gamify sponsorship with a leaderboard tracking the most active companies and their contributions.',
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export const CATEGORIES = [
  {
    id: 'sports',
    title: 'Sports',
    description: 'Discover a range of exciting sports events on campus. Promoting teamwork, energy, and healthy competition.',
    bgImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=2070',
    mainImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1000',
    subImage: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'technical',
    title: 'Technical',
    description: 'Explore innovative technical events that spark creativity and problem solving. From coding challenges to tech workshops.',
    bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
    mainImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
    subImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'cultural',
    title: 'Cultural',
    description: 'Celebrate creativity and diversity through vibrant cultural events. From performances to festivals, experience expressions from every community.',
    bgImage: 'https://images.unsplash.com/photo-1459749411177-0473ef716089?auto=format&fit=crop&q=80&w=2070',
    mainImage: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=1000',
    subImage: 'https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'social',
    title: 'Social',
    description: 'Connect, interact, and build memories through fun social events. From mixers to community gatherings, there’s something for everyone.',
    bgImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=2070',
    mainImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000',
    subImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'volunteering',
    title: 'Volunteering',
    description: 'Make a positive impact through meaningful volunteering events. Support communities, build empathy, and develop leadership skills.',
    bgImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=2070',
    mainImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000',
    subImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1000',
  },
];


export const TEAM_MEMBERS = [
    {
        name: 'Alex Johnson',
        title: 'CEO & Founder',
        imageUrl: '/assets/Abinash.png', 
    },
    {
        name: 'Maria Garcia',
        title: 'Chief Technology Officer',
        imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    {
        name: 'James Smith',
        title: 'Lead Product Designer',
        imageUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    },
    {
        name: 'Priya Patel',
        title: 'Head of Community',
        imageUrl: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    },
    {
        name: 'Chen Wang',
        title: 'Senior Backend Engineer',
        imageUrl: 'https://i.pravatar.cc/150?u=a092581f4e29026700d',
    },
    {
        name: 'Fatima Ahmed',
        title: 'Marketing Director',
        imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    },
];

export const STATS_DATA = [
  { value: '10k+', label: 'Active Users' },
  { value: '500+', label: 'Communities' },
  { value: '1,200+', label: 'Events Hosted' },
  { value: '$2M+', label: 'Sponsorships Raised' },
];

export const HOW_IT_WORKS = {
  volunteers: [
    {
      step: 1,
      title: "Create Profile",
      desc: "Sign up and personalize your interests to see relevant opportunities.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      )
    },
    {
      step: 2,
      title: "Discover & Join",
      desc: "Browse events, clubs, and causes. One-click apply to volunteer.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      )
    },
    {
      step: 3,
      title: "Track Impact",
      desc: "Log your hours, earn certificates, and build your social portfolio.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      )
    }
  ],
  communities: [
    {
      step: 1,
      title: "Register Organization",
      desc: "Verify your club, society, or NGO to unlock organizer tools.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
      )
    },
    {
      step: 2,
      title: "Post & Manage",
      desc: "Create events, manage volunteer shifts, and track attendance.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
      )
    },
    {
      step: 3,
      title: "Get Sponsored",
      desc: "Showcase your events to top companies and secure funding easily.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      )
    }
  ],
  sponsors: [
    {
      step: 1,
      title: "Setup Brand Profile",
      desc: "Define your CSR goals, target audience, and budget preferences.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      )
    },
    {
      step: 2,
      title: "AI Matching",
      desc: "Our algorithm suggests high-impact events that align with your brand.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
      )
    },
    {
      step: 3,
      title: "Engage & Analyze",
      desc: "Connect with organizers, approve proposals, and view ROI reports.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
      )
    }
  ]
};

export const TESTIMONIALS = [
  {
    quote: "Linkara completely transformed how our university club manages events. We found a sponsor in less than a week!",
    author: "Sarah Jenkins",
    role: "President, Tech Society",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026012d"
  },
  {
    quote: "As a student looking to volunteer, the one-click application is a game changer. I've joined 3 awesome projects.",
    author: "David Chen",
    role: "Volunteer",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026034d"
  },
  {
    quote: "The AI matching feature saved us hours of searching. We connected with events that perfectly matched our CSR goals.",
    author: "Elena Rodriguez",
    role: "Marketing Lead, GreenCorp",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026056d"
  }
];

export const GLOBE_DATA = [
    { lat: 40.7128, lng: -74.0060, name: "New York", type: "sponsor" },
    { lat: 51.5074, lng: -0.1278, name: "London", type: "event" },
    { lat: 35.6762, lng: 139.6503, name: "Tokyo", type: "volunteer" },
    { lat: -33.8688, lng: 151.2093, name: "Sydney", type: "sponsor" },
    { lat: 19.0760, lng: 72.8777, name: "Mumbai", type: "event" },
    { lat: 55.7558, lng: 37.6173, name: "Moscow", type: "volunteer" },
    { lat: -23.5505, lng: -46.6333, name: "São Paulo", type: "event" },
    { lat: 30.0444, lng: 31.2357, name: "Cairo", type: "sponsor" },
    { lat: 6.9271, lng: 79.8612, name: "Colombo", type: "event" },
    { lat: 1.3521, lng: 103.8198, name: "Singapore", type: "sponsor" },
    { lat: 48.8566, lng: 2.3522, name: "Paris", type: "volunteer" },
    { lat: 37.7749, lng: -122.4194, name: "San Francisco", type: "sponsor" },
    { lat: -26.2041, lng: 28.0473, name: "Johannesburg", type: "event" },
    { lat: 25.2048, lng: 55.2708, name: "Dubai", type: "volunteer" },
];

export const MapPinIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const EnvelopeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

export const PhoneIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
);

export const FacebookIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
);

export const TwitterIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
);

export const LinkedInIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path></svg>
);

export const FigmaIcon: React.FC = () => (
    <svg className="w-8 h-8" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 57C14.7467 57 19 52.7467 19 47.5V28.5H9.5C4.25329 28.5 0 32.7533 0 38C0 43.2467 4.25329 47.5 9.5 47.5V57Z" fill="#0ACF83"/>
        <path d="M0 19C0 13.7533 4.25329 9.5 9.5 9.5H19V28.5H9.5C4.25329 28.5 0 24.2467 0 19Z" fill="#A259FF"/>
        <path d="M0 9.5C0 4.25329 4.25329 0 9.5 0H19V9.5H0V9.5Z" fill="#F24E1E"/>
        <path d="M19 0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262"/>
        <path d="M38 28.5C38 33.7467 33.7467 38 28.5 38H19V19H28.5C33.7467 19 38 23.2533 38 28.5Z" fill="#1ABCFE"/>
    </svg>
);

export const RocketLaunchIcon: React.FC = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
);

export const SURVEY_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeRcTAC-8abF9C3qEaaZruZs2-wu8vZvPWsyHC5W6cwn6GIgw/viewform?usp=dialog";
