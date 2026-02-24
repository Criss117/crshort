import { useId, useState, useTransition } from "react";
import { toast } from "sonner";
import { actions } from "astro:actions";
import { useForm } from "@tanstack/react-form";
import { createLinkValidator } from "@/actions/validators";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { PlusIcon } from "lucide-react";

export function CreateLink() {
  const formId = `create-link-form-${useId()}`;
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      url: "",
    },
    validators: {
      onChange: createLinkValidator,
    },
    onSubmit: ({ value }) => {
      const toastLoadingId = toast.loading(`Ingresando ${value.url} ...`);

      startTransition(async () => {
        const { data, error } = await actions.linkActions.create({
          url: value.url,
        });

        toast.dismiss(toastLoadingId);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success(`Link ${data.url} creado exitosamente`);
          form.reset();
          setOpen(false);
        }
      });
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) form.reset();

        setOpen(v);
      }}
    >
      <DialogTrigger>
        <Button>
          <PlusIcon />
          Nuevo Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          id={formId}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="url"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Nuevo link</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="https://crshort.com/new-link"
                      autoComplete="off"
                    />
                    <FieldDescription>
                      Ingrese el link que desea acortar
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button type="submit" disabled={isPending} form={formId}>
            Crear Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
