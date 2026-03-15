import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { navLinks, personalInfo } from '../../data/portfolio';

const socials = [
  { icon: FiGithub, href: personalInfo.github, label: 'GitHub' },
  { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: FiMail, href: `mailto:${personalInfo.email}`, label: 'Email' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t" style={{ borderColor: 'var(--border)' }}>
      {/* Glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(74,222,128,0.4), transparent)' }} />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-bold text-base tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Hemant<span className="gradient-text-green"> Raj</span>
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              Student @ NIT Patna
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                smooth
                duration={600}
                offset={-80}
                className="text-xs font-medium cursor-pointer transition-colors duration-200 hover:text-green-400"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl transition-all duration-200 hover:text-green-400 hover:border-green-500/30"
                style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                aria-label={s.label}
              >
                <s.icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>
            © {year} Hemant Raj. All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
}