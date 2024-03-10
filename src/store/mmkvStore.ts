// import dayjs from "dayjs";
// import { MMKV } from "react-native-mmkv";
// import { RockData } from "src/services/rocks";

// const storage = new MMKV();

// type StorageSchemaTypes = {
//   rock: RockData;
// };

// type StorageKey = keyof StorageSchemaTypes;

// type StorageEntry = {
//   rock: {
//     timestamp: number;
//     value: StorageSchemaTypes['rock'];
//   };
// };

// type OptionalParam<T extends StorageKey> = T extends "rock" ? [id: string] : [];

// const keysExpectingId: (keyof StorageSchemaTypes)[] = ["rock"];

// export const saveToMMKVStorage = <T extends StorageKey>(
//   key: T,
//   value: StorageSchemaTypes[T],
//   ...optionalArgs: OptionalParam<T>
// ) => {
//   let keyToSave: string = key;
//   if (keysExpectingId.includes(key)) {
//     keyToSave = `${key}@${optionalArgs[0]}`;
//   }

//   const valueToSave = {
//     value,
//     timestamp: dayjs(),
//   };
//   const stringToSave = JSON.stringify(valueToSave);

//   storage.set(keyToSave, stringToSave);
// };

// export const getFromMMKVStorage = <T extends StorageKey>(
//   key: T,
//   ...optionalArgs: OptionalParam<T>
// ) => {
//   let keyToRead: string = key;
//   if (keysExpectingId.includes(key)) {
//     keyToRead = `${keyToRead}@${optionalArgs[0]}`;
//   }
//   const stringFromStorage = storage.getString(keyToRead);
//   if (!stringFromStorage) {
//     console.log("Trying to read unexisting value");
//     return null;
//   }
//   const valueFromStorage = JSON.parse(stringFromStorage) as StorageEntry[T];
//   return valueFromStorage;
// };
