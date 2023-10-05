import { apiConfig } from './apiConfig';
import qs from 'qs';
import authService from "./auth"

export const grades = {
  0: "I",
  1: "II",
  2: "II+",
  3: "III+",
  4: "IV",
  5: "IV+",
  6: "V-",
  7: "V",
  8: "V+",
  9: "VI-",
  10: "VI",
  11: "VI+",
  12: "VI.1",
  13: "VI.1+",
  14: "VI.2",
  15: "VI.2+",
  16: "VI.3",
  17: "VI.3+",
  18: "VI.4",
  19: "VI.4+",
  20: "VI.5",
  21: "VI.5+",
  22: "VI.6",
  23: "VI.6+",
  24: "VI.7",
  25: "VI.7+",
  26: "VI.8",
}

export type Coordinates = {
  id: number;
  latitude: number;
  longtitude: number;
}

export type ImageFormats = {
  large: ImageFormat;
  medium: ImageFormat;
  small: ImageFormat;
  thumbnail: ImageFormat;
}

export type ImageFormat = {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: any;
  size: number;
  url: string;
  width: string;
}

export type Photo = {
  id: number;
  attributes: {
    alternativeText: any;
    caption: any;
    createdAt: string | any;
    ext: string | any;
    formats: ImageFormats | any;
    hash: string | any;
    height: number | any;
    mime: string | any;
    name: string | any;
    previewUrl: any;
    provider: string | any;
    provider_metadata: any;
    size: number | any;
    updatedAt: string | any;
    url: string | any;
    width: any;
  },
}

export type Cover = {
  Author: string;
  Description: string;
  id: number;
  Photo: {data: Photo}
}

export type Meta = {
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number,
    total: number,
  }
}

export type Region = {
  id: number;
  attributes: {
    Name: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  },
}

export type AreaData = {
  id: number;
  attributes: {
    Name: string;
    createdAt: string;
    map_regions: {data: Region[]};
    published_at: string;
    updatedAt: string;
    Coordinates: Coordinates;
    Cover: Cover;
  }
}

export type AreasData = {
  data: AreaData[];
  meta: Meta;
}

export const getAreas = async () => {
  const query = qs.stringify({
    populate: [
      'Coordinates',
      'Cover',
      'Cover.Photo'
    ]
  });
  const { data } = await authService.get<AreasData>(apiConfig.topo.areas(query));
  console.log(data.data[0].attributes.Cover.Photo.data.attributes)
  return data.data;
};