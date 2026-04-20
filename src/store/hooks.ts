import { useAppStore, type AppStoreState } from '@/store/app.store';

export const useAppSelector = <T,>(selector: (state: AppStoreState) => T) => useAppStore(selector);
