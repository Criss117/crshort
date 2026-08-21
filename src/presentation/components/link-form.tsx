import { createFormHook } from '@tanstack/react-form';
import { createFormHookContexts } from '@tanstack/react-form';
import { Field, FieldDescription, FieldError, FieldLabel } from './ui/field';
import { Input } from './ui/input';

// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    LinkInput,
    CustomSlugInput,
    TagInput,
  },
  formComponents: {},
});

function LinkInput() {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <div className="flex gap-0.5">
        <FieldLabel htmlFor={field.name}>Nuevo Enlace</FieldLabel>
        <span className="text-destructive">*</span>
      </div>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder="https://crshort.com/new-link"
        autoComplete="off"
        className="mx-1"
      />
      <FieldDescription>Ingrese el Enlace que desea acortar</FieldDescription>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

function CustomSlugInput() {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <div className="flex gap-0.5">
        <FieldLabel htmlFor={field.name}>Slug Personalizado</FieldLabel>
        <span className="text-muted-foreground text-sm">(opcional)</span>
      </div>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder="new-link"
        autoComplete="off"
        className="mx-1"
      />
      <FieldDescription>
        Ingrese el Slug personalizado para el enlace
      </FieldDescription>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

function TagInput() {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <div className="flex gap-0.5">
        <FieldLabel htmlFor={field.name}>Tags</FieldLabel>
        <span className="text-muted-foreground text-sm">(opcional)</span>
      </div>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder="trabajo, React, Producción"
        autoComplete="off"
        className="mx-1"
      />
      <FieldDescription>Etiquetas separadas por coma</FieldDescription>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

export const useLinkForm = useAppForm;
