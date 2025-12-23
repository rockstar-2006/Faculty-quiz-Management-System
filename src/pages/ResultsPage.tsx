import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizAPI } from '@/services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, Clock, TrendingUp, ChevronRight, Activity, BarChart3, Database } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface QuizWithStats {
  _id: string;
  title: string;
  description?: string;
  duration?: number;
  createdAt: string;
  attemptCount: number;
  submittedCount: number;
  averageScore?: number;
}

export default function ResultsPage() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<QuizWithStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzesWithStats();
  }, []);

  const fetchQuizzesWithStats = async () => {
    try {
      setLoading(true);
      const response = await quizAPI.getAllWithStats();
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      toast.error('Sync failed: Analytics engine offline');
    } finally {
      setLoading(false);
    }
  };

  const handleViewResults = (quizId: string) => {
    navigate(`/quiz/${quizId}/results`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Processing Analytics...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 md:p-8 space-y-10 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-xs">
          <BarChart3 className="w-4 h-4" />
          Performance Intelligence
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
          Assessment <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Telemetry</span>
        </h1>
        <p className="text-muted-foreground text-lg font-medium max-w-3xl">
          Analyze real-time student performance metrics and engagement statistics across all deployed units.
        </p>
      </motion.div>

      {quizzes.length === 0 ? (
        <motion.div variants={itemVariants}>
          <Card className="shadow-elevated border-sidebar-border/50 glass-effect border-dashed">
            <CardContent className="py-24 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-muted-foreground/20">
                <Database className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tighter uppercase italic text-muted-foreground/80">Zero Telemetry</h3>
                <p className="font-bold uppercase text-[10px] tracking-[0.2em] text-muted-foreground/40">No assessment data detected in the current temporal frame.</p>
              </div>
              <Button onClick={() => navigate('/create-quiz')} className="gradient-primary h-12 shadow-glow font-black uppercase tracking-widest">
                Deploy Assessment
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz, idx) => (
            <motion.div
              key={quiz._id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onClick={() => handleViewResults(quiz._id)}
              className="cursor-pointer"
            >
              <Card className="shadow-elevated border-sidebar-border/50 bg-card/40 backdrop-blur-md group hover:border-primary/30 transition-all overflow-hidden relative h-full flex flex-col">
                <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-primary transition-all duration-300" />
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <Badge className="bg-muted text-muted-foreground text-[8px] font-black uppercase tracking-widest border-sidebar-border shadow-none">
                      {new Date(quiz.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-black tracking-tight mt-4 line-clamp-2 uppercase group-hover:text-primary transition-colors">
                    {quiz.title}
                  </CardTitle>
                  {quiz.description && (
                    <CardDescription className="line-clamp-2 text-xs font-semibold leading-relaxed mt-1 opacity-60">
                      {quiz.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <div className="space-y-4 pt-4 border-t border-sidebar-border/20">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Engagements</p>
                        <div className="flex items-center gap-2">
                          <Users className="h-3.5 w-3.5 text-primary" />
                          <span className="font-black text-sm">{quiz.attemptCount}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Avg Score</p>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3.5 w-3.5 text-secondary" />
                          <span className="font-black text-sm">{quiz.averageScore !== undefined ? `${quiz.averageScore.toFixed(1)}%` : '0%'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest pt-4 text-muted-foreground/40">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {quiz.duration || 30} MINS
                      </div>
                      <div className="flex items-center gap-1.5 group-hover:text-primary transition-colors">
                        INSPECT RESULTS <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
