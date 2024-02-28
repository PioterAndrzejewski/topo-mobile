import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Toast from "react-native-toast-message";

import { useAreas } from "src/hooks/useAreas";
import { useUserSubscription } from "src/hooks/useUserSubscription";
import { useUserProductsId } from "src/services/payments";
import {
  Exhibition,
  Formations,
  RockData,
  RouteType,
  Shading,
} from "src/services/rocks";

export type GradeInterestedSection = {
  label: string;
  gradeMin: number;
  gradeMax: number;
};

export const gradesSectionsClean: GradeInterestedSection[] = [
  {
    label: "I - III+",
    gradeMin: 0,
    gradeMax: 3,
  },
  {
    label: "IV - IV+",
    gradeMin: 4,
    gradeMax: 5,
  },
  {
    label: "V- - V+",
    gradeMin: 6,
    gradeMax: 8,
  },
  {
    label: "VI- - VI+",
    gradeMin: 9,
    gradeMax: 11,
  },
  {
    label: "VI.1 - VI.1+",
    gradeMin: 12,
    gradeMax: 13,
  },
  {
    label: "VI.2 - VI.2+",
    gradeMin: 14,
    gradeMax: 15,
  },
  {
    label: "VI.3 - VI.3+",
    gradeMin: 16,
    gradeMax: 17,
  },
  {
    label: "VI.4 - VI.4+",
    gradeMin: 18,
    gradeMax: 19,
  },
  {
    label: "VI.5 - VI.5+",
    gradeMin: 20,
    gradeMax: 21,
  },
  {
    label: "VI.6 - VI.6+",
    gradeMin: 22,
    gradeMax: 23,
  },
  {
    label: "VI.7 - VI.7+",
    gradeMin: 24,
    gradeMax: 25,
  },
  {
    label: "VI.8 - VI.8+",
    gradeMin: 24,
    gradeMax: 30,
  },
];

export type FormationSelected = {
  type: Formations;
  selected: boolean;
};

export const formationsSelectedClean: Formations[] = [
  "slab",
  "vertical",
  "overhang",
  "roof",
  "chimney",
  "crack",
  "pillar",
];

export const expositionSelectedClean: Exhibition[] = [
  "north",
  "south",
  "east",
  "west",
];

export const shadingSelectedClean: Shading[] = [
  "shadow",
  "half-shadow",
  "sunny",
];

export const heightValues = [0, 70];

export const routeTypeSelectedClean: RouteType[] = ["sport", "trad", "boulder"];

export const cleanFilterValues = {
  onlyAvailable: false,
  familyFriendly: false,
  heightSelected: heightValues,
  routesInterestedSections: [] as string[],
  formationsSelected: [] as Formations[],
  selectedExposition: [] as Exhibition[],
  shadingSelected: [] as Shading[],
  routeTypeSelected: [] as RouteType[],
};

type FiltersContextValue = {
  filters: typeof cleanFilterValues;
  setFilters: (filters: typeof cleanFilterValues) => void;
  filteredRocks: RockData[];
  activeFiltersCount: number;
  resetFilters: () => void;
  setActiveFiltersCount: (count: number) => void;
};

const FiltersContext = createContext<FiltersContextValue>({
  filters: cleanFilterValues,
  setFilters: (filters: typeof cleanFilterValues) => undefined,
  filteredRocks: [],
  activeFiltersCount: 0,
  resetFilters: () => undefined,
  setActiveFiltersCount: (count: number) => undefined,
});

const FiltersContextProvider = ({ children }: { children: ReactNode }) => {
  const { rocks } = useAreas();
  const [filters, setFilters] =
    useState<typeof cleanFilterValues>(cleanFilterValues);
  const [filteredRocks, setFilteredRocks] = useState<RockData[]>([]);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const hasSubscription = useUserSubscription();
  const userProductsIds = useUserProductsId();

  const resetFilters = () => {
    setFilters(cleanFilterValues);
    setActiveFiltersCount(0);
  };

  useEffect(() => {
    if (activeFiltersCount === 0 && rocks) setFilteredRocks(rocks);

    const rocksToFilter = rocks?.filter((rock) => {
      if (
        filters.onlyAvailable &&
        !hasSubscription &&
        rock.attributes.product.data?.attributes.uuid &&
        !userProductsIds?.includes(
          rock.attributes.product.data?.attributes.uuid,
        )
      ) {
        return false;
      }

      if (filters.familyFriendly && !rock.attributes.family_friendly) {
        return false;
      }

      if (
        filters.heightSelected[0] > rock.attributes.height ||
        filters.heightSelected[1] < rock.attributes.height
      ) {
        return false;
      }

      if (
        filters.shadingSelected.length > 0 &&
        !filters.shadingSelected.includes(rock.attributes.shading)
      ) {
        return false;
      }

      if (filters.formationsSelected.length > 0) {
        const rockFormations = rock.attributes.formation.map(
          (formation) => formation.formation,
        );
        const found = filters.formationsSelected.some((element) =>
          rockFormations.includes(element),
        );

        if (!found) {
          return false;
        }
      }

      if (filters.selectedExposition.length > 0) {
        const rockExpositions = rock.attributes.exhibition.map(
          (exposition) => exposition.exhibition,
        );

        if (
          !filters.selectedExposition.some((element) =>
            rockExpositions.includes(element),
          )
        ) {
          return false;
        }
      }

      if (filters.routeTypeSelected.length > 0) {
        const rockRouteTypes = rock.attributes.routes.data.map(
          (route) => route.attributes.Type,
        );
        if (
          !filters.routeTypeSelected.some((element) =>
            rockRouteTypes.includes(element),
          )
        ) {
          return false;
        }
      }

      if (filters.routesInterestedSections.length > 0) {
        const rockRouteGrades = rock.attributes.routes.data.map(
          (route) => route.attributes.grade,
        );
        const selectedRouteGrades = gradesSectionsClean.filter((section) =>
          filters.routesInterestedSections.includes(section.label),
        );
        if (
          !selectedRouteGrades.some((selectedGrade) => {
            return !!rockRouteGrades.find(
              (rockRouteGrade) =>
                selectedGrade.gradeMin <= rockRouteGrade &&
                selectedGrade.gradeMax >= rockRouteGrade,
            );
          })
        ) {
          return false;
        }
      }

      return true;
    });

    setFilteredRocks(rocksToFilter || []);

    if (rocksToFilter?.length === 0) {
      Toast.show({
        type: "info",
        text1: "Brak skał do wyświetlenia",
        text2: "Zmień filtry żeby coś znaleźć ;)",
      });
    }
  }, [activeFiltersCount, filters, rocks]);

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
        filteredRocks,
        resetFilters,
        activeFiltersCount,
        setActiveFiltersCount,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error(
      "This component is tied to Favorites Context - have you used it somewhere else?",
    );
  }
  return context;
};

export { FiltersContextProvider, useFilters };
