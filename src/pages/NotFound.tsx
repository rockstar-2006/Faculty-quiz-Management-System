import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Home, ChevronRight, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--muted-foreground)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Central Content */}
      <div className="relative z-10 w-full max-w-2xl p-8 space-y-12">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-destructive font-black uppercase tracking-[0.3em] text-[10px]"
          >
            <AlertTriangle className="w-4 h-4" />
            System Runtime Exception: 404
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/20">
              LOST<span className="text-destructive">_</span>SIGNAL
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground font-bold uppercase text-xs tracking-widest pl-2">
              <CornerDownRight className="w-4 h-4 text-primary" />
              Resource locator failed to resolve target coordinate
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid gap-6 md:grid-cols-2"
        >
          <div className="p-6 rounded-3xl border border-sidebar-border/50 bg-muted/20 space-y-4 group hover:border-primary/30 transition-all cursor-default">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black uppercase text-[10px] tracking-widest">Base Return</h3>
              <p className="text-xs text-muted-foreground font-medium mt-1 leading-relaxed">Return to the secure main repository console.</p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full h-10 border-sidebar-border font-black uppercase text-[10px] tracking-widest group-hover:bg-primary group-hover:text-white transition-all shadow-sm"
            >
              INITIALIZE HOME <ChevronRight className="w-3 h-3 ml-2" />
            </Button>
          </div>

          <div className="p-6 rounded-3xl border border-sidebar-border/50 bg-muted/20 space-y-4 group hover:border-destructive/30 transition-all cursor-default relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <AlertTriangle className="w-16 h-16" />
            </div>
            <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black uppercase text-[10px] tracking-widest">Diagnostics</h3>
              <p className="text-xs text-muted-foreground font-medium mt-1 leading-relaxed">The coordinate <span className="text-destructive/60 font-mono italic">"{window.location.pathname}"</span> does not exist.</p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full h-10 border-sidebar-border font-black uppercase text-[10px] tracking-widest group-hover:bg-destructive group-hover:text-white transition-all shadow-sm"
            >
              EXECUTE ROLLBACK <ChevronRight className="w-3 h-3 ml-2" />
            </Button>
          </div>
        </motion.div>

        {/* Footer Hardware Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="pt-8 flex flex-wrap gap-8 justify-center border-t border-sidebar-border/30"
        >
          {['LATENCY: 0.00ms', 'NODE: FACULTY_QUEST_CORE', 'STATUS: ERR_RESOURCE_NOT_FOUND'].map((stat, idx) => (
            <div key={idx} className="font-mono text-[8px] font-bold tracking-[0.2em] text-muted-foreground/40 italic">
              {stat}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Subtle Side Ornaments */}
      <div className="absolute top-1/2 -left-12 -translate-y-1/2 vertical-text font-black text-muted-foreground/5 text-[120px] tracking-tighter pointer-events-none">
        404_PAGE
      </div>
    </div>
  );
};

export default NotFound;
