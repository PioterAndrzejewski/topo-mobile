

import { QueryClientSingleton } from 'src/helpers/QueryClient';
import { getUserProfile } from 'src/services/profile';
import { queryKeys } from 'src/services/queryKeys';
import { setUserToStorage } from 'src/services/store';

import navigate from 'src/navigators/navigationRef';

export const initApp = async () => {
  const qc = QueryClientSingleton.getInstance();

  try {
    const profile = await qc.fetchQuery({
      queryKey: queryKeys.profile.me,
      queryFn: () => getUserProfile(),
    });
    if (profile.id) {
      setUserToStorage(profile);
      navigate('HomeNavigator')
    }
  } catch (e) {
    console.log('No user found')
  }
  return true;
}