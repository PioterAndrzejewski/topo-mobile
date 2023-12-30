import { QueryClient } from '@tanstack/react-query';

class QueryClientSingleton {
  static instance: QueryClient | null = null;

  static getInstance() {
    if (!QueryClientSingleton.instance) {
      QueryClientSingleton.instance = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnReconnect: 'always'
          }
        }
      });
    }
    return QueryClientSingleton.instance;
  }

  private constructor() {
  }
}

export { QueryClientSingleton };
