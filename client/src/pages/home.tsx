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
  Phone, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Twitter
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, type LeadInput } from "@shared/routes";
import { useCreateLead } from "@/hooks/use-leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Helper components for animation
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
              <a href="#services" className="text-sm font-bold uppercase tracking-widest text-white/50 hover:text-primary transition-colors">Services</a>
              <a href="#equipe" className="text-sm font-bold uppercase tracking-widest text-white/50 hover:text-primary transition-colors">Équipe</a>
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
          <div className="max-w-5xl mx-auto w-full">
            <FadeIn>
              <div className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8">
                Agence Publicitaire Haute Performance
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black leading-[1.05] tracking-tighter mb-8 italic">
                Votre CA <span className="text-primary text-glow">explose.</span><br />
                <span className="text-white/40">Ou on ne travaille</span><br />
                <span className="text-white/40">pas ensemble.</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2} className="max-w-3xl">
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-12">
                <strong className="text-white font-medium">Vuko</strong> est l'agence qui fait croître le chiffre d'affaires des entreprises grâce à un système publicitaire complet et redoutable — fini les acteurs UGC filmés à la va-vite, fini les vidéos qui ne convertissent pas. <span className="text-white">On crée des ads qui vendent.</span>
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <a href="#contact" className="inline-block">
                <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(198,252,3,0.5)]">
                  Boostez votre CA <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </FadeIn>
          </div>
        </section>

        {/* PROBLEM / SOLUTION SECTION */}
        <section className="py-32 px-6 bg-black relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <FadeIn>
                <div className="p-10 md:p-14 rounded-[2rem] border border-white/5 bg-white/[0.02] h-full">
                  <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-8 border border-red-500/20">
                    <XOctagon className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-6 text-white/50">Avant Vuko</h3>
                  <ul className="space-y-6">
                    {["Pubs génériques qui se fondent dans la masse", "UGC sans âme et surjoué", "Vidéos qui coûtent cher mais n'apportent rien", "Budgets publicitaires gaspillés"].map((text, i) => (
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
                    <h3 className="text-3xl font-display font-bold mb-6 text-white">Avec Vuko</h3>
                    <ul className="space-y-6">
                      {[
                        "Un système complet d'ads pensé pour performer", 
                        "Créas impactantes qui arrêtent le scroll", 
                        "Ciblage laser sur vos acheteurs parfaits", 
                        "Optimisation continue et résultats explosifs"
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

        {/* SERVICES SECTION */}
        <section id="services" className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-display font-black mb-4 tracking-tighter uppercase italic">Ce qu'on fait<span className="text-primary">.</span></h2>
              <p className="text-xl text-muted-foreground mb-16 max-w-2xl">L'écosystème complet pour transformer des inconnus en clients fidèles.</p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Video className="w-8 h-8 text-primary" />,
                  title: "Publicités Vidéo Haute Performance",
                  desc: "Des vidéos conçues scientifiquement pour capter l'attention dans les 3 premières secondes et déclencher l'acte d'achat."
                },
                {
                  icon: <Target className="w-8 h-8 text-primary" />,
                  title: "Stratégie & Gestion Ads",
                  desc: "Déploiement sur Meta, TikTok, Google. On gère vos budgets comme si c'était les nôtres avec un seul focus : le ROAS."
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-primary" />,
                  title: "Contenu UGC Premium",
                  desc: "Des créateurs soigneusement castés pour produire des témoignages authentiques qui construisent une confiance instantanée."
                },
                {
                  icon: <RefreshCcw className="w-8 h-8 text-primary" />,
                  title: "Optimisation Continue",
                  desc: "A/B testing permanent de nos créas. On coupe ce qui perd, on scale agressivement ce qui gagne."
                }
              ].map((service, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group p-8 md:p-10 rounded-3xl glass-panel hover:bg-white/10 transition-all duration-500">
                    <div className="mb-6 bg-black/50 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-4">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section id="equipe" className="py-32 px-6 bg-black relative border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-display font-black mb-16 text-center tracking-tighter uppercase italic">L'Équipe d'Élite<span className="text-primary">.</span></h2>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Maxime Dubois", role: "CEO & Fondateur" },
                { name: "Sophie Martin", role: "Directeur Administratif & Financier (DAF)" },
                { name: "Lucas Bernard", role: "Monteur Vidéo Senior" },
                { name: "Thomas Petit", role: "Monteur Vidéo" },
                { name: "Emma Robert", role: "Stratégiste Ads" },
                { name: "Hugo Richard", role: "Account Manager" }
              ].map((member, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-300 group">
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-2xl font-display font-bold text-white/50 group-hover:text-primary group-hover:border-primary/50 transition-colors">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                    <p className="text-primary font-medium text-sm">{member.role}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight">
                Boostez votre CA <span className="text-primary">—</span><br />
                Parlons-en.
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-lg">
                Remplissez le formulaire ci-dessous. Si on sent qu'on peut exploser vos résultats, on vous recontacte sous 24h.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-6 h-6 mr-4 text-primary" />
                  <span className="text-lg">contact@vuko-agency.com</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-6 h-6 mr-4 text-primary" />
                  <span className="text-lg">Paris, France</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="glass-panel p-8 md:p-12 rounded-[2rem] shadow-2xl">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/70">Nom complet *</FormLabel>
                            <FormControl>
                              <Input placeholder="Jean Dupont" className="bg-black/50 border-white/10 h-14 rounded-xl focus-visible:ring-primary focus-visible:border-primary transition-all" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/70">Entreprise</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre société" className="bg-black/50 border-white/10 h-14 rounded-xl focus-visible:ring-primary focus-visible:border-primary transition-all" {...field} value={field.value || ''} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/70">Email pro *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jean@entreprise.com" className="bg-black/50 border-white/10 h-14 rounded-xl focus-visible:ring-primary focus-visible:border-primary transition-all" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/70">Téléphone</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+33 6 12 34 56 78" className="bg-black/50 border-white/10 h-14 rounded-xl focus-visible:ring-primary focus-visible:border-primary transition-all" {...field} value={field.value || ''} />
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
                          <FormLabel className="text-white/70">Votre challenge actuel *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Où en êtes-vous et où voulez-vous aller ?" 
                              className="bg-black/50 border-white/10 min-h-[150px] rounded-xl resize-none focus-visible:ring-primary focus-visible:border-primary transition-all" 
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
                      className="w-full h-16 text-lg font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 mt-4"
                    >
                      {isPending ? "Envoi en cours..." : "Soumettre la candidature"}
                    </Button>
                  </form>
                </Form>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display font-black text-2xl tracking-tighter text-white/50 flex items-center gap-2">
            <img src={logoPath} alt="VUKO" className="h-6 w-auto opacity-50 invert" />
          </div>
          
          <div className="flex items-center space-x-6 text-white/50">
            <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
          
          <div className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} VUKO Agency. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
