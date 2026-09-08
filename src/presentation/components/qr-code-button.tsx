import QRCode from 'react-qr-code';
import { QrCodeIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface Props {
  value: string;
  isDisabled?: boolean;
}

export function QrCodeButton({ value, isDisabled = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const slug = value.split('/').pop() || 'code';

  function downloadSvg() {
    if (!svgRef.current) return;

    const blob = new Blob([svgRef.current.outerHTML], {
      type: 'image/svg+xml',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `qr-${slug}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        disabled={isDisabled}
        onClick={() => setIsOpen(true)}
        aria-label="Generar código QR"
      >
        <QrCodeIcon />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Código QR</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <QRCode ref={svgRef} value={value} size={256} />
            <p className="w-full truncate text-center text-sm text-muted-foreground">
              {value}
            </p>
          </div>
          <DialogFooter>
            <Button onClick={downloadSvg}>Descargar SVG</Button>
            <DialogClose
              render={(props) => (
                <Button {...props} variant="outline">
                  Cerrar
                </Button>
              )}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
