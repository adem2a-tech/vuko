import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import logoPath from "@assets/vuko-logo.png";
import { 
  ArrowRight, 
  TrendingUp, 
  TrendingDown,
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
  BarChart3,
  Clock,
  Layers,
  Lightbulb,
  Sparkles,
  Menu,
  X,
  MessageCircle
} from "lucide-react";
import { useCreateLead } from "@/hooks/use-leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TeamSection } from "@/components/ui/team-section";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const container = { hidden: { opacity: 0 }, visible: (i = 1) => ({ opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.04 * i } }) };
const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const AnimateText = ({ children, className = "" }: { children: string; className?: string }) => {
  const words = children.split(" ");
  return (
    <motion.span className={className} variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
      {words.map((word, i) => (
        <motion.span key={i} variants={item} style={{ display: "inline-block", marginRight: "0.25em" }}>
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const SlideIn = ({ children, direction = "up", delay = 0, className = "" }: { children: React.ReactNode; direction?: "up" | "down" | "left" | "right"; delay?: number; className?: string }) => {
  const d = { up: 40, down: -40, left: 40, right: -40 };
  const x = direction === "left" ? -d.left : direction === "right" ? d.right : 0;
  const y = direction === "up" ? d.up : direction === "down" ? d.down : 0;
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 2.8,
  decimals = 0,
  inView,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  inView: boolean;
}) {
  const [value, setValue] = useState(0);
  const animated = useRef(false);
  useEffect(() => {
    if (!inView) {
      setValue(0);
      animated.current = false;
      return;
    }
    if (animated.current) return;
    animated.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = (now - start) / 1000;
      const t = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - t, 3);
      setValue(easeOut * end);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);
  const display = value.toFixed(decimals).replace(".", ",");
  return <>{prefix}{display}{suffix}</>;
}

const RESEAUX_LOGOS = [
  { slug: "tiktok", name: "TikTok", color: "000000" },
  { slug: "pinterest", name: "Pinterest", color: "E60023" },
  { slug: "instagram", name: "Instagram", color: "E4405F" },
  { slug: "facebook", name: "Meta", color: "1877F2" },
  { slug: "google", name: "Google", color: "4285F4" },
  { slug: "youtube", name: "YouTube", color: "FF0000" },
  { slug: "snapchat", name: "Snapchat", color: "FFFC00" },
  { slug: "x", name: "X", color: "FFFFFF" },
] as const;
const LOGO_URL = (slug: string, color: string) => `https://cdn.simpleicons.org/${slug}/${color}`;

function InstagramGradientIcon({ className, id = "insta-grad" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Instagram">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#833AB4" />
          <stop offset="50%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#E1306C" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id})`} d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

/** Email de contact VUKO — à remplacer par le vrai mail quand tu l'as */
const VUKO_EMAIL = "contact@vuko.com";
/** WhatsApp VUKO : 07 69 08 10 72 — les visiteurs ouvrent une conversation avec ce numéro (pas le leur) */
const WHATSAPP_ID = "33769081072";

const RESULTATS = [
  { end: 142, prefix: "+", suffix: "%", label: "Croissance moyenne" },
  { end: 5.8, prefix: "x", decimals: 1, label: "ROAS moyen" },
  { end: 2.4, suffix: "M€", decimals: 1, label: "Scale mensuel record" },
] as const;

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "#about", label: "Stratégie" },
  { href: "#results", label: "Résultats" },
  { href: "#team", label: "Équipe" },
  { href: "#contact", label: "Contact" },
] as const;
/** Indicatifs téléphoniques pour le formulaire contact */
const PHONE_COUNTRIES = [
  { label: "France", code: "+33" },
  { label: "Belgique", code: "+32" },
  { label: "Suisse", code: "+41" },
  { label: "Luxembourg", code: "+352" },
  { label: "Canada", code: "+1" },
  { label: "Maroc", code: "+212" },
  { label: "Algérie", code: "+213" },
  { label: "Tunisie", code: "+216" },
  { label: "Allemagne", code: "+49" },
  { label: "Espagne", code: "+34" },
  { label: "Italie", code: "+39" },
  { label: "Royaume-Uni", code: "+44" },
  { label: "Portugal", code: "+351" },
  { label: "Pays-Bas", code: "+31" },
  { label: "Autre", code: "+" },
] as const;

/** Guide de format par pays : placeholder + longueurs des blocs (ex. [1,2,2,2,2] → 6 12 34 56 78) */
const PHONE_GUIDE: Record<string, { placeholder: string; lengths: number[]; maxDigits: number }> = {
  "+33": { placeholder: "6 12 34 56 78", lengths: [1, 2, 2, 2, 2], maxDigits: 9 },
  "+32": { placeholder: "470 12 34 56", lengths: [3, 2, 2, 2], maxDigits: 9 },
  "+41": { placeholder: "79 123 45 67", lengths: [2, 3, 2, 2], maxDigits: 9 },
  "+352": { placeholder: "661 123 456", lengths: [3, 3, 3], maxDigits: 9 },
  "+1": { placeholder: "514 555 1234", lengths: [3, 3, 4], maxDigits: 10 },
  "+212": { placeholder: "612 34 56 78", lengths: [3, 2, 2, 2], maxDigits: 9 },
  "+213": { placeholder: "661 12 34 56", lengths: [3, 2, 2, 2], maxDigits: 9 },
  "+216": { placeholder: "92 123 456", lengths: [2, 3, 3], maxDigits: 8 },
  "+49": { placeholder: "151 23456789", lengths: [3, 3, 4], maxDigits: 10 },
  "+34": { placeholder: "612 34 56 78", lengths: [3, 2, 2, 2], maxDigits: 9 },
  "+39": { placeholder: "312 345 6789", lengths: [3, 3, 4], maxDigits: 10 },
  "+44": { placeholder: "7700 123456", lengths: [4, 6], maxDigits: 10 },
  "+351": { placeholder: "912 345 678", lengths: [3, 3, 3], maxDigits: 9 },
  "+31": { placeholder: "6 12 34 56 78", lengths: [1, 2, 2, 2, 2], maxDigits: 9 },
  "+": { placeholder: "numéro avec indicatif", lengths: [], maxDigits: 15 },
};

function formatPhoneInput(value: string, countryCode: string): string {
  const digits = value.replace(/\D/g, "").slice(0, PHONE_GUIDE[countryCode]?.maxDigits ?? 15);
  const guide = PHONE_GUIDE[countryCode];
  if (!guide || guide.lengths.length === 0) return digits;
  let out = "";
  let i = 0;
  for (const len of guide.lengths) {
    if (i >= digits.length) break;
    if (out) out += " ";
    out += digits.slice(i, i + len);
    i += len;
  }
  if (i < digits.length) out += (out ? " " : "") + digits.slice(i);
  return out;
}

export default function Home() {
  const resultsRef = useRef<HTMLElement>(null);
  const resultsInView = useInView(resultsRef, { once: false, margin: "-80px" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactPrenom, setContactPrenom] = useState("");
  const [contactNom, setContactNom] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactCountry, setContactCountry] = useState("+33");
  const createLeadMutation = useCreateLead();

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = `${contactPrenom.trim()} ${contactNom.trim()}`.trim();
    if (!name || !contactPhone.trim()) return;
    const fullPhone = `${contactCountry} ${contactPhone.replace(/\s/g, "").trim()}`.trim();
    const text = [
      "Bonjour, je souhaite réserver un audit gratuit.",
      `Je suis ${name}.`,
      `Tél : ${fullPhone}`,
    ].join("\n");
    // Redirection WhatsApp immédiate (07 69 08 10 72)
    window.open(`https://wa.me/${WHATSAPP_ID}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setContactPrenom("");
    setContactNom("");
    setContactPhone("");
    setContactCountry("+33");
    // Enregistrement en base en arrière-plan (sans bloquer ni afficher d'erreur)
    createLeadMutation.mutate(
      { name, email: "-", message: "Réservation audit gratuit", phone: fullPhone },
      { onError: () => {} }
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      
      {/* BACKGROUND EFFECTS — finition bleu marine discret */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* NAVBAR — centrée, transitions fluides, menu mobile */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 border-border transition-all duration-300 ease-out">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between relative">
          <a href="#" className="font-display font-black text-2xl md:text-4xl tracking-tighter text-foreground transition-opacity duration-300 hover:opacity-90">
            VUKO<span className="text-primary">.</span>
          </a>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 rounded-full bg-secondary/80 backdrop-blur-sm p-1.5 border border-border shadow-sm">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="nav-link px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent transition-all duration-300 ease-out">
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a href="#contact" className="hidden md:block">
              <Button className="rounded-full font-bold px-5 md:px-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]">
                Appel gratuit
              </Button>
            </a>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="md:hidden p-2.5 rounded-full text-foreground hover:bg-primary/10 transition-all duration-300 ease-out"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Menu mobile — slide down avec transition fluide */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 pt-2 border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="nav-link block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 ease-out"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2"
              >
                <Button className="w-full rounded-full font-bold py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 ease-out">
                  Appel gratuit
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* Overlay menu mobile — clic ferme le menu, transition fluide */}
      <div
        className={`fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] md:hidden transition-opacity duration-300 ease-out ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden
        onClick={() => setMobileMenuOpen(false)}
      />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center px-6 pt-20">
          <div className="max-w-5xl mx-auto w-full text-center">
            <FadeIn>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8"
              >
                L'agence qu'il faut contacter
              </motion.div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tighter mb-6 italic text-foreground">
                <AnimateText className="inline">Nous augmentons le </AnimateText><motion.span className="text-primary text-glow" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>chiffre d'affaires.</motion.span>
              </h1>
              <SlideIn delay={0.2}>
                <p className="text-base md:text-lg text-muted-foreground font-light tracking-tight mb-10 max-w-2xl mx-auto">
                  Pas du trafic. Pas des likes. <span className="text-foreground font-medium italic">Du revenu.</span>
                </p>
              </SlideIn>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a href="#contact" className="inline-block">
                  <Button size="lg" className="h-12 px-8 text-base rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg">
                    Appel gratuit <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-widest text-foreground/80">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Déjà +45M€ générés pour nos clients
                  </div>
                  <span className="hidden sm:inline text-border">|</span>
                  <span className="text-primary">Confiance & résultats</span>
                </div>
              </div>
              {/* Bandeau logos réseaux — 2 lignes qui défilent (ligne 1 → droite, ligne 2 → gauche) */}
              <div className="mt-32 md:mt-40 w-full overflow-hidden border-y border-border py-5">
                <div className="flex flex-col gap-6">
                  <div className="overflow-hidden">
                    <div className="flex w-max marquee-right">
                      {[1, 2].map((copy) => (
                        <div key={copy} className="flex items-center gap-12 shrink-0 px-6">
                          {RESEAUX_LOGOS.map((r) => (
                            r.slug === "instagram" ? (
                              <InstagramGradientIcon key={`${copy}-${r.slug}`} id={`insta-grad-${copy}-${r.slug}`} className="h-7 md:h-8 w-auto opacity-90 hover:opacity-100 transition-opacity" />
                            ) : (
                              <img
                                key={`${copy}-${r.slug}`}
                                src={LOGO_URL(r.slug, r.color)}
                                alt={r.name}
                                className={`h-7 md:h-8 w-auto opacity-90 hover:opacity-100 transition-opacity ${r.slug === "tiktok" ? "logo-tiktok-contour" : ""}`}
                              />
                            )
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex w-max marquee-left">
                      {[1, 2].map((copy) => (
                        <div key={copy} className="flex items-center gap-12 shrink-0 px-6">
                          {[...RESEAUX_LOGOS].reverse().map((r) => (
                            r.slug === "instagram" ? (
                              <InstagramGradientIcon key={`${copy}-${r.slug}`} id={`insta-grad-2-${copy}-${r.slug}`} className="h-7 md:h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                            ) : (
                              <img
                                key={`${copy}-${r.slug}`}
                                src={LOGO_URL(r.slug, r.color)}
                                alt={r.name}
                                className={`h-7 md:h-8 w-auto opacity-80 hover:opacity-100 transition-opacity ${r.slug === "tiktok" ? "logo-tiktok-contour" : ""}`}
                              />
                            )
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 2 — ACTUELLEMENT vs VOTRE TRANSFORMATION — fond bleu marine */}
        <section className="py-24 px-6 bg-[hsl(221,48%,12%)] relative scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-6 items-stretch">
              <FadeIn>
                <div className="p-6 md:p-8 rounded-2xl border-2 border-red-500/50 bg-[hsl(221,35%,16%)] h-full shadow-[0_0_35px_-8px_rgba(239,68,68,0.25)]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-red-500/25 flex items-center justify-center border border-red-500/60">
                      <XOctagon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-display font-black text-white">Actuellement</h3>
                      <p className="text-base font-semibold text-red-200/90 mt-0.5">Votre situation</p>
                    </div>
                  </div>
                  <p className="text-base font-bold text-red-200 mb-6">Temps perdu pour votre entreprise.</p>
                  <ul className="space-y-7">
                    {[
                      { icon: Clock, title: "Pas le temps", desc: "Gérer votre entreprise vous prend déjà 100% de votre temps." },
                      { icon: TrendingDown, title: "ROAS en chute", desc: "Vos créas fatiguent, les CPM explosent." },
                      { icon: Layers, title: "Créas monotones", desc: "Toujours les mêmes formats, votre audience décroche." },
                      { icon: Target, title: "Algorithme incompris", desc: "Sans les bons codes." },
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                          <item.icon className="w-6 h-6 text-red-300" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-lg text-red-100 mb-2">{item.title}</p>
                          <p className="text-base text-red-200/80 leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <div className="hidden md:flex flex-col items-center justify-center px-2 py-8">
                <ChevronRight className="w-8 h-8 text-emerald-400 shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mt-1.5">La solution</span>
              </div>

              <FadeIn delay={0.2}>
                <div className="rounded-2xl border-2 border-emerald-500/60 bg-[hsl(221,35%,16%)] h-full relative overflow-hidden shadow-[0_0_50px_-10px_rgba(16,185,129,0.35)]">
                  <div className="h-12 flex items-center justify-center bg-emerald-500/25 border-b border-emerald-500/40">
                    <span className="text-[11px] font-black uppercase tracking-[0.28em] text-emerald-100">Votre transformation</span>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-xl bg-emerald-500/30 flex items-center justify-center border-2 border-emerald-400/60 shadow-[0_0_20px_-4px_rgba(16,185,129,0.5)]">
                        <CheckCircle2 className="w-7 h-7 text-white" />
                      </div>
                      <span className="font-display font-black text-xl md:text-2xl tracking-tighter text-emerald-100">VUKO</span>
                    </div>
                    <p className="text-base font-bold text-emerald-200 mb-6">On se dit : ça vaut le coup.</p>
                    <ul className="space-y-7">
                      {[
                        { icon: CheckCircle2, title: "On gère tout", desc: "Équipe dédiée qui crée vos créas sans effort." },
                        { icon: Zap, title: "Performance garantie", desc: "Créas optimisées qui relancent vos conversions." },
                        { icon: Sparkles, title: "Créativité illimitée", desc: "Nouveaux concepts et angles testés chaque mois." },
                        { icon: Lightbulb, title: "Expertise Meta", desc: "Stratégies natives qui parlent à l'algorithme." },
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4">
                          <div className="shrink-0 w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50">
                            <item.icon className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-lg text-emerald-200 mb-2">{item.title}</p>
                            <p className="text-base text-emerald-100/90 leading-relaxed">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
            <SlideIn delay={0.1}>
            <p className="text-center mt-12 text-lg md:text-xl font-bold uppercase tracking-[0.2em] text-slate-300 leading-relaxed">
              Évitez le gauche. Passez à VUKO — ça fait des ventes.
            </p>
            </SlideIn>
          </div>
        </section>

        {/* SECTION 3 — RÉSULTATS (chiffres qui montent à l'arrivée) */}
        <section ref={resultsRef} id="results" className="py-28 px-6 scroll-mt-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-16">
              {RESULTATS.map((item, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="text-center">
                    <div className="text-4xl md:text-6xl font-bold tracking-tighter mb-3 italic text-primary text-glow">
                      <CountUp
                        end={item.end}
                        prefix={item.prefix ?? ""}
                        suffix={item.suffix ?? ""}
                        decimals={item.decimals ?? 0}
                        inView={resultsInView}
                        duration={2.8}
                      />
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">{item.label}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — SERVICES (blanc haut de gamme, finition bleu marine) */}
        <section id="about" className="py-28 px-6 relative scroll-mt-24 border-y border-border">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <FadeIn>
              <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Vos partenaires de croissance</motion.span>
              <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="text-2xl md:text-4xl font-display font-black mb-4 tracking-tighter italic uppercase text-foreground">VUKO transformera votre business<span className="text-primary">.</span></motion.h2>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="text-base text-muted-foreground max-w-2xl mx-auto">Seulement pour les entreprises prêtes à dominer leur marché. Nous construisons la confiance par les résultats.</motion.p>
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
                <div className="group p-7 rounded-2xl bg-card hover:bg-primary/5 transition-all duration-500 h-full border border-border hover:border-primary/30 hover:shadow-lg">
                  <div className="mb-5 bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center border border-primary/20 text-primary group-hover:bg-primary/15 group-hover:scale-105 transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-base font-bold font-display mb-3 uppercase tracking-tighter text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* SECTION 5 — ÉQUIPE (TeamSection) */}
        <div id="team" className="scroll-mt-24">
          <TeamSection
            title="TEAM"
            description="Chez VUKO, soyez prêt à bosser avec des experts. Nous optimisons tout pour ramener des clients et faire grimper votre C.A."
            members={[
              { name: "Adem", designation: "CEO & Fondateur", imageSrc: "/team/ceo.png" },
              { name: "Sophie L.", designation: "DAF — Finance & Pilotage", imageSrc: "/team/lead-ads.png" },
              { name: "Thomas R.", designation: "Lead Ads & Stratégie", imageSrc: "/team/daf.png" },
              { name: "Léa B.", designation: "Marketing", imageSrc: "/team/marketing.png" },
              { name: "Julie K.", designation: "Ads Marketing", imageSrc: "/team/ads-marketing.png" },
              { name: "Theo", designation: "UGC Partner, Vidéaste & Lead Montage Vidéo", imageSrc: "/team/theo.png" },
              { name: "Matthis", designation: "Vidéaste & Montage — avec Theo", imageSrc: "/team/matthis.png" },
            ]}
            registerLink="#contact"
            logo={
              <div className="flex flex-col items-start leading-none">
                <span className="logo-label -mb-0.5">VUKO.</span>
                <span className="font-display font-black text-2xl tracking-tighter text-foreground">AGENCY</span>
              </div>
            }
            footerText="Plus de 16 employés : montage vidéo, vidéaste, créateur de site web, community management, ads, stratégie…"
            footerDescription="Tous formés et à l'écoute, ils nous apportent une aide concrète au quotidien. Une équipe de confiance pour votre croissance."
            email={VUKO_EMAIL}
          />
        </div>

        {/* SECTION 6 — CONTACT */}
        <section id="contact" className="py-28 px-6 relative scroll-mt-24 bg-secondary/30">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">La bonne agence à contacter</p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                className="text-3xl md:text-5xl font-display font-black mb-4 leading-tight italic uppercase text-foreground"
              >
                Prêt à exploser ?<br />
                Appel gratuit.
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }} className="text-muted-foreground max-w-xl mx-auto">Confiance, expertise et résultats. Réservez votre appel gratuit.</motion.p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="max-w-2xl mx-auto bg-card border-2 border-border rounded-2xl shadow-xl overflow-hidden">
              <form onSubmit={handleReservationSubmit} className="p-6 md:p-10 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <Input
                    type="text"
                    placeholder="PRÉNOM"
                    value={contactPrenom}
                    onChange={(e) => setContactPrenom(e.target.value)}
                    required
                    className="bg-secondary border-2 border-border h-12 rounded-lg placeholder:text-muted-foreground font-bold text-xs tracking-widest uppercase focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                  />
                  <Input
                    type="text"
                    placeholder="NOM"
                    value={contactNom}
                    onChange={(e) => setContactNom(e.target.value)}
                    required
                    className="bg-secondary border-2 border-border h-12 rounded-lg placeholder:text-muted-foreground font-bold text-xs tracking-widest uppercase focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={contactCountry}
                    onChange={(e) => {
                      const newCode = e.target.value;
                      setContactCountry(newCode);
                      setContactPhone((prev) => formatPhoneInput(prev.replace(/\s/g, ""), newCode));
                    }}
                    className="h-12 px-4 rounded-lg border-2 border-border bg-secondary text-foreground font-bold text-xs tracking-widest uppercase focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary focus:outline-none transition-all min-w-[140px]"
                    aria-label="Pays / indicatif"
                  >
                    {PHONE_COUNTRIES.map((c) => (
                      <option key={c.code + c.label} value={c.code}>
                        {c.label} {c.code}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="tel"
                    placeholder={PHONE_GUIDE[contactCountry]?.placeholder ?? "NUMÉRO DE TÉLÉPHONE"}
                    value={contactPhone}
                    onChange={(e) => setContactPhone(formatPhoneInput(e.target.value, contactCountry))}
                    required
                    className="flex-1 bg-secondary border-2 border-border h-12 rounded-lg placeholder:text-muted-foreground font-bold text-xs tracking-widest uppercase focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={createLeadMutation.isPending}
                  className="w-full h-14 text-sm font-bold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg uppercase tracking-widest"
                >
                  {createLeadMutation.isPending ? "Envoi…" : "Réserver mon appel gratuit"}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-4 space-y-1">
                  <span className="block font-semibold text-foreground/80">Sans engagement.</span>
                  <span className="block">Réponse rapide, conseil personnalisé. L’agence de confiance pour votre croissance.</span>
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-6 p-5 md:p-6 rounded-2xl bg-[#075E54]/10 border-2 border-[#25D366]/30 flex flex-col sm:flex-row items-center gap-4 text-left"
                >
                  <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-8 h-8 md:w-9 md:h-9 text-white" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm md:text-base font-bold text-foreground mb-0.5">Redirection WhatsApp</p>
                    <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                      Lors de la redirection, un message avec votre <strong className="text-foreground">nom</strong> et <strong className="text-foreground">téléphone</strong> est envoyé pour que nous sachions qui vous êtes.
                    </p>
                  </div>
                </motion.div>
              </form>
            </div>
          </FadeIn>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-secondary/50 py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-primary">VUKO.</span>
            <span className="font-display font-black text-lg tracking-tighter text-foreground">AGENCY</span>
          </div>
          </div>
          <div className="flex items-center gap-6">
            <a href={`mailto:${VUKO_EMAIL}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {VUKO_EMAIL}
            </a>
          </div>
          <div className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.2em] text-center md:text-right">
            &copy; {new Date().getFullYear()} VUKO. AGENCY — L'agence de confiance pour votre croissance.
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
