import { useLayoutEffect, useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Switch } from './ui/switch';

function toogleTheme(onChange?: (theme: 'dark' | 'light') => void) {
  const theme = localStorage.getItem('crshort-theme');

  if (theme === 'dark') {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('crshort-theme', 'light');
    onChange?.('light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('crshort-theme', 'dark');
    onChange?.('dark');
  }
}

interface ToogleThemeSwitchProps {
  className?: string;
}

export function ToogleThemeButton() {
  return (
    <Button
      id="theme-toggle"
      variant="ghost"
      size="icon"
      onClick={() => toogleTheme()}
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="dark:hidden" />
    </Button>
  );
}

export function ToogleThemeSwitch({ className }: ToogleThemeSwitchProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useLayoutEffect(() => {
    const theme = localStorage.getItem('crshort-theme');

    if (!theme) return;

    setTheme(theme === 'dark' ? 'dark' : 'light');
  }, []);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        toogleTheme(setTheme);
      }}
      className={cn('w-full flex flex-row justify-between', className)}
    >
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={() => toogleTheme(setTheme)}
      />
      <p>Apariencia</p>
    </div>
  );
}
