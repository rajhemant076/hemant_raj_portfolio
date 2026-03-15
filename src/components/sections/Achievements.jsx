import { motion } from 'framer-motion';
import { FiAward, FiCode, FiZap, FiStar } from 'react-icons/fi';
import { HiLightningBolt } from 'react-icons/hi';
import SectionWrapper from '../SectionWrapper';
import { achievements, certifications } from '../../data/portfolio';

const iconMap = {
  trophy: FiAward,
  code: FiCode,
  rocket: FiZap,
  star: FiStar,
};

const colorConfig = {
  amber:  { text: '#fbbf24', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.2)',  glow: 'rgba(251,191,36,0.15)' },
  green:  { text: '#4ade80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.2)',  glow: 'rgba(74,222,128,0.15)' },
  violet: { text: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)', glow: 'rgba(167,139,250,0.15)' },
  cyan:   { text: '#22d3ee', bg: 'rgba(34,211,238,0.08)',  border: 'rgba(34,211,238,0.2)',  glow: 'rgba(34,211,238,0.15)' },
  orange: { text: '#fb923c', bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.2)',  glow: 'rgba(251,146,60,0.15)' },
};

function AchievementCard({ item, index }) {
  const Icon = iconMap[item.icon] || FiStar;
  const c = colorConfig[item.color] || colorConfig.green;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card rounded-2xl p-6 group cursor-default transition-all duration-300 relative overflow-hidden"
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ background: `radial-gradient(circle at 30% 30%, ${c.glow}, transparent 70%)` }}
      />

      <div className="relative z-10">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}
        >
          <Icon size={20} style={{ color: c.text }} />
        </div>
        <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {item.title}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

function CertCard({ item, index }) {
  const c = colorConfig[item.color] || colorConfig.green;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ x: 4, transition: { duration: 0.2 } }}
      className="glass-card rounded-xl p-5 flex items-center gap-4 group cursor-default"
    >
      <div
        className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
        style={{ background: c.bg, border: `1px solid ${c.border}` }}
      >
        <HiLightningBolt size={16} style={{ color: c.text }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
        <p className="text-xs mt-0.5" style={{ color: c.text }}>{item.issuer}</p>
      </div>
      <div
        className="px-2 py-1 rounded-lg text-xs font-mono flex-shrink-0"
        style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
      >
        CERT
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <SectionWrapper id="achievements">
      <div className="section-tag mb-6">Recognition</div>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-16">
        <h2 className="section-heading mb-0" style={{ color: 'var(--text-primary)' }}>
          Achievements &amp; <span className="gradient-text">Certifications</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Achievements */}
        <div className="lg:col-span-2">
          
          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((a, i) => (
              <AchievementCard key={a.title} item={a} index={i} />
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          
          <div className="space-y-3">
            {certifications.map((c, i) => (
              <CertCard key={c.title} item={c} index={i} />
            ))}

            {/* LeetCode callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card rounded-xl p-5 mt-6"
              style={{ border: '1px solid rgba(74,222,128,0.2)' }}
            >
             
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold gradient-text-green">200+</span>
                <span className="text-sm pb-1" style={{ color: 'var(--text-secondary)' }}>problems</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                LeetCode · Java & C++ · DSA, Graphs, DP
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {['Arrays', 'Trees', 'Graphs', 'DP', 'Strings'].map(tag => (
                  <span key={tag} className="tech-badge text-[10px]">{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}