import { atom } from 'jotai';
import { RoutesParent } from 'src/components/common/ResultsItem/ResultsItemRoute';
import { Route } from 'src/services/rocks';

type RouteWithParent = {
  route: Route;
  parent: RoutesParent;
}

export const rockActiveRoute = atom<string | null>(null);
export const routeToFavoritesAtom = atom<RouteWithParent | null>(null);