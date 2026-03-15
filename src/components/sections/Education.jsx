import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiCalendar, FiAward } from 'react-icons/fi';
import { HiAcademicCap } from 'react-icons/hi';
import SectionWrapper from '../SectionWrapper';
import { education } from '../../data/portfolio';

const typeConfig = {
  university: { color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.2)' },
  school: { color: '#22d3ee', bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.2)' },
};

function TimelineItem({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const cfg = typeConfig[item.type] || typeConfig.school;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-16 pb-12 last:pb-0"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-0 w-12 h-12 rounded-xl flex items-center justify-center z-10"
        style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
      >
        <HiAcademicCap size={20} style={{ color: cfg.color }} />
      </div>

      {/* Connector line */}
      {index < education.length - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
          className="absolute left-6 top-12 w-px origin-top"
          style={{
            height: 'calc(100% - 12px)',
            background: `linear-gradient(to bottom, ${cfg.color}50, transparent)`,
            transform: 'translateX(-0.5px)',
          }}
        />
      )}

      {/* Card */}
      <div className="glass-card rounded-2xl p-6 hover:border-white/10 transition-all duration-300 group">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold leading-snug mb-1" style={{ color: 'var(--text-primary)' }}>
              {item.degree}
            </h3>
            <p className="text-sm font-semibold" style={{ color: cfg.color }}>
              {item.institution}
            </p>
          </div>
          <div
            className="flex-shrink-0 px-3 py-1.5 rounded-xl text-center"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
          >
            <p className="text-sm font-bold" style={{ color: cfg.color }}>{item.score}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-1.5">
            <FiCalendar size={12} style={{ color: 'var(--text-secondary)' }} />
            <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{item.period}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiMapPin size={12} style={{ color: 'var(--text-secondary)' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiAward size={12} style={{ color: cfg.color }} />
            <span className="text-xs font-medium" style={{ color: cfg.color }}>{item.score}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <SectionWrapper id="education">
      <div className="grid lg:grid-cols-5 gap-16">
        {/* Left: heading */}
        <div className="lg:col-span-2">
          <div className="section-tag mb-6">Education</div>
          <h2 className="section-heading" style={{ color: 'var(--text-primary)' }}>
            Academic <br />
            <span className="gradient-text">journey</span>
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
            Strong academic foundation at one of India's premier technical institutes with consistent top performance.
          </p>

          {/* GPA spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6 inline-block"
          >
            
            <p className="text-5xl font-bold gradient-text-green">9.05</p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              B.Tech CSE · NIT Patna
            </p>
          </motion.div>
        </div>

        {/* Right: timeline */}
        <div className="lg:col-span-3">
          {education.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}