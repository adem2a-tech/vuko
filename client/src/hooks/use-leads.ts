import { useMutation, useQuery } from "@tanstack/react-query";
import { api, type LeadInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

const getApiBase = () => {
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL)
    return import.meta.env.VITE_API_URL as string;
  if (typeof window !== "undefined") return window.location.origin;
  return "";
};

export function useLeadsList(enabled = true) {
  return useQuery({
    queryKey: ["leads"],
    enabled,
    queryFn: async () => {
      const url = `${getApiBase()}${api.leads.list.path}`;
      const res = await fetch(url, { credentials: "include" });
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await res.text();
        if (text.startsWith("<!")) {
          throw new Error("L’API n’a pas répondu. Vérifiez que le serveur est bien démarré (npm run dev).");
        }
        throw new Error("Impossible de charger les réservations.");
      }
      const data = await res.json();
      if (!res.ok) throw new Error("Impossible de charger les réservations");
      return api.leads.list.responses[200].parse(data);
    },
  });
}

export function useCreateLead() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: LeadInput) => {
      const validated = api.leads.create.input.parse(data);
      const url = `${getApiBase()}${api.leads.create.path}`;
      const res = await fetch(url, {
        method: api.leads.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.leads.create.responses[400].parse(await res.json());
          throw new Error(error.message || "Erreur de validation");
        }
        throw new Error("Une erreur inattendue est survenue");
      }

      return api.leads.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Demande envoyée avec succès",
        description: "L'équipe VUKO vous recontactera dans les plus brefs délais.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur lors de l'envoi",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
