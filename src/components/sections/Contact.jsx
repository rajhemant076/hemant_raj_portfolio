import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from 'emailjs-com';
import { FiGithub, FiLinkedin, FiMail, FiSend, FiCheck, FiAlertCircle, FiMapPin } from 'react-icons/fi';
import SectionWrapper from '../SectionWrapper';
import { personalInfo } from '../../data/portfolio';

// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID  = 'service_xn1p5z7';
const EMAILJS_TEMPLATE_ID = 'template_xjvfcnd';
const EMAILJS_PUBLIC_KEY  = 'ssekROXspeYdtf-7Z';

const socials = [
  { icon: FiGithub,   label: 'GitHub',   href: personalInfo.github,              handle: '@rajhemant076' },
  { icon: FiLinkedin, label: 'LinkedIn',  href: personalInfo.linkedin,            handle: '/in/hemantraj1401' },
  { icon: FiMail,     label: 'Email',     href: `mailto:${personalInfo.email}`,   handle: personalInfo.email },
];

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <SectionWrapper id="contact">
      <div className="section-tag mb-6">Contact</div>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-16">
        <h2 className="section-heading mb-0" style={{ color: 'var(--text-primary)' }}>
          Let's <span className="gradient-text">connect</span>
        </h2>
        <p className="text-base pb-1 ml-0 md:ml-4" style={{ color: 'var(--text-secondary)' }}>
          Open to internships, projects, and collabs.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Left: info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Intro */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-green-400">Available for opportunities</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I'm currently looking for software engineering internships. Whether you have a question, a project idea, or just want to say hi — my inbox is always open.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <FiMapPin size={13} style={{ color: 'var(--text-secondary)' }} />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{personalInfo.location}</span>
            </div>
          </div>

          {/* Social links */}
          <div className="space-y-3">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="glass-card rounded-xl p-4 flex items-center gap-4 group transition-all duration-200 hover:border-green-500/20 block"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-green-500/10"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
                  <s.icon size={16} style={{ color: '#4ade80' }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{s.label}</p>
                  <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{s.handle}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-3">
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="glass-card rounded-2xl p-8 space-y-5">
              

              {/* Name */}
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Your name"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/10"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${errors.name ? '#f87171' : 'var(--border)'}`,
                    color: 'var(--text-primary)',
                  }}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/10"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${errors.email ? '#f87171' : 'var(--border)'}`,
                    color: 'var(--text-primary)',
                  }}
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Hi Hemant, I'd love to discuss..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/10 resize-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${errors.message ? '#f87171' : 'var(--border)'}`,
                    color: 'var(--text-primary)',
                  }}
                />
                {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={status === 'idle' ? { scale: 1.01 } : {}}
                whileTap={status === 'idle' ? { scale: 0.99 } : {}}
                className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: status === 'success'
                    ? 'linear-gradient(135deg, #166534, #15803d)'
                    : status === 'error'
                    ? 'linear-gradient(135deg, #991b1b, #b91c1c)'
                    : 'linear-gradient(135deg, #4ade80, #22c55e)',
                  color: '#050709',
                  boxShadow: status === 'idle' ? '0 0 20px rgba(74,222,128,0.3)' : 'none',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  opacity: status === 'sending' ? 0.8 : 1,
                }}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2">
                      <FiSend size={15} /> Send Message
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full" />
                      Sending...
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }} className="flex items-center gap-2" style={{ color: '#f0fdf4' }}>
                      <FiCheck size={15} /> Message Sent!
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2" style={{ color: '#fef2f2' }}>
                      <FiAlertCircle size={15} /> Failed — Try Again
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              
            </div>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}