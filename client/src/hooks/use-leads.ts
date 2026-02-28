import { useMutation } from "@tanstack/react-query";
import { api, type LeadInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateLead() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: LeadInput) => {
      const validated = api.leads.create.input.parse(data);
      const res = await fetch(api.leads.create.path, {
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
