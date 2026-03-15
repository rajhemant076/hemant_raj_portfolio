import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiLayers, FiDatabase, FiShield, FiServer } from 'react-icons/fi';
import SectionWrapper from '../SectionWrapper';
import { projects } from '../../data/portfolio';

const colorMap = {
  green: { glow: 'rgba(74,222,128,0.15)', border: 'rgba(74,222,128,0.2)', text: '#4ade80', bg: 'rgba(74,222,128,0.08)' },
  cyan: { glow: 'rgba(34,211,238,0.15)', border: 'rgba(34,211,238,0.2)', text: '#22d3ee', bg: 'rgba(34,211,238,0.08)' },
};

function ArchRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <Icon size={13} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span className="text-xs font-medium ml-auto" style={{ color: 'var(--text-primary)' }}>{value}</span>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [flipped, setFlipped] = useState(false);
  const c = colorMap[project.color] || colorMap.green;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative perspective-1000"
    >
      <div
        className="project-card relative glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
        style={{ minHeight: '480px' }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
      >
        {/* Card gradient top strip */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${c.text}, transparent)` }} />

        <AnimatePresence mode="wait">
          {!flipped ? (
            <motion.div
              key="front"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="p-8 h-full flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-mono mb-3"
                    style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
                    Project 0{project.id}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{project.tagline}</p>
                </div>
                {/* Glow dot */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: c.text, boxShadow: `0 0 10px ${c.text}` }} />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6 flex-1">
                {project.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: c.text }} />
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map(t => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="btn-ghost text-xs flex items-center gap-2 flex-1 justify-center"
                  onClick={e => e.stopPropagation()}>
                  <FiGithub size={14} />
                  GitHub
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="btn-outline text-xs flex items-center gap-2 flex-1 justify-center"
                  style={{ borderColor: c.border, color: c.text }}
                  onClick={e => e.stopPropagation()}>
                  <FiExternalLink size={14} />
                  Live Demo
                </a>
              </div>

              {/* Hover hint */}
              <p className="text-center text-xs mt-4 opacity-40 font-mono" style={{ color: 'var(--text-secondary)' }}>
                hover → architecture
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="p-8 h-full flex flex-col"
              style={{ background: `linear-gradient(135deg, ${c.bg} 0%, transparent 100%)` }}
            >
              <p className="text-xs font-mono mb-6" style={{ color: c.text }}>
                // architecture.{project.title.toLowerCase().replace(' ', '_')}
              </p>
              <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                System Architecture
              </h3>

              <div className="space-y-1 flex-1">
                <ArchRow icon={FiLayers} label="Frontend" value={project.architecture.frontend} />
                <ArchRow icon={FiServer} label="Backend" value={project.architecture.backend} />
                <ArchRow icon={FiShield} label="Auth" value={project.architecture.auth} />
                <ArchRow icon={FiDatabase} label="Database" value={project.architecture.database} />
                <ArchRow icon={FiExternalLink} label="Deploy" value={project.architecture.deploy} />
              </div>

              {/* Flow diagram */}
              <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 text-xs font-mono flex-wrap" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: c.text }}>Client</span>
                  <span>→</span>
                  <span style={{ color: '#22d3ee' }}>API</span>
                  <span>→</span>
                  <span style={{ color: '#a78bfa' }}>Auth</span>
                  <span>→</span>
                  <span style={{ color: '#fbbf24' }}>DB</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="btn-ghost text-xs flex items-center gap-2 flex-1 justify-center"
                  onClick={e => e.stopPropagation()}>
                  <FiGithub size={14} />
                  GitHub
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="btn-outline text-xs flex items-center gap-2 flex-1 justify-center"
                  style={{ borderColor: c.border, color: c.text }}
                  onClick={e => e.stopPropagation()}>
                  <FiExternalLink size={14} />
                  Live Demo
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <div className="section-tag mb-6">Projects</div>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-16">
        <h2 className="section-heading mb-0" style={{ color: 'var(--text-primary)' }}>
          Featured <span className="gradient-text">work</span>
        </h2>
        <p className="text-base pb-1 ml-0 md:ml-4" style={{ color: 'var(--text-secondary)' }}>
          Hover cards to reveal system architecture.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}