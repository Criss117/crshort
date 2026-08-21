import { createContext, useContext, useState, type ReactNode } from 'react';

interface EditCustomSlugDialogState {
  isOpen: boolean;
  linkId: string | null;
  open: (linkId: string) => void;
  close: () => void;
}

const EditCustomSlugDialogContext = createContext<
  EditCustomSlugDialogState | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export function EditCustomSlugDialogProvider({ children }: Props) {
  const [linkId, setLinkId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = (newLinkId: string) => {
    setLinkId(newLinkId);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setLinkId(null);
  };

  return (
    <EditCustomSlugDialogContext.Provider value={{ isOpen, linkId, open, close }}>
      {children}
    </EditCustomSlugDialogContext.Provider>
  );
}

export function useEditCustomSlugDialog() {
  const context = useContext(EditCustomSlugDialogContext);
  if (context === undefined) {
    throw new Error(
      'useEditCustomSlugDialog must be used within an EditCustomSlugDialogProvider',
    );
  }
  return context;
}