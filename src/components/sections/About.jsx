import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiJavascript,
  SiHtml5, SiCss, SiGit, SiMysql, SiPython
} from 'react-icons/si';
import SectionWrapper from '../SectionWrapper';

const techIcons = [
  { icon: SiReact, name: 'React', color: '#61DAFB' },
  { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
  { icon: SiExpress, name: 'Express', color: '#ffffff' },
  { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
  { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
  { icon: SiHtml5, name: 'HTML5', color: '#E34F26' },
  { icon: SiCss, name: 'CSS3', color: '#1572B6' },
  { icon: SiGit, name: 'Git', color: '#F05032' },
  { icon: SiMysql, name: 'MySQL', color: '#4479A1' },
  { icon: SiPython, name: 'Python', color: '#3776AB' },
];

const highlights = [
  { label: 'Full-Stack', desc: 'React + Node.js + MongoDB' },
  { label: 'Problem Solver', desc: '200+ LeetCode problems' },
  { label: 'Team Player', desc: 'Hackathon participant' },
  { label: 'Fast Learner', desc: 'CGPA 9.05 @ NIT Patna' },
];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: text */}
        <div>
          <div className="section-tag mb-6">About Me</div>
          <h2 className="section-heading" style={{ color: 'var(--text-primary)' }}>
            Building things <br />
            <span className="gradient-text">that matter</span>
          </h2>
          <div className="space-y-4 mb-8" style={{ color: 'var(--text-secondary)' }}>
            
            <p className="text-base leading-relaxed">
             I am a Computer Science undergraduate at <strong style={{ color: 'var(--text-primary)' }}>NIT Patna</strong> with a strong focus on full-stack development and problem solving. I enjoy building scalable web applications using technologies like React, Node.js, Express, and MongoDB, and designing clean RESTful APIs with secure authentication.
            </p>
            <p className="text-base leading-relaxed">
              I have developed projects such as Campus Share, a MERN-based resource sharing platform that improves academic resource discovery, and Road Raptors, a ride-sharing platform with multi-role architecture and an admin analytics dashboard. Alongside development, I actively practice Data Structures and Algorithms, solving 200+ problems on LeetCode, which strengthens my algorithmic thinking and system design skills.
            </p>
             
          </div>

          {/* Highlight chips */}
          <div className="grid grid-cols-2 gap-3">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card p-4 rounded-xl"
              >
                <p className="font-bold text-sm mb-1 gradient-text-green">{h.label}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: tech stack */}
        <div ref={ref}>
          <div className="glass-card rounded-2xl p-8">
            
            <div className="grid grid-cols-5 gap-4">
              {techIcons.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.15, y: -4 }}
                  className="flex flex-col items-center gap-2 cursor-default group"
                  title={tech.name}
                >
                  <div className="p-3 rounded-xl transition-all duration-200 group-hover:shadow-glow-green"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                    <tech.icon size={22} style={{ color: tech.color }} />
                  </div>
                  <span className="text-[10px] text-center font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
             
              <div className="flex flex-wrap gap-2">
                {['REST APIs', 'JWT Auth', 'Bcrypt', 'GridFS', 'DSA', 'OOP', 'DBMS'].map(tag => (
                  <span key={tag} className="tech-badge">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}