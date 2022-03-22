import { atom } from 'recoil';

import AppConfigs from '@/configs';

type TState = {
  theme: 'dark' | 'light';
};

const themeState = atom<TState>({
  key: 'themeState',
  default: {
    theme: localStorage.getItem(AppConfigs.storage.THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light',
  },
});

export default themeState;
