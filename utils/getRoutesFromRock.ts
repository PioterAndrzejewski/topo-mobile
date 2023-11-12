import { RockData } from '../services/rocks';

export const getRoutesFromRock = (rock: RockData) => {
  const routes = {
    toV: 0,
    toVI2: 0,
    toVI4: 0,
    toVI8: 0,
  };
  rock.attributes.routes.data.forEach((route) => {
    if (route.attributes.grade < 9) return (routes.toV += 1);
    if (route.attributes.grade < 16) return (routes.toVI2 += 1);
    if (route.attributes.grade < 20) return (routes.toVI4 += 1);
    if (route.attributes.grade < 27) return (routes.toVI8 += 1);
  });

  return routes;
};