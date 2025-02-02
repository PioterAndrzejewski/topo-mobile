import qs from "qs";

import { apiConfig, apiUrl } from "src/services/apiConfig";
import authService from "src/services/auth";

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
};

export type gradeOptions = keyof typeof grades;

const possibleItemsTypes = ["areas", "regions", "sectors", "rocks", "routes"];

export type ItemsTypes = {
  [key: number]: (typeof possibleItemsTypes)[number];
};

export const itemsTypes: ItemsTypes = {
  0: possibleItemsTypes[0],
  1: possibleItemsTypes[1],
  2: possibleItemsTypes[2],
  3: possibleItemsTypes[3],
  4: possibleItemsTypes[4],
};

export type Coordinates = {
  id: number;
  latitude: number;
  longitude: number;
};

export type ImageFormats = {
  large: ImageFormat;
  medium: ImageFormat;
  small: ImageFormat;
  thumbnail: ImageFormat;
};

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
};

export type DrawingCoords = {
  id: number;
  x: number;
  y: number;
};

export type Exhibition = "north" | "south" | "east" | "west" | "trees";
export type Formations =
  | "slab"
  | "vertical"
  | "overhang"
  | "roof"
  | "chimney"
  | "crack"
  | "pillar";
export type Popularity = "high" | "medium" | "low";
export type Shading = "shadow" | "half-shadow" | "sunny";

export type FormationData = {
  id: number;
  formation: Formations;
};

export type ExhibitionData = {
  id: number;
  exhibition: Exhibition;
};

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
  };
};

export type Cover = {
  Author: string;
  Description: string;
  id: number;
  Photo: { data: Photo };
};

export type Meta = {
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };
};

export type AreaData = {
  id: number;
  attributes: {
    Name: string;
    createdAt: string;
    children: { data: RegionData[] };
    published_at: string;
    updatedAt: string;
    coordinates: Coordinates;
    Cover: Cover;
    uuid: string;
    parent: {
      data: AreaData | null;
    };
  };
};

export type AreasData = {
  data: AreaData[];
  meta: Meta;
};

export type RegionData = {
  id: number;
  attributes: {
    Name: string;
    createdAt: string;
    children: { data: RegionData[] };
    published_at: string;
    updatedAt: string;
    coordinates: Coordinates;
    Cover: Cover;
    uuid: string;
    parent: {
      data: AreaData | null;
    };
  };
};

export type RegionsData = {
  data: RegionData[];
  meta: Meta;
};

export type UsersRatingSanitized = {
  id: number;
  score: number;
  uuid: string;
};

export type Comment = {
  comment: string;
  createdAt: string;
  id: number;
  publishedAt: string;
  route: RouteInner;
  updatedAt: string;
  user: string;
  uuid: string;
};

export type CommentSanitized = {
  comment: string;
  id: number;
  uuid: string;
};

export type Anchor = "two_rings" | "chain_anchor" | "rescue_ring" | "none";
export type RouteType = "sport" | "trad" | "boulder";

export type RouteInner = {
  Name: string;
  display_name: string;
  Type: RouteType;
  anchor: Anchor;
  createdAt: string;
  grade: keyof typeof grades;
  path: string;
  publishedAt: string;
  updatedAt: string;
  uuid: string;
  averageScore: number;
  usersRating: UsersRatingSanitized;
  comments: Comment[];
  usersComment: null | CommentSanitized;
  author: string;
  first_ascent_author: string;
  rings_number: number;
  description: string;
  author_date: number;
  image_index: number;
  rings_coords: DrawingCoords[];
  anchor_coords: DrawingCoords;
  number_coords: DrawingCoords;
  model_route: {
    data: {
      attributes: {
        route_model: MediaData;
      };
    };
  };
};

export type Route = {
  id: number;
  attributes: RouteInner;
};

export type DrawingImage = {
  id: number;
  elements_scale: number;
  image: { data: Photo };
};

export type ProductSanitized = {
  price: number;
  description: string;
  uuid: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
};

type MediaData = {
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
  };
  id: number;
};

type ModelRockData = {
  attributes: {
    created_at: string;
    published_at: string;
    rock: {
      data: RockData;
    };
    uuid: string;
    model_main: { data: MediaData };
    model_txt: { data: MediaData };
  };
  id: number;
};

export type RockData = {
  id: number;
  attributes: {
    Name: string;
    createdAt: string;
    children: { data: RockData[] };
    published_at: string;
    created_at: string;
    updatedAt: string;
    walk_distance: number;
    height: number;
    exhibition: ExhibitionData[];
    formation: FormationData[];
    popularity: Popularity;
    climbing_restricted: boolean;
    loose_rocks: boolean;
    recommended: boolean;
    coordinates: Coordinates;
    parking_coordinates: Coordinates;
    family_friendly: boolean;
    cover: Cover[];
    uuid: string;
    image: DrawingImage[];
    routes: { data: Route[] };
    parent: {
      data: AreaData;
    };
    Description: string;
    shading: Shading;
    product: {
      data: {
        id: number;
        attributes: ProductSanitized;
      } | null;
    };
    forModerators: boolean;
    model_rock: {
      data: ModelRockData;
    };
  };
};

export type RocksData = {
  data: RockData[];
  meta: Meta;
};

export const getAreas = async () => {
  const query = qs.stringify({
    populate: ["uuid", "coordinates", "Cover", "Cover.Photo"],
  });
  const { data } = await authService.get<RegionsData>(
    apiConfig.topo.areas(query),
  );
  return data.data;
};

export const getRegions = async () => {
  const query = qs.stringify({
    populate: ["uuid", "Cover", "Cover.Photo", "parent", "coordinates"],
  });
  const { data } = await authService.get<RegionsData>(
    apiConfig.topo.regions(query),
  );
  return data.data;
};

export const getSectors = async () => {
  const query = qs.stringify({
    populate: ["uuid", "Cover", "Cover.Photo", "parent", "coordinates"],
  });
  const { data } = await authService.get<RegionsData>(
    apiConfig.topo.sectors(query),
  );
  return data.data;
};

export const getRocks = async () => {
  const query = qs.stringify({
    populate: [
      "uuid",
      "parent",
      "coordinates",
      "routes",
      "cover.Photo",
      "formation",
      "exhibition",
      "product",
      "product.uuid",
    ],
  });
  const { data } = await authService.get<RocksData>(
    apiConfig.topo.rocks(query),
  );
  return data.data;
};

export const getRock = async (id: string) => {
  const query = qs.stringify({
    populate: [
      "uuid",
      "routes",
      "routes.rings_coords",
      "routes.anchor_coords",
      "routes.number_coords",
      "routes.model_route",
      "routes.model_route.route_model",
      "routes.model_route.rings_model",
      "routes.model_route.outline_model",
      "parent",
      "coordinates",
      "parking_coordinates",
      "ratings",
      "cover",
      "cover.Photo",
      "formation",
      "exhibition",
      "image",
      "image.image",
      "product",
      "product.name",
      "product.uuid",
      "product.price",
      "product.description",
      "forModerators",
      "model_rock",
      "model_rock.model_main",
      "model_rock.model_txt",
    ],
    filters: {
      uuid: {
        $eq: id,
      },
    },
  });
  const { data } = await authService.get<RocksData>(
    apiConfig.topo.rocks(query),
  );
  return data.data[0];
};

export const getImage = async (url: string) => {
  const { data } = await authService.get<RocksData>(apiUrl + url);
  return data;
};

export const createRating = async (
  routeId: number,
  rating: number,
  author: string | undefined,
) => {
  const body = {
    data: {
      score: rating,
      user: {
        connect: [author],
      },
      route: {
        connect: [routeId],
      },
    },
  };
  const { data } = await authService.post(
    apiConfig.ratings.create,
    JSON.stringify(body),
  );
  return data;
};

export const updateRating = async (ratingToUpdate: number, rating: number) => {
  const body = {
    data: {
      score: rating,
    },
  };
  if (ratingToUpdate === -1) {
    return;
  }
  const { data } = await authService.put(
    apiConfig.ratings.update(ratingToUpdate),
    JSON.stringify(body),
  );
  return data;
};

export const createComment = async (
  routeId: number,
  comment: string,
  author: string | undefined,
) => {
  const body = {
    data: {
      comment,
      user: {
        connect: [author],
      },
      route: {
        connect: [routeId],
      },
    },
  };
  const { data } = await authService.post(
    apiConfig.comments.create,
    JSON.stringify(body),
  );
  return data;
};

export const updateComment = async (
  commentToUpdate: number | undefined,
  comment: string,
) => {
  if (commentToUpdate === -1) return;
  const body = {
    data: {
      comment,
    },
  };
  const { data } = await authService.put(
    apiConfig.comments.update(commentToUpdate),
    JSON.stringify(body),
  );
  return data;
};
