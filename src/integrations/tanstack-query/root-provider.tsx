import { MINUTE } from '@/lib/constants';
import { QueryClient } from '@tanstack/react-query';

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Mantiene datos frescos por 5 minutos
        staleTime: 5 * MINUTE,

        // Mantiene cache por 30 minutos
        gcTime: 30 * MINUTE,

        // Evita refetch automático al cambiar de pestaña
        refetchOnWindowFocus: false,

        // Evita refetch al reconectar internet
        refetchOnReconnect: false,

        // Reintentos para errores temporales
        retry: 2,

        // Para session cache y datos estáticos
        refetchOnMount: false,
      },
      mutations: {
        retry: 1,
      },
    },
  });
  return {
    queryClient,
  };
}
export default function TanstackQueryProvider() {}
