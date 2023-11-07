import { atom, createStore, useAtom } from 'jotai'
import { Region } from 'react-native-maps';
import { AreaData, RegionData, RockData, SectorData } from '../services/rocks';
import MapView from 'react-native-maps';

export const startRegion = {
  latitude: 50.36305,
  longitude: 19.83229,
  latitudeDelta: 1.5,
  longitudeDelta: 1.5,
}

export type Result = AreaData & RegionData & SectorData & RockData;
export type AreasList = AreaData[] | RegionData[] | SectorData[] | RockData[];

export const resultsStageAtom = atom<number>(0)
export const regionAtom = atom<Region>(startRegion);
export const mapAtom = atom<React.RefObject<MapView> | null >(null);
export const zoomAtom = atom(8);
export const listToRenderAtom = atom<AreasList>([]);
