import { RefObject } from 'react';
import { atom, createStore, useAtom } from 'jotai'
import { Region } from 'react-native-maps';
import { AreaData, RegionData, RockData } from '../services/rocks';
import MapView from 'react-native-maps';

export const startRegion = {
  latitude: 50.36305,
  longitude: 19.83229,
  latitudeDelta: 1.5,
  longitudeDelta: 1.5,
}

export type AreasList = RegionData[];

export const resultsStageAtom = atom<number>(0)
export const regionAtom = atom<Region>(startRegion);
export const mapAtom = atom<RefObject<MapView> | null >(null);
export const zoomAtom = atom(8);
export const listToRenderAtom = atom<RockData[]>([]);
export const selectedRockAtom = atom<string | null>(null)