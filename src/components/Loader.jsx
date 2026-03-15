import { motion } from 'framer-motion';

export default function Loader({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#050709' }}
    >
      {/* Animated logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
          style={{
            background: 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(34,211,238,0.2))',
            border: '1px solid rgba(74,222,128,0.3)',
            color: '#4ade80',
          }}>
          HR
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: 'linear-gradient(90deg, #4ade80, #22d3ee)' }}
          onAnimationComplete={onComplete}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xs font-mono mt-4"
        style={{ color: 'rgba(255,255,255,0.2)' }}
      >
        hemant.dev
      </motion.p>
    </motion.div>
  );
}