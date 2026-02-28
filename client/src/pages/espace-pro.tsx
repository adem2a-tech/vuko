import { useState } from "react";
import { Link } from "wouter";
import { useLeadsList } from "@/hooks/use-leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ESPACE_PRO_CODE = "vukogoat";
const STORAGE_KEY = "vuko_espace_pro_code";

/** Affiche le pays à partir de l'indicatif du numéro (ex. +33 → France). Préfixes longs en premier. */
function getCountryFromPhone(phone: string | null): string {
  if (!phone || !phone.trim()) return "—";
  const p = phone.trim().replace(/\s/g, "");
  if (p.startsWith("+352")) return "Luxembourg";
  if (p.startsWith("+351")) return "Portugal";
  if (p.startsWith("+216")) return "Tunisie";
  if (p.startsWith("+213")) return "Algérie";
  if (p.startsWith("+212")) return "Maroc";
  if (p.startsWith("+44")) return "Royaume-Uni";
  if (p.startsWith("+49")) return "Allemagne";
  if (p.startsWith("+41")) return "Suisse";
  if (p.startsWith("+39")) return "Italie";
  if (p.startsWith("+34")) return "Espagne";
  if (p.startsWith("+33")) return "France";
  if (p.startsWith("+32")) return "Belgique";
  if (p.startsWith("+31")) return "Pays-Bas";
  if (p.startsWith("+1")) return "Canada";
  if (p.startsWith("+")) return "Autre";
  return "—";
}

export default function EspacePro() {
  const [code, setCode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(STORAGE_KEY) === ESPACE_PRO_CODE;
  });
  const [codeError, setCodeError] = useState(false);
  const { data: leads, isLoading, error, refetch } = useLeadsList(isUnlocked);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toLowerCase() === ESPACE_PRO_CODE) {
      sessionStorage.setItem(STORAGE_KEY, ESPACE_PRO_CODE);
      setIsUnlocked(true);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Link href="/" className="font-display font-black text-xl text-foreground hover:opacity-90 block mb-8">
            VUKO<span className="text-primary">.</span>
          </Link>
          <h1 className="text-xl font-display font-black mb-2">Espace pro</h1>
          <p className="text-muted-foreground text-sm mb-6">Entrez le code d&apos;accès pour continuer.</p>
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Code d'accès"
              value={code}
              onChange={(e) => { setCode(e.target.value); setCodeError(false); }}
              className="bg-secondary border-2 border-border rounded-lg font-mono"
              autoFocus
            />
            {codeError && (
              <p className="text-sm text-destructive font-medium">Code incorrect.</p>
            )}
            <Button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground">
              Accéder
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display font-black text-xl text-foreground hover:opacity-90">
            VUKO<span className="text-primary">.</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Espace pro</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-display font-black mb-2">Réservations d&apos;appel</h1>
        <p className="text-muted-foreground text-sm mb-8">Qui a réservé un appel gratuit.</p>

        {isLoading && (
          <p className="text-muted-foreground">Chargement…</p>
        )}
        {error && (
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-destructive font-medium">{(error as Error).message}</p>
            <Button variant="outline" onClick={() => refetch()} className="rounded-lg">
              Réessayer
            </Button>
          </div>
        )}
        {leads && (
          <div className="rounded-xl border border-border overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Nom</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Pays</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Téléphone</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                        Aucune réservation pour le moment.
                      </td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{lead.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{getCountryFromPhone(lead.phone)}</td>
                        <td className="px-4 py-3 text-foreground font-mono text-sm">{lead.phone || "—"}</td>
                        <td className="px-4 py-3 text-muted-foreground">{lead.email || "—"}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
