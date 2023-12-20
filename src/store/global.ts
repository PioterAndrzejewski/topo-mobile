import { atom } from 'jotai';
import { ReactNode } from 'react';

type ConfirmAction = {
  Icon?: ReactNode;
  confirmFn: () => void | Promise<void> |  null;
  message: string;
}

export const confirmActionAtom = atom<ConfirmAction | null>(null);