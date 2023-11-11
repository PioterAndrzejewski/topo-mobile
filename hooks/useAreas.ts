import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAreas, getRegions, getSectors, getRocks } from '../services/rocks';

export const useAreas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: areas, isLoading: areasLoading } = useQuery({
    queryFn: () => getAreas(),
    queryKey: ['areas'],
    cacheTime: Infinity,
  });
  const { data: regions, isLoading: regionsLoading } = useQuery({
    queryFn: () => getRegions(),
    queryKey: ['regions'],
    cacheTime: Infinity,
  });
  const { data: sectors, isLoading: sectorsLoading } = useQuery({
    queryFn: () => getSectors(),
    queryKey: ['sectors'],
    cacheTime: Infinity,
  });
  const { data: rocks, isLoading: rocksLoading } = useQuery({
    queryFn: () => getRocks(),
    queryKey: ['rocks'],
    cacheTime: Infinity,
  });

  useEffect(()=>{
    if (areasLoading || regionsLoading || sectorsLoading || rocksLoading) return setIsLoading(true);
    setIsLoading(false);
  }, [areasLoading, regionsLoading, sectorsLoading, rocksLoading])

  return {areas, regions, sectors, rocks, isLoading}
};
