'use client';

import { Provider } from 'react-redux';
import { store } from './store';

//@ts-ignore

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    //@ts-ignore
    <Provider store={store}>{children}</Provider>
  );
}
