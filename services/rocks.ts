import { apiConfig } from './apiConfig';
import qs from 'qs';
import authService from "./auth"
import { apiUrl } from './apiConfig';

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
const possibleItemsTypes = ['areas', 'regions', 'sectors', 'rocks', 'routes'];

export type ItemsTypes = {
  [key: number]: typeof possibleItemsTypes[number];
}

export const itemsTypes: ItemsTypes = {
  0: possibleItemsTypes[0],
  1: possibleItemsTypes[1],
  2: possibleItemsTypes[2],
  3: possibleItemsTypes[3],
  4: possibleItemsTypes[4],

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

export type Exhibition = 'north' | 'south' | 'east' | 'west' | 'trees';
export type Formations = 'slab' | 'vertical' | 'overhang' | 'roof';
export type Popularity = 'high' | 'medium' | 'low';

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

export type AreaData = {
  id: number;
  attributes: {
    Name: string;
    createdAt: string;
    children: {data: RegionData[]};
    published_at: string;
    updatedAt: string;
    Coordinates: Coordinates;
    Cover: Cover;
    uuid: string;
  }
}

export type AreasData = {
  data: AreaData[];
  meta: Meta;
}

export type RegionData = {
  id: number;
  attributes: {
    Name: string;
    createdAt: string;
    children: {data: SectorData[]};
    published_at: string;
    updatedAt: string;
    Coordinates: Coordinates;
    Cover: Cover;
    uuid: string;
    parent: {
      data: AreaData;
    };
  }
}

export type RegionsData = {
  data: RegionData[];
  meta: Meta;
}

export type SectorData = {
  id: number;
  attributes: {
    Name: string;
    createdAt: string;
    children: {data: RockData[]};
    published_at: string;
    updatedAt: string;
    Coordinates: Coordinates;
    Cover: Cover;
    uuid: string;
    parent: {
      data: AreaData;
    };
  }
}

export type SectorsData = {
  data: RegionData[];
  meta: Meta;
}

export type Route = {
  id: number;
  attributes: {
    Name: string;
    display_name: string;
    Type: "sport" | "trad" | "boulder";
    anchor: "two_rings" | "chain_anchor" | "rescue_ring";
    createdAt: string;
    grade: keyof typeof grades;
    path: 'string';
    publishedAt: string;
    updatedAt: string;
    uuid: string;
  }
}

export type RockData = {
  id: number;
  attributes: {
    Name: string;
    createdAt: string;
    children: {data: RockData[]};
    published_at: string;
    created_at: string;
    updatedAt: string;
    walk_distance: number;
    height: number;
    exhibition: Exhibition;
    formation: Formations;
    popularity: Popularity;
    climbing_restricted: boolean;
    loose_rocks: boolean;
    recommended: boolean;
    coordinates: Coordinates;
    parking_coordinates: Coordinates;
    Cover: Cover;
    uuid: string;
    image: {data: Photo};
    routes: {data: Route[]}
    parent: {
      data: AreaData;
    };
  }
}

export type RocksData = {
  data: RockData[];
  meta: Meta;
}

export const getAreas = async () => {
  const query = qs.stringify({
    populate: [
      'uuid',
      'Coordinates',
      'Cover',
      'Cover.Photo'
    ]
  });
  const { data } = await authService.get<AreasData>(apiConfig.topo.areas(query));
  return data.data;
}


export const getRegions = async () => {
    const query = qs.stringify({
      populate: [
        'uuid',
        'Cover',
        'Cover.Photo',
        'parent'
      ]
    });
    const { data } = await authService.get<RegionsData>(apiConfig.topo.regions(query));
    return data.data;
  };

  export const getSectors = async () => {
    const query = qs.stringify({
      populate: [
        'uuid',
        'Cover',
        'Cover.Photo',
        'parent'
      ]
    });
    const { data } = await authService.get<RegionsData>(apiConfig.topo.sectors(query));
    return data.data;
};

export const getRocks = async () => {
  const query = qs.stringify({
    populate: [
      'uuid',
      'Cover',
      'Cover.Photo',
      'parent',
    ]
  });
  const { data } = await authService.get<RocksData>(apiConfig.topo.rocks(query));
  return data.data;
};

export const getRock = async (id: string) => {
  const query = qs.stringify({
    populate: [
      'uuid',
      'image',
      'image.Photo',
      'routes',
      'parent',
      'coordinates',
      'parking_coordinates'
    ],
    filters: {
      uuid: {
        $eq: id,
      },
    }
  });
  const { data } = await authService.get<RocksData>(apiConfig.topo.rocks(query));
  return data.data[0];
};

export const getImage = async (url: string) => {
  const { data } = await authService.get<RocksData>(apiUrl + url);
  return data;
};