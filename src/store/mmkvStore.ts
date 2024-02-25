import { MMKV } from "react-native-mmkv";
import { RockData } from "src/services/rocks";

export const storage = new MMKV();

type StorageSchemaTypes = {
  rock: RockData;
};

type StorageEntry<T> = {
  expiryTimestamp: number;
  value: T;
};
