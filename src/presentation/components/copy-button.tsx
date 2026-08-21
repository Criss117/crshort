import { CopyIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';

interface Props {
  text: string;
  isDisabled?: boolean;
}

export function CopyButton({ text, isDisabled = false }: Props) {
  const timeoutref = useRef<NodeJS.Timeout>(null);
  const [isCopied, setIsCopied] = useState(false);

  function onCopy() {
    if (isCopied || isDisabled) return;

    navigator.clipboard.writeText(text);
    setIsCopied(true);

    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    timeoutref.current = timeout;
  }

  useEffect(() => {
    return () => {
      if (timeoutref.current) clearTimeout(timeoutref.current);
    };
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isCopied || isDisabled}
      onClick={onCopy}
    >
      <CopyIcon />
    </Button>
  );
}
