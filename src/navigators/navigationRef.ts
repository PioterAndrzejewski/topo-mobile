import { createNavigationContainerRef } from '@react-navigation/native';
import { HomeScreenNavigationProp } from 'src/types/type';

export const navigationRef = createNavigationContainerRef<HomeScreenNavigationProp>()

export default function navigate(name: string) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
}
