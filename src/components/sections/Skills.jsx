import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from '../SectionWrapper';
import { skills } from '../../data/portfolio';

const categories = [
  { key: 'languages', label: 'Programming Languages', color: '#4ade80' },
  { key: 'web', label: 'Web Technologies', color: '#22d3ee' },
  { key: 'databases', label: 'Databases', color: '#a78bfa' },
  { key: 'tools', label: 'Tools & Platforms', color: '#fbbf24' },
  { key: 'fundamentals', label: 'CS Fundamentals', color: '#f87171' },
];

function SkillBar({ name, level, color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{name}</span>
        <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.06 + 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 8px ${color}44` }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="section-tag mb-6">Skills</div>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-16">
        <h2 className="section-heading mb-0" style={{ color: 'var(--text-primary)' }}>
          Technical <span className="gradient-text">expertise</span>
        </h2>
        <p className="text-base pb-1 ml-0 md:ml-4" style={{ color: 'var(--text-secondary)' }}>
          Built through projects, courses, and competitive coding.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, catIdx) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: catIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-2xl p-6 hover:border-white/10 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}33` }}>
                <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
              </div>
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {cat.label}
              </h3>
            </div>

            {/* Skill bars */}
            <div className="space-y-4">
              {skills[cat.key].map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}