import { motion } from "framer-motion";
import logoPath from "@assets/image_1772238017146.png";
import { 
  ArrowRight, 
  TrendingUp, 
  Target, 
  RefreshCcw, 
  CheckCircle2, 
  XOctagon, 
  Mail, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Twitter,
  Zap,
  BarChart3,
  Search,
  ChevronRight
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, type LeadInput } from "@shared/routes";
import { useCreateLead } from "@/hooks/use-leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
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
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 bg-noise pointer-events-none z-50" />
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <img src={logoPath} alt="VUKO" className="h-5 w-auto invert" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Stratégie</a>
            <a href="#results" className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Résultats</a>
            <a href="#contact" className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Contact</a>
          </div>
          <a href="#contact">
            <Button variant="outline" className="h-9 px-5 rounded-none border-white/10 text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Audit Gratuit
            </Button>
          </a>
        </div>
      </nav>

      <main>
        {/* SECTION 1 — HERO */}
        <section className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <span className="inline-block mb-6 text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">
                Performance Marketing d'Élite
              </span>
              <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter leading-[0.9] uppercase italic">
                Nous augmentons le chiffre d'affaires des entreprises.
              </h1>
              <p className="text-xl md:text-2xl text-white/60 font-light tracking-tight mb-12 max-w-2xl mx-auto">
                Pas du trafic. Pas des likes. <span className="text-white font-medium italic">Du revenu.</span>
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a href="#contact">
                  <Button className="h-14 px-10 rounded-none bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-all group">
                    Obtenir un audit gratuit <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-white/40">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Déjà +45M€ générés pour nos clients
                </div>
              </div>
            </Reveal>
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"
            />
          </div>
        </section>

        {/* SECTION 2 — PROBLÈME */}
        <section className="py-32 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20">
              <Reveal>
                <h2 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter leading-none mb-8">
                  La majorité des entreprises font de la publicité. Très peu en tirent une vraie croissance.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="space-y-12">
                  {[
                    { label: "01", title: "Budgets gaspillés", desc: "Des milliers d'euros investis dans des campagnes sans structure claire ni objectif de rentabilité." },
                    { label: "02", title: "Campagnes non rentables", desc: "Un coût d'acquisition trop élevé qui étouffe vos marges et empêche tout passage à l'échelle." },
                    { label: "03", title: "Dépendance au hasard", desc: "Espérer que l'algorithme fasse le travail sans une stratégie créative et data-driven redoutable." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-8 group">
                      <span className="text-sm font-bold text-white/20 tracking-tighter">{item.label}</span>
                      <div>
                        <h3 className="text-xl font-bold uppercase tracking-tight mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                        <p className="text-white/40 leading-relaxed max-w-md">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* SECTION 3 — SOLUTION */}
        <section id="about" className="py-32 px-6 bg-white text-black">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-7xl font-bold uppercase italic tracking-tighter leading-[0.95] mb-20 max-w-4xl">
                Nous transformons la publicité en machine à cash.
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: <Zap />, title: "Pilotage par le ROAS", desc: "Chaque euro investi doit rapporter. Nous traquons la rentabilité réelle, pas les clics." },
                { icon: <BarChart3 />, title: "Funnels Optimisés", desc: "De l'ad à la page de vente, nous polissons chaque étape pour maximiser le taux de conversion." },
                { icon: <trendingUp />, title: "Scale Agressif", desc: "Dès que nous identifions un gagnant, nous augmentons les budgets sans dégrader la rentabilité." }
              ].map((item, i) => (
                <div key={i} className="space-y-6">
                  <div className="w-12 h-12 flex items-center justify-center border border-black/10">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tighter leading-none">{item.title}</h3>
                  <p className="text-black/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — RÉSULTATS */}
        <section id="results" className="py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-20">
              {[
                { val: "+142%", label: "Croissance moyenne du CA" },
                { val: "x5.8", label: "ROAS moyen sur nos comptes" },
                { val: "2.4M€", label: "Plus gros scale mensuel" }
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="text-center md:text-left">
                    <div className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 italic">{item.val}</div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">{item.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — MÉTHODE */}
        <section className="py-32 px-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter mb-20 text-center">Notre Méthode</h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-2">
              {[
                { step: "01", title: "Audit", desc: "Analyse profonde de votre setup actuel et identification des leviers de croissance immédiats." },
                { step: "02", title: "Optimisation", desc: "Refonte de la stratégie créative et technique pour stabiliser les performances." },
                { step: "03", title: "Scale", desc: "Déploiement massif pour capturer le marché et exploser vos parts de voix." }
              ].map((item, i) => (
                <div key={i} className="p-12 border border-white/5 hover:bg-white/5 transition-colors group">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/20 mb-8 block">{item.step}</span>
                  <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">{item.title}</h3>
                  <p className="text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — POSITIONNEMENT */}
        <section className="py-40 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-4xl md:text-7xl font-bold uppercase italic tracking-tighter leading-[0.9] mb-8">
                Nous ne travaillons pas avec tout le monde.
              </h2>
              <p className="text-xl md:text-2xl text-white/40 font-light tracking-tight">
                Seulement les entreprises prêtes à croître et à dominer leur marché.
              </p>
            </Reveal>
          </div>
        </section>

        {/* SECTION 7 — CALL TO ACTION */}
        <section id="contact" className="py-32 px-6 bg-white text-black relative">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal>
              <h2 className="text-4xl md:text-7xl font-bold uppercase italic tracking-tighter leading-[0.9] mb-12">
                Prêt à augmenter votre chiffre d’affaires ?
              </h2>
              <div className="max-w-xl mx-auto">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="VOTRE NOM" className="bg-transparent border-black/10 h-14 rounded-none placeholder:text-black/30 font-bold text-xs tracking-widest uppercase focus-visible:ring-black" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="EMAIL PROFESSIONNEL" className="bg-transparent border-black/10 h-14 rounded-none placeholder:text-black/30 font-bold text-xs tracking-widest uppercase focus-visible:ring-black" {...field} />
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
                            <FormControl>
                              <Input placeholder="SITE WEB / ENTREPRISE" className="bg-transparent border-black/10 h-14 rounded-none placeholder:text-black/30 font-bold text-xs tracking-widest uppercase focus-visible:ring-black" {...field} value={field.value || ''} />
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
                              className="bg-transparent border-black/10 min-h-[120px] rounded-none placeholder:text-black/30 font-bold text-xs tracking-widest uppercase resize-none focus-visible:ring-black" 
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
                      className="w-full h-16 bg-black text-white rounded-none font-bold uppercase tracking-[0.3em] text-xs hover:bg-black/90 transition-all mt-6"
                    >
                      {isPending ? "ENVOI..." : "Réserver un appel stratégique"}
                    </Button>
                  </form>
                </Form>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* SECTION 8 — FOOTER */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6">
            <img src={logoPath} alt="VUKO" className="h-4 w-auto invert opacity-50" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/20 max-w-xs leading-loose">
              NOUS NE FAISONS PAS DE MARKETING. NOUS AUGMENTONS LE CHIFFRE D'AFFAIRES.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Navigation</span>
              <div className="flex flex-col gap-2">
                <a href="#about" className="text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors">Stratégie</a>
                <a href="#results" className="text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors">Résultats</a>
                <a href="#contact" className="text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors">Audit</a>
              </div>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Social</span>
              <div className="flex flex-col gap-2">
                <a href="#" className="text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors">Instagram</a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
          <span>&copy; {new Date().getFullYear()} VUKO. ALL REVENUE RESERVED.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
