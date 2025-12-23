import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
        >
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px]"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-secondary/20 blur-[120px]"
            />
          </div>

          <div className="relative z-10 text-center space-y-10">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative inline-block"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-4 rounded-full border border-dashed border-primary/30"
              />
              <div className="relative w-28 h-28 bg-white dark:bg-card rounded-3xl flex items-center justify-center shadow-2xl border border-white/20">
                <div className="absolute inset-0 gradient-primary opacity-10 rounded-3xl" />
                <GraduationCap className="w-14 h-14 text-primary" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 bg-secondary p-1.5 rounded-lg shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="space-y-4">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-6xl font-black bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent tracking-tighter"
              >
                Faculty Quest
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-muted-foreground font-medium tracking-widest uppercase text-xs md:text-sm"
              >
                {window.location.pathname.includes('/student') ? "Student Portal" : "Faculty Portal"}
              </motion.p>
            </div>

            {/* Progress Bar Container */}
            <div className="w-72 mx-auto space-y-4">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden p-[1px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full gradient-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={Math.floor(progress / 20)}
                className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]"
              >
                {progress < 30 && "Loading App..."}
                {progress >= 30 && progress < 60 && "Connecting..."}
                {progress >= 60 && progress < 90 && "Preparing..."}
                {progress >= 90 && "Ready!"}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

