import { authClient } from '@/integrations/better-auth/auth-client';
import { useMutation } from '@tanstack/react-query';

export function useAuth() {
  const signIn = useMutation({
    mutationKey: ['sign-in'],
    mutationFn: async (data: { provider: 'github' | 'google' }) => {
      await authClient.signIn.social({
        provider: data.provider,
        callbackURL: '/dashboard',
      });
    },
  });

  return {
    signIn,
  };
}
