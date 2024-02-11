import { atom } from "jotai";
import { ReactNode } from "react";

type ConfirmAction = {
  Icon?: ReactNode;
  confirmFn: () => void | Promise<void> | null;
  message: string;
};

type ContactAction = {
  topic: string;
};

export const confirmActionAtom = atom<ConfirmAction | null>(null);
export const contactAtom = atom<ContactAction | null>(null);
