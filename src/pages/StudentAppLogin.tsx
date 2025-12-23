import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Lock, Mail, User, Shield, Eye, EyeOff, Sparkles, ChevronRight, Activity, BadgeCheck, GraduationCap } from 'lucide-react';
import { studentAuthAPI } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const StudentAppLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    usn: '',
    branch: '',
    year: '',
    semester: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await studentAuthAPI.login(loginData.email, loginData.password);
      localStorage.setItem('studentToken', response.data.token);
      localStorage.setItem('studentData', JSON.stringify(response.data.student));
      toast.success('Login Successful: Welcome back!');
      navigate('/student/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Authentication Protocol Failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      const response = await studentAuthAPI.register({
        email: registerData.email,
        password: registerData.password,
        name: registerData.name,
        usn: registerData.usn,
        branch: registerData.branch,
        year: registerData.year,
        semester: registerData.semester
      });
      localStorage.setItem('studentToken', response.data.token);
      localStorage.setItem('studentData', JSON.stringify(response.data.student));
      toast.success('Account Created: Welcome to the Student Portal');
      navigate('/student/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update Failed: Please check your details');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as any,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="h-full w-full bg-background relative flex items-center justify-center p-6 pt-safe pb-safe overflow-y-auto [transform:translateZ(0)]">
      {/* Dynamic Background - Optimized for Android */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] [will-change:opacity] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/3 rounded-full blur-[120px] [will-change:opacity] animate-pulse-slow delay-1000" />
        <div className="absolute inset-0 opacity-[0.02] grayscale pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-md px-4 relative z-10 my-auto"
      >
        {/* Terminal Header */}
        <motion.div variants={itemVariants} className="text-center mb-10 space-y-4">
          <div className="inline-flex relative group">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-20 h-20 rounded-3xl bg-card border border-sidebar-border/50 shadow-elevated flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <GraduationCap className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-white shadow-glow border-4 border-background">
              <Shield className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              SmartQuiz <span className="text-primary not-italic">App</span>
            </h1>
            <div className="flex items-center justify-center gap-3 text-muted-foreground font-black uppercase tracking-[0.3em] text-[10px]">
              <Activity className="w-3 h-3 text-primary" />
              Student Portal Access
              <Activity className="w-3 h-3 text-primary" />
            </div>
          </div>
        </motion.div>

        <Card className="border-sidebar-border/50 shadow-elevated bg-card/60 backdrop-blur-xl overflow-hidden [transform:translateZ(0)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />

          <CardHeader className="p-8 pb-4 text-center">
            <CardTitle className="text-2xl font-black tracking-tight uppercase italic">Secure Login</CardTitle>
            <CardDescription className="font-bold uppercase text-[10px] tracking-widest opacity-60">
              Enter your credentials to access your student portal
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 pt-0">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/30 p-1 rounded-xl border border-sidebar-border/50 h-14">
                <TabsTrigger
                  value="login"
                  className="rounded-lg font-black uppercase text-[10px] tracking-widest data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="rounded-lg font-black uppercase text-[10px] tracking-widest data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="login">
                  <motion.form
                    key="login-form"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onSubmit={handleLogin}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 pl-1">Email Address</Label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            type="email"
                            placeholder="student@college.edu"
                            className="pl-12 h-14 bg-muted/20 border-sidebar-border/50 focus:ring-primary/20 font-bold uppercase text-xs tracking-wider"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 pl-1">Password</Label>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••••••"
                            className="pl-12 pr-12 h-14 bg-muted/20 border-sidebar-border/50 focus:ring-primary/20 font-bold text-xs tracking-wider"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full h-14 gradient-primary shadow-glow font-black uppercase tracking-widest text-sm group">
                      {isLoading ? (
                        <Activity className="w-5 h-5 animate-spin" />
                      ) : (
                        <span className="flex items-center gap-2">
                          Sign In <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </motion.form>
                </TabsContent>

                <TabsContent value="register">
                  <motion.form
                    key="register-form"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onSubmit={handleRegister}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-4 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest">Full Name</Label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            placeholder="Enter your name"
                            className="pl-12 h-12 bg-muted/20 border-sidebar-border/50 uppercase font-bold text-xs"
                            value={registerData.name}
                            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest">Email Address</Label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="pl-12 h-12 bg-muted/20 border-sidebar-border/50 uppercase font-bold text-xs"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest">Student ID (USN)</Label>
                          <Input
                            placeholder="ID Number"
                            className="h-12 bg-muted/20 border-sidebar-border/50 uppercase font-bold text-xs"
                            value={registerData.usn}
                            onChange={(e) => setRegisterData({ ...registerData, usn: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest">Branch</Label>
                          <Input
                            placeholder="CSE / ECE"
                            className="h-12 bg-muted/20 border-sidebar-border/50 uppercase font-bold text-xs"
                            value={registerData.branch}
                            onChange={(e) => setRegisterData({ ...registerData, branch: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest">Academic Year</Label>
                          <Input
                            placeholder="Year"
                            className="h-12 bg-muted/20 border-sidebar-border/50 uppercase font-bold text-xs"
                            value={registerData.year}
                            onChange={(e) => setRegisterData({ ...registerData, year: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest">Semester</Label>
                          <Input
                            placeholder="Sem"
                            className="h-12 bg-muted/20 border-sidebar-border/50 uppercase font-bold text-xs"
                            value={registerData.semester}
                            onChange={(e) => setRegisterData({ ...registerData, semester: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest">Access Password</Label>
                        <Input
                          type="password"
                          className="h-12 bg-muted/20 border-sidebar-border/50 font-bold text-xs"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest">Verify Password</Label>
                        <Input
                          type="password"
                          className="h-12 bg-muted/20 border-sidebar-border/50 font-bold text-xs"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full h-14 gradient-secondary shadow-glow font-black uppercase tracking-widest text-sm group">
                      {isLoading ? (
                        <Activity className="w-5 h-5 animate-spin" />
                      ) : (
                        <span className="flex items-center gap-2">
                          Create Account <BadgeCheck className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </motion.form>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </CardContent>
        </Card>

        {/* Security Footer */}
        <motion.div variants={itemVariants} className="mt-8 space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground/60 font-black uppercase tracking-[0.2em] text-[8px]">
            <Shield className="w-3 h-3 text-emerald-500" />
            Protected Connection Active
            <Shield className="w-3 h-3 text-emerald-500" />
          </div>
          <p className="text-center text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest leading-relaxed px-4 md:px-10">
            Your session is secure. All activity is logged for academic integrity.
            <span className="text-destructive/50 ml-1">Any attempt to exit the quiz may lead to disqualification.</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentAppLogin;
