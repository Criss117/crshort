import { useLayoutEffect, useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '@heroui/react/button';
import { Switch } from '@heroui/react/switch';

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

export function ToogleThemeButton() {
  return (
    <Button
      id="theme-toggle"
      variant="ghost"
      size="sm"
      isIconOnly
      onClick={() => toogleTheme()}
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="dark:hidden" />
    </Button>
  );
}

export function ToogleThemeSwitch() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useLayoutEffect(() => {
    const theme = localStorage.getItem('crshort-theme');

    if (!theme) return;

    setTheme(theme === 'dark' ? 'dark' : 'light');
  }, []);

  return (
    <div
      onClick={() => toogleTheme(setTheme)}
      className="w-full flex flex-row justify-between"
    >
      <Switch
        isSelected={theme === 'dark'}
        onChange={() => toogleTheme(setTheme)}
      >
        <Switch.Control>
          <Switch.Thumb className="bg-white">
            <Switch.Icon>
              <SunIcon className="size-3 hidden dark:block text-black" />
              <MoonIcon className="size-3 dark:hidden" />
            </Switch.Icon>
          </Switch.Thumb>
        </Switch.Control>
      </Switch>
      <p>Apariencia</p>
    </div>
  );
}
