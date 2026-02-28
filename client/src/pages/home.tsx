import { motion } from "framer-motion";
import logoPath from "@assets/image_1772238017146.png";
import { 
  ArrowRight, 
  TrendingUp, 
  Video, 
  Target, 
  RefreshCcw, 
  CheckCircle2, 
  XOctagon, 
  Mail, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Twitter,
  ChevronRight,
  Zap,
  BarChart3
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, type LeadInput } from "@shared/routes";
import { useCreateLead } from "@/hooks/use-leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const { mutate: createLead, isPending } = useCreateLead();

  const form = useForm<LeadInput>({
    resolver: zodResolver(api.leads.create.input),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: LeadInput) => {
    createLead(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="font-display font-black text-2xl tracking-tighter flex items-center gap-2">
              <img src={logoPath} alt="VUKO" className="h-8 w-auto invert" />
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-sm font-bold uppercase tracking-widest text-white/50 hover:text-primary transition-colors">Stratégie</a>
              <a href="#results" className="text-sm font-bold uppercase tracking-widest text-white/50 hover:text-primary transition-colors">Résultats</a>
              <a href="#contact" className="text-sm font-bold uppercase tracking-widest text-white/50 hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          <a href="#contact">
            <Button className="rounded-full font-bold px-6 bg-white text-black hover:bg-primary hover:text-black transition-all duration-300">
              Parlons-en
            </Button>
          </a>
        </div>
      </nav>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center px-6 pt-20">
          <div className="max-w-5xl mx-auto w-full text-center">
            <FadeIn>
              <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8">
                L'Agence N°1 de Croissance Publicitaire
              </div>
              <h1 className="text-5xl md:text-8xl lg:text-[7.5rem] font-black leading-[1.05] tracking-tighter mb-8 italic">
                Nous augmentons le <span className="text-primary text-glow">chiffre d'affaires.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 font-light tracking-tight mb-12 max-w-2xl mx-auto">
                Pas du trafic. Pas des likes. <span className="text-white font-medium italic">Du revenu.</span>
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a href="#contact" className="inline-block">
                  <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(198,252,3,0.5)]">
                    Audit Gratuit <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-white/40">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Déjà +45M€ générés pour nos clients
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 2 — PROBLÈME */}
        <section className="py-32 px-6 bg-black relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <FadeIn>
                <div className="p-10 md:p-14 rounded-[2rem] border border-white/5 bg-white/[0.02] h-full">
                  <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-8 border border-red-500/20">
                    <XOctagon className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-6 text-white/50">La majorité échoue</h3>
                  <ul className="space-y-6">
                    {["Budgets gaspillés sans structure", "Campagnes non rentables", "Dépendance au hasard", "UGC sans âme"].map((text, i) => (
                      <li key={i} className="flex items-start text-muted-foreground text-lg">
                        <span className="mr-4 mt-1.5 text-white/20">—</span> {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="p-10 md:p-14 rounded-[2rem] border border-primary/20 bg-primary/[0.02] box-glow h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-8 border border-primary/30">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-6 text-white italic uppercase">La Méthode VUKO</h3>
                    <ul className="space-y-6">
                      {[
                        "Pilotage exclusif par le ROAS", 
                        "Funnel de conversion optimisé", 
                        "Scale agressif sur le profit", 
                        "Ads qui vendent réellement"
                      ].map((text, i) => (
                        <li key={i} className="flex items-start text-white text-lg font-medium">
                          <CheckCircle2 className="mr-4 mt-1 text-primary shrink-0 w-5 h-5" /> {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* SECTION 3 — RÉSULTATS */}
        <section id="results" className="py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-20">
              {[
                { val: "+142%", label: "Croissance moyenne" },
                { val: "x5.8", label: "ROAS moyen" },
                { val: "2.4M€", label: "Scale mensuel record" }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 italic text-primary text-glow">{item.val}</div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">{item.label}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — SERVICES */}
        <section id="about" className="py-32 px-6 relative border-y border-white/5">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <FadeIn>
              <h2 className="text-4xl md:text-7xl font-display font-black mb-4 tracking-tighter italic uppercase">VUKO transformera votre business<span className="text-primary">.</span></h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic">Seulement pour les entreprises prêtes à dominer leur marché.</p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Video />, title: "Ads Haute Performance", desc: "Création de publicités conçues pour arrêter le scroll et vendre." },
              { icon: <Target />, title: "Gestion Stratégique", desc: "Pilotage d'élite sur Meta, TikTok et Google Ads." },
              { icon: <Zap />, title: "Scale Agressif", desc: "Nous scalons uniquement ce qui génère du profit net." },
              { icon: <BarChart3 />, title: "Audit & Optimisation", desc: "Analyse profonde et optimisation continue du funnel." }
            ].map((service, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group p-8 rounded-[2rem] glass-panel hover:bg-white/10 transition-all duration-500 h-full border-white/5">
                  <div className="mb-6 bg-black/50 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold font-display mb-4 uppercase tracking-tighter">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* SECTION 5 — CONTACT */}
        <section id="contact" className="py-40 px-6 relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <FadeIn>
              <h2 className="text-4xl md:text-8xl font-display font-black mb-8 leading-tight italic uppercase">
                Prêt à exploser ?<br />
                Parlons-en.
              </h2>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="max-w-2xl mx-auto glass-panel p-8 md:p-12 rounded-[2.5rem] shadow-2xl border-white/10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="VOTRE NOM" className="bg-black/50 border-white/10 h-14 rounded-xl placeholder:text-white/20 font-bold text-xs tracking-widest uppercase focus-visible:ring-primary focus-visible:border-primary transition-all" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="EMAIL PROFESSIONNEL" className="bg-black/50 border-white/10 h-14 rounded-xl placeholder:text-white/20 font-bold text-xs tracking-widest uppercase focus-visible:ring-primary focus-visible:border-primary transition-all" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="VOTRE CHALLENGE ACTUEL" 
                            className="bg-black/50 border-white/10 min-h-[120px] rounded-xl placeholder:text-white/20 font-bold text-xs tracking-widest uppercase resize-none focus-visible:ring-primary focus-visible:border-primary transition-all" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full h-16 text-lg font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(198,252,3,0.3)]"
                  >
                    {isPending ? "ENVOI EN COURS..." : "RÉSERVER MON AUDIT GRATUIT"}
                  </Button>
                </form>
              </Form>
            </div>
          </FadeIn>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <img src={logoPath} alt="VUKO" className="h-6 w-auto invert opacity-50" />
          </div>
          
          <div className="flex items-center space-x-8 text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          </div>
          
          <div className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} VUKO. NOUS CRÉONS LA CROISSANCE.
          </div>
        </div>
      </footer>
    </div>
  );
}
