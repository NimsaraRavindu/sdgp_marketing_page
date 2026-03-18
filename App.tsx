import React, { useEffect, useState } from 'react';
import World from './components/World';

type Role = 'volunteers' | 'communities' | 'sponsors';

const logoUrl = new URL('./assets/Photos/Logo.png', import.meta.url).href;
const aaqibUrl = new URL('./assets/Photos/Aaqib.jpeg', import.meta.url).href;
const nimsaraUrl = new URL('./assets/Photos/Nimsara.jpg', import.meta.url).href;
const abinashUrl = new URL('./assets/Photos/Abinash.png', import.meta.url).href;
const saiUrl = new URL('./assets/Photos/Sai.jpeg', import.meta.url).href;
const araniUrl = new URL('./assets/Photos/Arani.jpeg', import.meta.url).href;
const tharusiyaaUrl = new URL('./assets/Photos/Tharusiyaa.jpeg', import.meta.url).href;
const platformVideoUrl = new URL('./assets/videos/Project_Linkara_Blueprint.mp4', import.meta.url).href;
const heroImageUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCD4A4R2aSZCYqdqRHC6SZ9ZhcDk4JV_z5KwpSVpqOCD_gkc99BMrOlFG7dHFvNQEM7ON0JDgOI6LJMi4xbbsURSuaxqMvRBJwXvv_giYEQzwD4nqDezxPd4G-BPEVievvmUbRKNNUmyJHGz3wSP7LMK785tz_B3KlQz3941eb4tHt_BOB_MyZOMk-GmVykAYvmyoFoRYoQ-JzkDaemmYF6yzzKHW5PUjA01LBiPivO5ITix6YD_SVVEBf5Mr5DayP5QzWEZzX38Ms';
const prototypeUrl = 'https://www.figma.com/proto/your-figma-link-here';
const loginUrl = 'https://sdgp-eight.vercel.app/';

const stories = [
  {
    quote: '"Linkara transformed how our student society manages sponsorships. We found three corporate partners in just two weeks!"',
    name: 'Alex Johnson',
    role: 'Student Leader',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJciCuqciIZ6sHHyyx-h0B4YviC17u8IZZh-n09BxYMf3LEQpTOwohCfdWkn_g_cgfxa_p_egyaCTnUrvmmcgIyBPnPFdm-CXnJD6jSZCeb8utR1VlbpbhTj4RHqZWjgqjCODXebfY5za5zbpLnpFBbNCQenbQwzOQDYi_dU__rJc7K8zKF6Op8XX63sN7xDBgzNJQI1-28WLZPRm58MkJ2tNJW1kU5jeawXpXxhPWJyRJLTEsunyCXWExkxCCKqZpY5VRnvDk45k',
  },
  {
    quote: '"I\'ve always wanted to volunteer but never knew where to start. The AI match system suggested exactly what I was looking for."',
    name: 'Sarah Chen',
    role: 'Active Volunteer',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQoo8m1gSHAKhdn6TeEKHaFK9I7quTod20VP8bQ5QslLV3Vw4uMJlssZMngWMdcldXYGA5fixKlzeej_YDAOKqPxuOnEtkb0CpAfmEBzqC8qzs5KrTTXVvy0JgeAFJpyNpgIxIdrGCTMpbGl2o0agjFtoI54Xmnw1qcDYGA_2OyWqmGkM0KdNHpLIdCwo8x585eXGfEoC_lXsY1nkOJ6Ggz44TIjkPSyLjwYdpw8inzrTevmo460BY6Dto5mk7nXlHnZI3SgA4U3U',
  },
  {
    quote: '"Seeing our brand associated with such impactful community events has done wonders for our CSR reporting and team morale."',
    name: 'Michael Ross',
    role: 'Corporate Sponsor',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAho1ESukXn0wD8sswFLvxES3WpYZbGiy09RNOfsC57r6252cn7GOE_aPjWrT1NVslqYQMQrNarEdv5D8CvJdSUCg8Ozwxr3g3zss482ShzMntp-gAwLlI0chh0wDFcF5Z3TxJZOd_JE6K1C_Fts6NfFAIZWYjqLH_y450xo4yPOPEBAWS3vhmU4bdROrZF6UWZhK5hi0I5LFBV_jMB_jMaf4IPAPKudTah3KIdM9HX1pSScKVDoD08rGsm5EEddyD2fVyvopgfvJo',
  },
];

const discoverItems = [
  {
    title: 'Sports',
    desc: 'Join local tournaments and athletic communities.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Technical',
    desc: 'Coding workshops, hackathons and tech talks.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Cultural',
    desc: 'Celebrate diversity through art and heritage events.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Social',
    desc: 'Networking nights and social mixer events.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1932&auto=format&fit=crop',
  },
  {
    title: 'Volunteering',
    desc: 'Make an impact with community service tasks.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074&auto=format&fit=crop',
  },
];

const howItWorksByRole: Record<Role, Array<{ icon: string; title: string; desc: string }>> = {
  volunteers: [
    { icon: 'badge', title: '1. Profile', desc: 'Create your unique volunteer profile showcasing your skills and interests.' },
    { icon: 'groups', title: '2. Join', desc: 'Discover communities and apply for events that resonate with your goals.' },
    { icon: 'query_stats', title: '3. Track', desc: 'Earn impact points and build a verifiable portfolio of your contributions.' },
  ],
  communities: [
    { icon: 'domain_verification', title: '1. Register', desc: 'Create your community profile and verify your organization details.' },
    { icon: 'event_available', title: '2. Publish', desc: 'Post events and recruit volunteers with streamlined application management.' },
    { icon: 'trending_up', title: '3. Grow', desc: 'Track attendance and impact while building long-term sponsor relationships.' },
  ],
  sponsors: [
    { icon: 'track_changes', title: '1. Set Goals', desc: 'Define your CSR targets, preferred event types, and outreach priorities.' },
    { icon: 'filter_alt', title: '2. Match', desc: 'Use smart filtering to discover communities aligned with your brand values.' },
    { icon: 'monitoring', title: '3. Measure', desc: 'Monitor outcomes with clear analytics and impact reporting dashboards.' },
  ],
};

const coreFeatures = [
  ['psychology', 'AI-Agentic Framework'],
  ['sort', 'Smart Sponsorship Filtering'],
  ['calendar_today', 'Integrated Society Calendar'],
  ['chat', 'Proposal Chat System'],
  ['verified_user', 'Volunteer Portfolio'],
  ['military_tech', 'Sponsor Leaderboard'],
] as const;

const phoneScreens = [
  {
    icon: 'travel_explore',
    title: 'Discover Feed',
    subtitle: 'Find nearby events and communities',
    chips: ['Sports', 'Technical', 'Social'],
    cards: ['Beach Cleanup Drive', 'Tech Mentoring Session', 'Cultural Exchange Night'],
  },
  {
    icon: 'groups',
    title: 'Volunteer Dashboard',
    subtitle: 'Track progress and upcoming work',
    chips: ['12 Tasks Done', '4 Ongoing', '98% Attendance'],
    cards: ['Community Tutoring Program', 'Food Donation Campaign', 'River Restoration Team'],
  },
  {
    icon: 'forum',
    title: 'Proposal Chat',
    subtitle: 'Collaborate with sponsors faster',
    chips: ['2 New Replies', 'Priority', 'Verified'],
    cards: ['GreenEarth Foundation', 'Sunrise Corporate CSR', 'Campus Welfare Society'],
  },
  {
    icon: 'monitoring',
    title: 'Impact Analytics',
    subtitle: 'Visualize real outcomes in real time',
    chips: ['3.2k Hours', '1.1k Volunteers', '$210k Support'],
    cards: ['Weekly Growth +18%', 'Sponsor Retention 87%', 'Community Reach 42 Cities'],
  },
] as const;

const teamMembers = [
  { name: 'Aaqib', image: aaqibUrl, role: 'Product Lead', focus: 'Strategy & Ecosystem Growth' },
  { name: 'Nimsara', image: nimsaraUrl, role: 'Full Stack Developer', focus: 'UI Systems & Performance' },
  { name: 'Abinash', image: abinashUrl, role: 'Full Stack Developer', focus: 'APIs & Platform Security' },
  { name: 'Sai', image: saiUrl, role: 'UX Designer', focus: 'Research & Interaction Design' },
  { name: 'Arani', image: araniUrl, role: 'Data & Analytics', focus: 'Impact Insights' },
  { name: 'Tharusiyaa', image: tharusiyaaUrl, role: 'Community Ops', focus: 'Volunteer Enablement' },
] as const;

const App: React.FC = () => {
  const [activeRole, setActiveRole] = useState<Role>('volunteers');
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
      setScrollProgress(progress);
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTeamIndex((prev) => (prev + 1) % teamMembers.length);
    }, 3200);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const goToPrevTeamMember = () => {
    setActiveTeamIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const goToNextTeamMember = () => {
    setActiveTeamIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handleGetStartedClick = () => {
    const videoSection = document.getElementById('video');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLearnMoreClick = () => {
    const mobilePreviewSection = document.getElementById('mobile-preview');
    if (mobilePreviewSection) {
      mobilePreviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getSlideOffset = (memberIndex: number) => {
    let diff = memberIndex - activeTeamIndex;
    const half = Math.floor(teamMembers.length / 2);

    if (diff > half) diff -= teamMembers.length;
    if (diff < -half) diff += teamMembers.length;

    return diff;
  };

  return (
    <>
      {isLoading && (
        <div className="lp-loader-overlay" aria-live="polite" aria-label="Loading Linkara">
          <div className="lp-loader-wrap">
            <div className="lp-loader-logo-ring">
              <img src={logoUrl} alt="Linkara logo" className="lp-loader-logo" />
            </div>
            <p className="lp-loader-title">Linkara</p>
            <div className="lp-loader-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      )}

      <div className="lp-page">
      <header className="lp-header">
        <div className="lp-progress" style={{ width: `${scrollProgress}%` }} />
        <nav className="lp-nav lp-container">
          <a href="#" className="lp-brand">
            <img src={logoUrl} alt="Linkara" className="lp-brand-logo" />
            <span className="lp-brand-name">Linkara</span>
          </a>
          <div className="lp-links">
            <a href="#discover">Discover</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#features">Features</a>
            <a href="#stories">Stories</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
          </div>
          <a href={loginUrl} className="lp-login" target="_blank" rel="noreferrer">
            Login
          </a>
        </nav>
      </header>

      <main>
        <section className="lp-hero lp-section">
          <div className="lp-container lp-hero-grid">
            <div>
              <h1>
                Connect. Collaborate. <span>Create Impact.</span>
              </h1>
              <p>
                Linkara is a comprehensive ecosystem designed for volunteers, communities, and sponsors to drive meaningful social change through technology and collaboration.
              </p>
              <div className="lp-hero-cta">
                <button className="lp-btn lp-btn-primary" onClick={handleGetStartedClick}>Get Started</button>
                <button className="lp-btn lp-btn-secondary" onClick={handleLearnMoreClick}>Learn More</button>
              </div>
            </div>
            <div className="lp-hero-media-frame">
              <div
                className="lp-hero-media"
                style={{
                  backgroundImage: `url('${heroImageUrl}')`,
                }}
              />
            </div>
          </div>
        </section>

        <section className="lp-stats">
          <div className="lp-container lp-stats-grid">
            {[
              ['group', '10k+', 'Active Users'],
              ['hub', '500+', 'Communities'],
              ['event_available', '1,200+', 'Events Hosted'],
              ['volunteer_activism', '$2M+', 'Sponsorships'],
            ].map(([icon, value, label]) => (
              <div key={label} className="lp-stat-item">
                <span className="material-symbols-outlined">{icon}</span>
                <p className="lp-stat-value">{value}</p>
                <p className="lp-stat-label">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-container lp-demo-grid">
            <a className="lp-card" href={prototypeUrl} target="_blank" rel="noreferrer">
              <span className="material-symbols-outlined lp-icon-xl">draw</span>
              <h3>Interactive Prototype</h3>
              <p>Explore our user journey through our high-fidelity Figma prototype.</p>
              <span className="lp-link-inline">View Prototype <span className="material-symbols-outlined">arrow_forward</span></span>
            </a>
            <a className="lp-card lp-card-primary" href={loginUrl} target="_blank" rel="noreferrer">
              <span className="material-symbols-outlined lp-icon-xl">rocket_launch</span>
              <h3>Live Platform</h3>
              <p>Experience the current production build of the Linkara social ecosystem.</p>
              <span className="lp-link-inline">Launch Now <span className="material-symbols-outlined">open_in_new</span></span>
            </a>
          </div>
        </section>

        <section className="lp-video lp-section" id="video">
          <div className="lp-container lp-video-inner">
            <h2>See Linkara in Action</h2>
            <div className="lp-video-frame">
              <video src={platformVideoUrl} controls playsInline className="lp-video-el" />
            </div>
            <a href={platformVideoUrl} download className="lp-download-link">
              <span className="material-symbols-outlined">download</span>
              Download Product Walkthrough (45MB)
            </a>
          </div>
        </section>

        <section className="lp-section lp-phone-showcase" id="mobile-preview">
          <div className="lp-container lp-phone-grid">
            <div>
              <div className="lp-section-title">
                <h2>Linkara in Your Pocket</h2>
                <p>Animated app pages preview how users discover events, collaborate, and track impact directly from mobile.</p>
              </div>
              <div className="lp-phone-side-features" aria-label="Core Linkara features">
                {coreFeatures.map(([icon, title]) => (
                  <div key={title} className="lp-phone-side-feature">
                    <span className="material-symbols-outlined">{icon}</span>
                    <p>{title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lp-phone-shell-wrap">
              <div className="lp-phone-shell" aria-label="Animated Linkara app preview">
                <div className="lp-phone-notch" />
                <div className="lp-phone-screen">
                  <div className="lp-phone-status">
                    <span>9:41</span>
                    <strong>Linkara</strong>
                  </div>
                  <div className="lp-phone-pages">
                    {phoneScreens.map((screen, index) => (
                      <article
                        key={screen.title}
                        className="lp-phone-page"
                        style={{ animationDelay: `${index * 2.4}s` }}
                      >
                        <header className="lp-phone-page-head">
                          <span className="material-symbols-outlined">{screen.icon}</span>
                          <div>
                            <h4>{screen.title}</h4>
                            <p>{screen.subtitle}</p>
                          </div>
                        </header>

                        <div className="lp-phone-chip-row">
                          {screen.chips.map((chip) => (
                            <span key={chip} className="lp-phone-chip">{chip}</span>
                          ))}
                        </div>

                        <div className="lp-phone-mini-list">
                          {screen.cards.map((card) => (
                            <div key={card} className="lp-phone-mini-item">
                              <div className="lp-phone-mini-thumb" />
                              <div className="lp-phone-mini-copy">
                                <strong>{card}</strong>
                                <small>Open details</small>
                              </div>
                            </div>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section" id="discover">
          <div className="lp-container">
            <div className="lp-section-title">
              <h2>Discover Opportunities</h2>
              <p>Explore active communities and upcoming events by category.</p>
            </div>
            <div className="lp-category-grid">
              {discoverItems.map((item) => (
                <article key={item.title} className="lp-category-card">
                  <div className="lp-category-media" style={{ backgroundImage: `url('${item.image}')` }} />
                  <div className="lp-category-body">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <button>Join Now</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-hiw" id="how-it-works">
          <div className="lp-container">
            <div className="lp-section-title centered">
              <h2>How It Works</h2>
              <p>Tailored experiences for every member of our ecosystem.</p>
            </div>
            <div className="lp-tabs">
              <button className={activeRole === 'volunteers' ? 'active' : ''} onClick={() => setActiveRole('volunteers')}>Volunteers</button>
              <button className={activeRole === 'communities' ? 'active' : ''} onClick={() => setActiveRole('communities')}>Communities</button>
              <button className={activeRole === 'sponsors' ? 'active' : ''} onClick={() => setActiveRole('sponsors')}>Sponsors</button>
            </div>
            <div className="lp-hiw-grid">
              {howItWorksByRole[activeRole].map(({ icon, title, desc }) => (
                <article key={title} className="lp-hiw-item">
                  <div className="lp-hiw-icon">
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <World />

        <section className="lp-section" id="features">
          <div className="lp-container">
            <div className="lp-section-title centered">
              <h2>Core Ecosystem Features</h2>
              <p>Everything you need to manage social impact at scale.</p>
            </div>
            <div className="lp-feature-grid">
              {coreFeatures.map(([icon, title]) => (
                <article key={title} className="lp-feature-card">
                  <span className="material-symbols-outlined">{icon}</span>
                  <h4>{title}</h4>
                  <p>Built for collaboration, automation, and real impact.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-stories" id="stories">
          <div className="lp-container">
            <div className="lp-section-title centered">
              <h2>Stories from the Field</h2>
            </div>
            <div className="lp-story-grid">
              {stories.map((story) => (
                <article key={story.name} className="lp-story-card">
                  <div className="lp-stars-icons">★★★★★</div>
                  <p>{story.quote}</p>
                  <div className="lp-story-person">
                    <div className="lp-story-avatar" style={{ backgroundImage: `url('${story.image}')` }} />
                    <div>
                      <strong>{story.name}</strong>
                      <small>{story.role}</small>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section" id="team">
          <div className="lp-container">
            <div className="lp-section-title centered">
              <h2>Meet Our Team</h2>
              <p>The people driving Linkara forward with product, design, and impact operations.</p>
            </div>

            <div className="lp-team-slider">
              <button className="lp-team-nav" onClick={goToPrevTeamMember} aria-label="Previous team member">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>

              <div className="lp-team-stage">
                {teamMembers.map((member, index) => {
                  const offset = getSlideOffset(index);
                  const isVisible = Math.abs(offset) <= 1;
                  const transform = `translateX(${offset * 72}%) scale(${offset === 0 ? 1 : 0.88})`;

                  return (
                    <article
                      key={member.name}
                      className={`lp-team-item ${offset === 0 ? 'is-active' : ''}`}
                      style={{
                        transform,
                        opacity: isVisible ? 1 : 0,
                        zIndex: offset === 0 ? 3 : 2 - Math.abs(offset),
                        pointerEvents: isVisible ? 'auto' : 'none',
                      }}
                    >
                      <div className="lp-team-image" style={{ backgroundImage: `url('${member.image}')` }} />
                      <div className="lp-team-meta">
                        <p>{member.name}</p>
                        <small>{member.role}</small>
                        <span className="lp-team-pill">{member.focus}</span>
                      </div>
                    </article>
                  );
                })}
              </div>

              <button className="lp-team-nav" onClick={goToNextTeamMember} aria-label="Next team member">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>

            <div className="lp-team-dots" aria-label="Team slideshow pagination">
              {teamMembers.map((member, index) => (
                <button
                  key={member.name}
                  className={index === activeTeamIndex ? 'active' : ''}
                  onClick={() => setActiveTeamIndex(index)}
                  aria-label={`Go to ${member.name}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="lp-feedback lp-section">
          <div className="lp-container">
            <div className="lp-feedback-box">
              <div>
                <h3>Help Us Improve!</h3>
                <p>Your feedback drives our development. Take our 2-minute survey.</p>
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeRcTAC-8abF9C3qEaaZruZs2-wu8vZvPWsyHC5W6cwn6GIgw/viewform?usp=dialog"
                target="_blank"
                rel="noreferrer"
              >
                Take Survey
              </a>
            </div>
          </div>
        </section>

        <section className="lp-section" id="contact">
          <div className="lp-container lp-contact-grid">
            <div>
              <h2>Get in Touch</h2>
              <p>Have questions about joining Linkara or becoming a sponsor? Reach out to our team today.</p>
              <div className="lp-contact-list">
                <a href="https://maps.google.com/?q=123+Impact+Way,+Innovation+District,+SF+94103" target="_blank" rel="noreferrer">
                  <span className="material-symbols-outlined">pin_drop</span>
                  123 Impact Way, Innovation District, SF 94103
                </a>
                <a href="mailto:contact@linkara.com">
                  <span className="material-symbols-outlined">alternate_email</span>
                  contact@linkara.com
                </a>
                <a href="tel:+15551234567">
                  <span className="material-symbols-outlined">phone_iphone</span>
                  (555) 123-4567
                </a>
              </div>
            </div>
            <div className="lp-contact-card">
              <a href="https://maps.google.com/?q=123+Impact+Way,+Innovation+District,+SF+94103" target="_blank" rel="noreferrer">
                <span className="material-symbols-outlined">pin_drop</span>
                Office Address
              </a>
              <a href="mailto:contact@linkara.com">
                <span className="material-symbols-outlined">alternate_email</span>
                Email Us
              </a>
              <a href="tel:+15551234567">
                <span className="material-symbols-outlined">phone_iphone</span>
                Phone
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-top">
            <div className="lp-brand">
              <img src={logoUrl} alt="Linkara" className="lp-brand-logo" />
              <span className="lp-brand-name">Linkara</span>
            </div>
            <div className="lp-footer-links">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7 0h3.84v2.04h.05c.53-1.01 1.84-2.08 3.8-2.08 4.06 0 4.81 2.67 4.81 6.15V23h-4v-7.38c0-1.76-.03-4.03-2.45-4.03-2.46 0-2.84 1.92-2.84 3.9V23h-4V8Z" fill="currentColor" />
                </svg>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
          <div className="lp-footer-bottom">
            <p>© 2024 Linkara Social Ecosystem. All rights reserved.</p>
            <div>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default App;
