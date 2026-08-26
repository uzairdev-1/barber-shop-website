import { useState, useEffect } from 'react';

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  service?: string;
}

// ─── ICONS ───────────────────────────────────────────────────────────────────
const ScissorsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
    <line x1="8.12" y1="8.12" x2="12" y2="12"/>
  </svg>
);

const RazorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M4 8h16v8H4z"/><path d="M4 12h16"/><path d="M8 8V6l4-2 4 2v2"/>
  </svg>
);

const CombIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M3 7h18v10H3z"/><path d="M7 7v4"/><path d="M10 7v4"/><path d="M13 7v4"/><path d="M16 7v4"/>
  </svg>
);

const BeardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"/><path d="M4 9c0 6 3 10 8 11 5-1 8-5 8-11"/>
    <path d="M8 9c0 3 1.5 5 4 5s4-2 4-5"/>
  </svg>
);

const ClipperIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M6 4h12v3H6z"/><path d="M4 7h16v2H4z"/><path d="M5 9l1 11h12l1-11"/>
    <path d="M10 13h4"/>
  </svg>
);

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "#c9a84c" : "none"} stroke="#c9a84c" strokeWidth="1.5" className="w-4 h-4">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ChevronUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// ─── GALLERY IMAGES ───────────────────────────────────────────────────────────
const galleryImages = [
  { src: '/images/gallery-1.jpg', alt: 'Premium barber chair interior' },
  { src: '/images/gallery-2.jpg', alt: 'Professional haircut in progress' },
  { src: '/images/gallery-3.jpg', alt: 'Expert beard grooming' },
  { src: '/images/gallery-4.jpg', alt: 'Professional barber tools' },
  { src: '/images/gallery-5.jpg', alt: 'Sharp modern hairstyle result' },
  { src: '/images/gallery-6.jpg', alt: 'Premium salon interior' },
  { src: '/images/gallery-7.jpg', alt: 'Hair styling and finishing' },
  { src: '/images/gallery-8.jpg', alt: 'Traditional hot towel shave' },
];

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: <ScissorsIcon />,
    name: 'Classic Haircut',
    desc: 'Professional haircut tailored to your preferred style, cut with precision and care for a clean, sharp finish.',
  },
  {
    icon: <CombIcon />,
    name: 'Modern Hair Styling',
    desc: 'Contemporary styling and finishing for a polished, on-trend look that suits your personality.',
  },
  {
    icon: <BeardIcon />,
    name: 'Beard Trim & Shaping',
    desc: 'Clean beard trimming and shape refinement to keep your facial hair looking sharp and well-groomed.',
  },
  {
    icon: <ClipperIcon />,
    name: 'Hair & Beard Grooming',
    desc: 'A coordinated grooming service combining a fresh haircut and beard work for a complete, refined look.',
  },
  {
    icon: <RazorIcon />,
    name: 'Traditional Shave',
    desc: 'Classic barber-style shaving with a straight razor and hot towel for the ultimate smooth finish.',
  },
  {
    icon: <CombIcon />,
    name: 'Hair Styling & Finish',
    desc: 'Professional styling and finishing touches to give you a sharp, salon-quality appearance.',
  },
];

// ─── SCROLL HOOK ─────────────────────────────────────────────────────────────
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-in-up, .fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── HEADER COMPONENT ─────────────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'services', 'gallery', 'reviews', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(17,17,17,0.97)' : 'rgba(17,17,17,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => scrollTo('home')} className="flex flex-col items-start group">
            <span
              className="text-xl sm:text-2xl font-black tracking-widest leading-none transition-colors duration-300"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: 'linear-gradient(135deg, #c9a84c 0%, #d4b86a 50%, #a8892e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MISTER CUTTS
            </span>
            <span className="text-xs tracking-widest text-gray-400 mt-0.5" style={{ letterSpacing: '0.2em' }}>
              DESIGNED BY MISTER CUTTS
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`nav-link text-sm tracking-widest font-medium transition-colors duration-300 ${
                  activeSection === link.id ? 'text-amber-400 active' : 'text-gray-300 hover:text-amber-400'
                }`}
                style={{ letterSpacing: '0.08em' }}
              >
                {link.label.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+923052574828"
              className="btn-outline px-4 py-2 rounded text-sm font-semibold tracking-wider"
              style={{ letterSpacing: '0.06em' }}
            >
              CALL NOW
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="btn-gold px-5 py-2 rounded text-sm font-semibold tracking-wider"
              style={{ letterSpacing: '0.06em' }}
            >
              <span>BOOK A VISIT</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="hamburger-line"
              style={{
                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <span
              className="hamburger-line"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="hamburger-line"
              style={{
                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          background: 'rgba(17,17,17,0.98)',
          borderTop: menuOpen ? '1px solid rgba(201,168,76,0.15)' : 'none',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-left py-3 text-sm tracking-widest font-medium border-b transition-colors duration-200 ${
                activeSection === link.id ? 'text-amber-400' : 'text-gray-300'
              }`}
              style={{ borderBottomColor: 'rgba(201,168,76,0.1)', letterSpacing: '0.1em' }}
            >
              {link.label.toUpperCase()}
            </button>
          ))}
          <div className="flex gap-3 pt-4">
            <a
              href="tel:+923052574828"
              className="btn-outline flex-1 text-center py-2.5 rounded text-sm font-semibold tracking-wider"
            >
              CALL NOW
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="btn-gold flex-1 py-2.5 rounded text-sm font-semibold tracking-wider"
            >
              <span>BOOK A VISIT</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-barber.jpg"
          alt="Designed by Mister Cutts professional barber shop"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.82) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,17,1) 0%, rgba(17,17,17,0) 40%)' }} />
      </div>

      {/* Decorative gold line top */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-20">
        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-12" style={{ background: '#c9a84c' }} />
          <span
            className="text-xs tracking-widest font-medium uppercase"
            style={{ color: '#c9a84c', letterSpacing: '0.3em' }}
          >
            Designed by Mister Cutts
          </span>
          <div className="h-px w-12" style={{ background: '#c9a84c' }} />
        </div>

        {/* Main Heading */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-white block">Sharp Cuts.</span>
          <span
            className="block mt-1"
            style={{
              background: 'linear-gradient(135deg, #c9a84c 0%, #d4b86a 50%, #a8892e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Refined Style.
          </span>
        </h1>

        {/* Supporting Text */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Professional grooming and modern barbering in the heart of{' '}
          <span style={{ color: '#d4b86a' }}>Rahim Yar Khan.</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={() => scrollTo('contact')}
            className="btn-gold px-8 py-4 rounded text-base font-bold tracking-widest w-full sm:w-auto min-w-48"
            style={{ letterSpacing: '0.1em' }}
          >
            <span>BOOK A VISIT</span>
          </button>
          <button
            onClick={() => scrollTo('services')}
            className="btn-outline px-8 py-4 rounded text-base font-bold tracking-widest w-full sm:w-auto min-w-48"
            style={{ letterSpacing: '0.1em' }}
          >
            EXPLORE SERVICES
          </button>
        </div>

        {/* Trust Indicator */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
          style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}
        >
          <div className="flex gap-0.5">
            {[1,2,3,4].map(i => <StarIcon key={i} filled={true} />)}
            <StarIcon filled={false} />
          </div>
          <span className="text-sm font-medium" style={{ color: '#d4b86a' }}>
            Rated 3.9/5 on Google
          </span>
          <span className="text-gray-400 text-sm">•</span>
          <span className="text-gray-300 text-sm">30 Reviews</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, transparent, #c9a84c)' }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#c9a84c' }} />
      </div>
    </section>
  );
}

// ─── INFO BAR ────────────────────────────────────────────────────────────────
function InfoBar() {
  const items = [
    {
      icon: <ClockIcon />,
      label: 'OPEN DAILY',
      value: '10:00 AM – 12:00 AM',
      href: null,
    },
    {
      icon: <MapPinIcon />,
      label: 'LOCATION',
      value: 'Main Church Road, Rahim Yar Khan',
      href: 'https://maps.google.com/?q=Shop+Number+3+Main+Church+Road+Rahim+Yar+Khan+Punjab+Pakistan',
    },
    {
      icon: <PhoneIcon />,
      label: 'CONTACT',
      value: '+92 305 2574828',
      href: 'tel:+923052574828',
    },
    {
      icon: (
        <div className="flex gap-0.5">
          {[1,2,3,4].map(i => <StarIcon key={i} filled={true} />)}
          <StarIcon filled={false} />
        </div>
      ),
      label: 'RATING',
      value: '3.9/5 • 30 Reviews',
      href: 'https://maps.google.com/?q=Designed+by+Mister+Cutts+Rahim+Yar+Khan',
    },
  ];

  return (
    <div
      className="py-6 px-4"
      style={{ background: 'linear-gradient(90deg, #1a1400, #1e1800, #1a1400)', borderTop: '1px solid rgba(201,168,76,0.3)', borderBottom: '1px solid rgba(201,168,76,0.3)' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x" style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}>
        {items.map((item, i) => {
          const Inner = (
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 px-4 lg:px-8 text-center sm:text-left">
              <div style={{ color: '#c9a84c', marginTop: '2px', flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div className="text-xs tracking-widest mb-0.5" style={{ color: '#c9a84c', letterSpacing: '0.15em' }}>{item.label}</div>
                <div className="text-sm text-gray-200 font-medium">{item.value}</div>
              </div>
            </div>
          );
          return item.href ? (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="hover:opacity-80 transition-opacity duration-200"
            >
              {Inner}
            </a>
          ) : (
            <div key={i}>{Inner}</div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24 px-4" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="fade-in-up relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '4/5' }}>
              <img
                src="/images/about-barber.jpg"
                alt="Professional barber providing expert grooming service"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, rgba(17,17,17,0.3), transparent)' }}
              />
            </div>
            {/* Decorative border */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-sm"
              style={{ border: '2px solid #c9a84c', zIndex: -1 }}
            />
            <div
              className="absolute -top-4 -left-4 w-16 h-16 rounded-sm"
              style={{ border: '2px solid rgba(201,168,76,0.3)', zIndex: -1 }}
            />
          </div>

          {/* Content */}
          <div className="fade-in-up order-1 lg:order-2" style={{ transitionDelay: '0.15s' }}>
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#c9a84c' }} />
              <span className="text-xs tracking-widest font-medium uppercase" style={{ color: '#c9a84c', letterSpacing: '0.2em' }}>
                About Us
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Precision Grooming.
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #c9a84c 0%, #d4b86a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Personal Style.
              </span>
            </h2>

            <div className="gold-divider mb-8" style={{ marginLeft: 0 }} />

            <p className="text-gray-400 leading-relaxed mb-5 text-base">
              At <strong className="text-gray-200">Designed by Mister Cutts</strong>, we believe a great haircut is more than just a service — it's an experience. Located in the heart of Rahim Yar Khan on Main Church Road, our shop is dedicated to providing every client with a clean, comfortable, and professional grooming environment.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8 text-base">
              From classic haircuts to precise beard shaping and traditional hot-towel shaves, our focus is always on attention to detail, quality technique, and ensuring you leave looking and feeling your best. We serve clients every day of the week, making professional grooming accessible whenever you need it.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <ScissorsIcon />, label: 'Professional Grooming' },
                { icon: <CombIcon />, label: 'Clean & Modern Experience' },
                { icon: <RazorIcon />, label: 'Style-Focused Service' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-4 rounded-sm"
                  style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                >
                  <div className="w-8 h-8 mb-2" style={{ color: '#c9a84c' }}>{item.icon}</div>
                  <span className="text-xs text-gray-300 font-medium tracking-wide">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES SECTION ─────────────────────────────────────────────────────────
function ServicesSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 px-4" style={{ background: '#141414' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
            <span className="text-xs tracking-widest font-medium uppercase" style={{ color: '#c9a84c', letterSpacing: '0.2em' }}>
              Our Services
            </span>
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What We{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #d4b86a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Offer
            </span>
          </h2>
          <div className="gold-divider mb-4" />
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            From classic cuts to modern styles, every service is performed with precision and care.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div
              key={i}
              className="service-card p-8 rounded-sm"
              style={{
                background: '#1a1a1a',
                border: '1px solid #252525',
                transitionDelay: `${i * 0.05}s`,
              }}
            >
              <div
                className="w-12 h-12 mb-6 rounded-sm flex items-center justify-center p-2.5"
                style={{ color: '#c9a84c', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
              >
                {svc.icon}
              </div>
              <h3
                className="text-lg font-bold mb-3 text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {svc.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{svc.desc}</p>
              <button
                onClick={() => scrollTo('contact')}
                className="btn-outline w-full py-2.5 rounded text-xs font-semibold tracking-widest"
                style={{ letterSpacing: '0.1em' }}
              >
                BOOK A VISIT
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────
function WhyChooseSection() {
  const benefits = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: 'Attention to Detail',
      desc: 'Every cut, trim, and shape is carried out with careful precision. We take the time to understand what you want and deliver a result you\'ll be proud of.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Professional Grooming',
      desc: 'Our barber shop is set up to provide a professional, welcoming experience — clean environment, quality tools, and skilled hands.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
      title: 'Modern Styling',
      desc: 'Whether you\'re after a timeless classic or a contemporary finish, we offer modern styling techniques suited to current trends.',
    },
    {
      icon: <ClockIcon />,
      title: 'Convenient Daily Hours',
      desc: 'Open every day from 10:00 AM to 12:00 AM — including weekends and holidays — so you can visit at a time that works for you.',
    },
  ];

  return (
    <section className="py-24 px-4" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
            <span className="text-xs tracking-widest font-medium uppercase" style={{ color: '#c9a84c', letterSpacing: '0.2em' }}>
              Why Choose Us
            </span>
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            The{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #d4b86a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Mister Cutts
            </span>{' '}
            Difference
          </h2>
          <div className="gold-divider mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="benefit-card p-7 rounded-sm fade-in-up text-center"
              style={{
                background: '#1a1a1a',
                border: '1px solid #252525',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ color: '#c9a84c', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
              >
                {b.icon}
              </div>
              <h3
                className="text-base font-bold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {b.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY SECTION ──────────────────────────────────────────────────────────
function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((p) => (p !== null ? (p - 1 + galleryImages.length) % galleryImages.length : 0));
  const next = () => setLightboxIndex((p) => (p !== null ? (p + 1) % galleryImages.length : 0));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <section id="gallery" className="py-24 px-4" style={{ background: '#141414' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
            <span className="text-xs tracking-widest font-medium uppercase" style={{ color: '#c9a84c', letterSpacing: '0.2em' }}>
              Gallery
            </span>
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #d4b86a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Work
            </span>
          </h2>
          <div className="gold-divider mb-4" />
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            A look inside Designed by Mister Cutts — our space, our craft, and the results we deliver.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 fade-in-up">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="gallery-item rounded-sm overflow-hidden cursor-pointer"
              style={{ aspectRatio: i === 0 || i === 5 ? '1/1' : '3/4', border: '1px solid #252525' }}
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              aria-label={`View ${img.alt}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div
            className="lightbox-overlay"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-white hover:text-amber-400 transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <XIcon />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 sm:left-8 text-white hover:text-amber-400 transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
            >
              <ChevronLeftIcon />
            </button>

            {/* Image */}
            <div
              className="relative max-w-4xl max-h-screen w-full px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded"
              />
              <p className="text-center text-gray-400 text-sm mt-4">
                {galleryImages[lightboxIndex].alt} — {lightboxIndex + 1} / {galleryImages.length}
              </p>
            </div>

            {/* Next */}
            <button
              className="absolute right-4 sm:right-8 text-white hover:text-amber-400 transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
            >
              <ChevronRightIcon />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── REVIEWS SECTION ──────────────────────────────────────────────────────────
function ReviewsSection() {
  const reviews = [
    {
      name: 'Muhammad A.',
      initial: 'M',
      rating: 5,
      text: 'Cooperative staff and a well saloon with reasonable prices. Very happy with the service.',
      timeAgo: 'A month ago',
    },
    {
      name: 'Imran K.',
      initial: 'I',
      rating: 4,
      text: 'Good experience. Clean environment and friendly barber. Will definitely visit again.',
      timeAgo: '2 months ago',
    },
    {
      name: 'Ali R.',
      initial: 'A',
      rating: 4,
      text: 'Great. Comfortable place, good haircut. Satisfied with the overall grooming service.',
      timeAgo: '3 months ago',
    },
  ];

  return (
    <section id="reviews" className="py-24 px-4" style={{ background: '#111111' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
            <span className="text-xs tracking-widest font-medium uppercase" style={{ color: '#c9a84c', letterSpacing: '0.2em' }}>
              Google Reviews
            </span>
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Clients{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #d4b86a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Say
            </span>
          </h2>

          {/* Rating Display */}
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-8 py-5 rounded-sm mb-4"
            style={{ background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.25)' }}
          >
            <div className="flex flex-col items-center">
              <span
                className="text-5xl font-black"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  background: 'linear-gradient(135deg, #c9a84c, #d4b86a)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                3.9
              </span>
              <span className="text-gray-400 text-xs tracking-wider mt-1">OUT OF 5</span>
            </div>
            <div className="h-px sm:h-12 w-12 sm:w-px" style={{ background: 'rgba(201,168,76,0.2)' }} />
            <div className="flex flex-col items-center">
              <div className="flex gap-1 mb-1">
                {[1,2,3,4].map(i => <StarIcon key={i} filled={true} />)}
                <StarIcon filled={false} />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <GoogleIcon />
                <span className="text-gray-300 text-sm font-medium">30 Google Reviews</span>
              </div>
            </div>
          </div>
          <div className="gold-divider" />
        </div>

        {/* Review Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="review-card p-7 rounded-sm fade-in-up"
              style={{
                background: '#1a1a1a',
                border: '1px solid #252525',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }, (_, si) => (
                  <StarIcon key={si} filled={si < r.rating} />
                ))}
              </div>
              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">
                "{r.text}"
              </p>
              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #252525' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)' }}
                >
                  {r.initial}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-200">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.timeAgo}</div>
                </div>
                <div className="ml-auto">
                  <GoogleIcon />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center fade-in-up">
          <a
            href="https://maps.google.com/?q=Designed+by+Mister+Cutts+Main+Church+Road+Rahim+Yar+Khan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-gold px-8 py-4 rounded text-sm font-bold tracking-widest"
            style={{ letterSpacing: '0.1em' }}
          >
            <span className="flex items-center gap-2">
              <GoogleIcon />
              VIEW GOOGLE REVIEWS
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT & LOCATION SECTION ───────────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your full name.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (!/^[\d\s\-\+\(\)]{7,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.date) newErrors.date = 'Please select a preferred date.';
    if (!formData.time) newErrors.time = 'Please select a preferred time.';
    if (!formData.service) newErrors.service = 'Please select a service.';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `form-input w-full px-4 py-3 rounded-sm text-sm ${errors[field] ? 'input-error' : ''}`;

  return (
    <section id="contact" className="py-24 px-4" style={{ background: '#141414' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
            <span className="text-xs tracking-widest font-medium uppercase" style={{ color: '#c9a84c', letterSpacing: '0.2em' }}>
              Visit Us
            </span>
            <div className="h-px w-8" style={{ background: '#c9a84c' }} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Plan Your{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #c9a84c 0%, #d4b86a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Visit
            </span>
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Info */}
          <div className="fade-in-up space-y-6">
            {/* Location Card */}
            <div
              className="map-card p-7 rounded-sm relative overflow-hidden"
            >
              {/* Map visual placeholder */}
              <div
                className="w-full h-40 rounded-sm mb-6 flex items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1e1e1e, #2a2a2a)' }}
              >
                {/* Grid lines for map effect */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 160">
                  {Array.from({ length: 8 }, (_, i) => (
                    <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="160" stroke="#c9a84c" strokeWidth="0.5"/>
                  ))}
                  {Array.from({ length: 4 }, (_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="#c9a84c" strokeWidth="0.5"/>
                  ))}
                </svg>
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: '#c9a84c' }}
                  >
                    <MapPinIcon />
                  </div>
                  <span className="text-xs text-gray-400 tracking-wider">Rahim Yar Khan, Punjab</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div style={{ color: '#c9a84c', flexShrink: 0, marginTop: 2 }}><MapPinIcon /></div>
                  <div>
                    <div className="text-xs tracking-widest text-gray-500 mb-1" style={{ letterSpacing: '0.15em' }}>ADDRESS</div>
                    <address className="not-italic text-gray-300 text-sm leading-relaxed">
                      Shop Number 3, Main Church Road,<br />
                      Rahim Yar Khan, Punjab, Pakistan, 64200
                    </address>
                    <div className="text-xs text-gray-500 mt-1">Plus Code: C88F+W9, Rahim Yar Khan</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div style={{ color: '#c9a84c', flexShrink: 0, marginTop: 2 }}><PhoneIcon /></div>
                  <div>
                    <div className="text-xs tracking-widest text-gray-500 mb-1" style={{ letterSpacing: '0.15em' }}>PHONE</div>
                    <a href="tel:+923052574828" className="text-gray-300 text-sm hover:text-amber-400 transition-colors font-medium">
                      +92 305 2574828
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div style={{ color: '#c9a84c', flexShrink: 0, marginTop: 2 }}><ClockIcon /></div>
                  <div>
                    <div className="text-xs tracking-widest text-gray-500 mb-1" style={{ letterSpacing: '0.15em' }}>HOURS</div>
                    <div className="text-gray-300 text-sm font-medium">Daily 10:00 AM – 12:00 AM</div>
                    <div className="text-xs text-gray-500">Open 7 days a week</div>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Shop+Number+3+Main+Church+Road+Rahim+Yar+Khan+Punjab+Pakistan+64200"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full mt-6 py-3 rounded text-xs font-bold tracking-widest text-center block"
                style={{ letterSpacing: '0.12em' }}
              >
                <span>GET DIRECTIONS</span>
              </a>
            </div>

            {/* Hours Card */}
            <div
              className="p-7 rounded-sm"
              style={{ background: '#1a1a1a', border: '1px solid #252525' }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold tracking-widest text-white" style={{ letterSpacing: '0.15em' }}>
                  BUSINESS HOURS
                </h3>
                <span
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ background: 'rgba(34,197,94,0.12)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.25)' }}
                >
                  Open Daily
                </span>
              </div>
              {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day) => (
                <div
                  key={day}
                  className="hours-row flex justify-between items-center py-2.5 px-1 rounded-sm transition-colors duration-200"
                  style={{ borderBottom: '1px solid #1e1e1e' }}
                >
                  <span className="text-sm text-gray-400">{day}</span>
                  <span className="text-sm font-medium" style={{ color: '#d4b86a' }}>10:00 AM – 12:00 AM</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="fade-in-up" style={{ transitionDelay: '0.15s' }}>
            <div
              className="p-8 rounded-sm h-full"
              style={{ background: '#1a1a1a', border: '1px solid #252525' }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12 gap-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(201,168,76,0.12)', border: '2px solid #c9a84c' }}
                  >
                    <CheckIcon />
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-bold text-white mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Visit Request Prepared
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
                      Thank you, <strong className="text-gray-200">{formData.name}</strong>! Your visit request has been prepared. Please call the shop to confirm your appointment availability.
                    </p>
                  </div>
                  <a
                    href="tel:+923052574828"
                    className="btn-gold px-8 py-3 rounded text-sm font-bold tracking-widest inline-block"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    <span>CALL +92 305 2574828</span>
                  </a>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name:'', phone:'', date:'', time:'', service:'', message:'' }); }}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <>
                  <h3
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Request a Visit
                  </h3>
                  <p className="text-gray-500 text-sm mb-7">
                    Fill in your details and call to confirm your appointment.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 tracking-wider" style={{ letterSpacing: '0.1em' }}>FULL NAME *</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={inputClass('name')}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 tracking-wider" style={{ letterSpacing: '0.1em' }}>PHONE NUMBER *</label>
                      <input
                        type="tel"
                        placeholder="+92 3XX XXXXXXX"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={inputClass('phone')}
                      />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5 tracking-wider" style={{ letterSpacing: '0.1em' }}>DATE *</label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleChange('date', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className={inputClass('date')}
                          style={{ colorScheme: 'dark' }}
                        />
                        {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5 tracking-wider" style={{ letterSpacing: '0.1em' }}>TIME *</label>
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => handleChange('time', e.target.value)}
                          className={inputClass('time')}
                          style={{ colorScheme: 'dark' }}
                        />
                        {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 tracking-wider" style={{ letterSpacing: '0.1em' }}>SERVICE *</label>
                      <select
                        value={formData.service}
                        onChange={(e) => handleChange('service', e.target.value)}
                        className={inputClass('service')}
                        style={{ appearance: 'none' }}
                      >
                        <option value="">Select a service</option>
                        <option value="Classic Haircut">Classic Haircut</option>
                        <option value="Modern Hair Styling">Modern Hair Styling</option>
                        <option value="Beard Trim & Shaping">Beard Trim & Shaping</option>
                        <option value="Hair & Beard Grooming">Hair & Beard Grooming</option>
                        <option value="Traditional Shave">Traditional Shave</option>
                        <option value="Hair Styling & Finish">Hair Styling & Finish</option>
                      </select>
                      {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 tracking-wider" style={{ letterSpacing: '0.1em' }}>MESSAGE</label>
                      <textarea
                        rows={3}
                        placeholder="Any additional notes or preferences..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className="form-input w-full px-4 py-3 rounded-sm text-sm resize-none"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        className="btn-gold flex-1 py-3.5 rounded text-sm font-bold tracking-widest"
                        style={{ letterSpacing: '0.1em' }}
                      >
                        <span>REQUEST A VISIT</span>
                      </button>
                      <a
                        href="tel:+923052574828"
                        className="btn-outline flex-1 py-3.5 rounded text-sm font-bold tracking-widest text-center"
                        style={{ letterSpacing: '0.08em' }}
                      >
                        CALL +92 305 2574828
                      </a>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA SECTION ────────────────────────────────────────────────────────
function CtaSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="py-24 px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a1200 0%, #111111 40%, #0d0d0d 100%)' }}
    >
      {/* Decorative elements */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center fade-in-up">
        {/* Scissors decoration */}
        <div
          className="w-12 h-12 mx-auto mb-8"
          style={{ color: 'rgba(201,168,76,0.4)' }}
        >
          <ScissorsIcon />
        </div>

        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your Next Look{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #c9a84c 0%, #d4b86a 50%, #a8892e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Starts Here.
          </span>
        </h2>

        <p className="text-gray-400 text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          Visit <strong className="text-gray-200">Designed by Mister Cutts</strong> for professional grooming and a sharper everyday style.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('contact')}
            className="btn-gold px-10 py-4 rounded text-sm font-bold tracking-widest w-full sm:w-auto min-w-48"
            style={{ letterSpacing: '0.12em' }}
          >
            <span>BOOK A VISIT</span>
          </button>
          <a
            href="tel:+923052574828"
            className="btn-outline px-10 py-4 rounded text-sm font-bold tracking-widest w-full sm:w-auto min-w-48 text-center"
            style={{ letterSpacing: '0.12em' }}
          >
            CALL NOW
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer style={{ background: '#0d0d0d', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div
              className="text-2xl font-black tracking-widest mb-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: 'linear-gradient(135deg, #c9a84c 0%, #d4b86a 50%, #a8892e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MISTER CUTTS
            </div>
            <div className="text-xs text-gray-500 tracking-widest mb-4" style={{ letterSpacing: '0.18em' }}>
              DESIGNED BY MISTER CUTTS
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Professional Barber Shop & Men's Grooming in Rahim Yar Khan, Punjab.
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: '#c9a84c' }}
            >
              <div className="flex gap-0.5">
                {[1,2,3,4].map(i => <StarIcon key={i} filled={true} />)}
                <StarIcon filled={false} />
              </div>
              <span>3.9/5 • 30 Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-5 text-white" style={{ letterSpacing: '0.2em' }}>
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-gray-500 text-sm hover:text-amber-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-4 h-px" style={{ background: '#3a3a3a' }} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-5 text-white" style={{ letterSpacing: '0.2em' }}>
              CONTACT
            </h4>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div style={{ color: '#c9a84c', flexShrink: 0, marginTop: 2 }}><MapPinIcon /></div>
                <address className="not-italic text-gray-500 text-sm leading-relaxed">
                  Shop Number 3, Main Church Road,<br />
                  Rahim Yar Khan, Punjab,<br />
                  Pakistan, 64200
                </address>
              </div>
              <div className="flex gap-2 items-center">
                <div style={{ color: '#c9a84c', flexShrink: 0 }}><PhoneIcon /></div>
                <a href="tel:+923052574828" className="text-gray-500 text-sm hover:text-amber-400 transition-colors">
                  +92 305 2574828
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <div style={{ color: '#c9a84c', flexShrink: 0 }}><ClockIcon /></div>
                <span className="text-gray-500 text-sm">Daily 10:00 AM – 12:00 AM</span>
              </div>
              <a
                href="https://maps.google.com/?q=Shop+Number+3+Main+Church+Road+Rahim+Yar+Khan+Punjab+Pakistan+64200"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-block px-4 py-2 rounded text-xs font-semibold tracking-widest mt-2"
                style={{ letterSpacing: '0.08em' }}
              >
                GET DIRECTIONS
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xs font-bold tracking-widest mb-5 text-white" style={{ letterSpacing: '0.2em' }}>
              OPENING HOURS
            </h4>
            <div className="space-y-2">
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (
                <div key={d} className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">{d}</span>
                  <span className="text-gray-400">10 AM – 12 AM</span>
                </div>
              ))}
            </div>
            <div
              className="mt-4 px-3 py-2 rounded-sm text-center text-xs font-medium"
              style={{ background: 'rgba(34,197,94,0.08)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              Open Every Day
            </div>
          </div>
        </div>

        {/* Gold divider */}
        <div
          className="my-10"
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }}
        />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <span>© 2026 Designed by Mister Cutts. All rights reserved.</span>
          <span>Shop Number 3, Main Church Road, Rahim Yar Khan, Punjab, Pakistan</span>
        </div>
      </div>
    </footer>
  );
}

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      className="back-to-top"
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{ color: '#111' }}
    >
      <ChevronUpIcon />
    </button>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollAnimation();

  return (
    <div style={{ background: '#111111', minHeight: '100vh' }}>
      <Header />
      <main>
        <HeroSection />
        <InfoBar />
        <AboutSection />
        <ServicesSection />
        <WhyChooseSection />
        <GallerySection />
        <ReviewsSection />
        <ContactSection />
        <CtaSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
