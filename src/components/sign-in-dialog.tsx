import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GitHub } from "./icons/github";
import { Google } from "./icons/google";
import { authClient } from "@/lib/auth-client";

export function SignInDialog() {
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);

  const signInGithub = () => {
    authClient.signIn.social(
      {
        provider: "github",
      },
      {
        onSuccess: () => {
          setIsPending(false);
          setOpen(false);
        },
        onError: () => {
          setIsPending(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Iniciar session</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">Bienvenido de nuevo</DialogTitle>
          <DialogDescription className="text-center">
            Inicia sesión para gestionar tus enlaces cortos
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          <Button
            variant="outline"
            className="w-full h-11 gap-2"
            disabled={isPending}
            onClick={() => {
              signInGithub();
            }}
          >
            <div className="bg-black rounded-full size-5 flex items-center justify-center">
              <GitHub className="size-4" />
            </div>
            Continuar con GitHub
          </Button>

          <Button
            variant="outline"
            className="w-full h-11 gap-2"
            disabled={isPending}
            onClick={() => {}}
          >
            <Google className="size-4" />
            Continuar con Google
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Al continuar, aceptas nuestros{" "}
          <a href="/terms" className="underline hover:text-foreground">
            Términos de servicio
          </a>{" "}
          y{" "}
          <a href="/privacy" className="underline hover:text-foreground">
            Política de privacidad
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
