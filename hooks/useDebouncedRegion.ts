import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { regionAtom } from '../store/results';

export const useDebouncedRegion = (time: number) => {
  const [region, setRegion] = useAtom(regionAtom);
  const [isDebouncing, setIsDebouncing] = useState(false);

  const setRegionDebounced = () => {
    
  }

  return [region, setRegionDebounced];
}