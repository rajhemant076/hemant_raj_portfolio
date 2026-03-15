import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiDownload } from 'react-icons/fi';
import { personalInfo } from '../../data/portfolio';

const socials = [
  { icon: FiGithub, label: 'GitHub', href: personalInfo.github },
  { icon: FiLinkedin, label: 'LinkedIn', href: personalInfo.linkedin },
  { icon: FiMail, label: 'Email', href: `mailto:${personalInfo.email}` },
];

const stats = [
  { label: 'CGPA', value: personalInfo.cgpa },
  { label: 'LeetCode', value: personalInfo.leetcode },
  { label: 'Projects', value: '5+' },
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden animated-gradient">
      {/* Glow orbs */}
      <div className="glow-orb w-96 h-96 top-1/4 -left-24 opacity-20"
        style={{ background: 'radial-gradient(circle, #4ade80 0%, transparent 70%)' }} />
      <div className="glow-orb w-80 h-80 bottom-1/3 right-0 opacity-15"
        style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)' }} />
      <div className="glow-orb w-64 h-64 top-1/3 right-1/4 opacity-10"
        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(var(--text-secondary) 1px, transparent 1px), linear-gradient(90deg, var(--text-secondary) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 pt-20 pb-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 glass-card"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Open to internship opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              style={{ color: 'var(--text-primary)', lineHeight: 1.1 }}
            >
              Hi, I'm{' '}
              <span className="gradient-text block mt-1">Hemant Raj</span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl mb-6 font-mono"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>$ </span>
              <TypeAnimation
                sequence={[
                  'Full-Stack Developer ',
                  2000,
                  'CSE @ NIT Patna',
                  2000,
                  'Problem Solver',
                  2000,
                  'DSA Enthusiast',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ color: '#4ade80' }}
              />
              <span className="animate-cursor-blink" style={{ color: '#4ade80' }}>_</span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10"
            >
              <Link to="projects" smooth duration={600} offset={-80}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary"
                >
                  View Projects
                </motion.button>
              </Link>

              <a href={personalInfo.resumeUrl} download>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-outline"
                >
                  <FiDownload size={15} />
                  Resume
                </motion.button>
              </a>

              <Link to="contact" smooth duration={600} offset={-80}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-ghost"
                >
                  Contact Me
                </motion.button>
              </Link>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex justify-center lg:justify-start gap-3"
            >
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl glass-card transition-all duration-200 hover:border-green-500/40"
                  style={{ color: 'var(--text-secondary)' }}
                  aria-label={s.label}
                >
                  <s.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Stats card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="glass-card rounded-2xl p-8 w-72"
              >
                {/* Profile avatar placeholder */}
                <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(34,211,238,0.2))',
                    border: '1px solid rgba(74,222,128,0.3)',
                    color: '#4ade80',
                  }}>
                  HR
                </div>

                <div className="text-center mb-6">
                  <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Hemant Raj</p>
                  <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>NIT Patna • CSE</p>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  {stats.map((s) => (
                    <div key={s.label}
                      className="flex justify-between items-center py-2.5 px-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
                      <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                      <span className="text-sm font-bold gradient-text-green">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Availability badge */}
                <div className="mt-5 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2"
                  style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-medium text-green-400">Available for Internship</span>
                </div>
              </motion.div>

              {/* Decorative blobs behind card */}
              <div className="absolute -inset-4 rounded-3xl opacity-20 -z-10"
                style={{ background: 'radial-gradient(circle at 50% 50%, #4ade80, transparent 70%)' }} />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono tracking-widest" style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiArrowDown size={16} style={{ color: '#4ade80' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}