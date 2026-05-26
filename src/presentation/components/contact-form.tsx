import { useId } from 'react';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { contactValidator } from '@/application/validators/contact.validators';
import { useMutateContact } from '@/application/hooks/use-mutate-contact';
import { Field, FieldError, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts();

function NameInput() {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder="Tu nombre"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

function EmailInput() {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Correo electrónico</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        type="email"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder="tu@email.com"
        autoComplete="email"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

function SubjectInput() {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Asunto</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder="¿Sobre qué nos quieres hablar?"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

function MessageTextarea() {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>Mensaje</FieldLabel>
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        placeholder="Cuéntanos qué piensas..."
        rows={4}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    NameInput,
    EmailInput,
    SubjectInput,
    MessageTextarea,
  },
  formComponents: {},
});

interface Props {
  label?: string;
}

const defaultValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactForm({ label }: Props) {
  const formId = `contact-form-${useId()}`;
  const { sendContact } = useMutateContact();

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: contactValidator,
    },
    onSubmit: ({ value }) => {
      sendContact.mutate(value);
    },
  });

  return (
    <>
      <form
        id={formId}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex flex-col gap-6"
      >
        <form.AppField name="name" children={(field) => <field.NameInput />} />
        <form.AppField
          name="email"
          children={(field) => <field.EmailInput />}
        />
        <form.AppField
          name="subject"
          children={(field) => <field.SubjectInput />}
        />
        <form.AppField
          name="message"
          children={(field) => <field.MessageTextarea />}
        />

        <button
          type="submit"
          disabled={sendContact.isPending}
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground text-sm font-medium whitespace-nowrap h-9 gap-1.5 px-2.5 transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
        >
          {sendContact.isPending ? 'Enviando...' : label || 'Enviar mensaje'}
        </button>
      </form>
    </>
  );
}
