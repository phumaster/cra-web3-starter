import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import AppConfigs from 'configs';

import themeState from '../states/theme';

function useTheme(): {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
} {
  const [state, setState] = useRecoilState(themeState);

  const setTheme = useCallback(
    (theme: 'dark' | 'light') => {
      localStorage.setItem(AppConfigs.storage.THEME_STORAGE_KEY, theme);
      setState((prev) => ({
        ...prev,
        theme,
      }));
    },
    [setState],
  );
  return {
    theme: state.theme,
    setTheme,
  };
}

export function useThemeEffect(): void {
  const { setTheme } = useTheme();
  useEffect(() => {
    const currentTheme = localStorage.getItem(AppConfigs.storage.THEME_STORAGE_KEY);
    if (currentTheme === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [setTheme]);
}

export default useTheme;
