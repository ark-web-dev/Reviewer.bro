import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { ComplexError, CustomError } from '../types/types';

type FetchingData = {
  fetching: (...args: any) => void;
  isLoading: boolean;
  error: ComplexError;
  setError: Dispatch<SetStateAction<ComplexError>>;
};

export const useFetching = (
  callback: (...args: any) => Promise<void>,
  loaderDelay: number = 1000
): FetchingData => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ComplexError>(null);

  const fetching = useCallback(async (...args: any) => {
    let timerId: ReturnType<typeof setTimeout>;

    try {
      timerId = setTimeout(() => setIsLoading(true), loaderDelay);

      await callback.apply(this, args);
      setError(null);
    } catch (err) {
      setError(err as Error | CustomError);
    } finally {
      clearTimeout(timerId!);
      setIsLoading(false);
    }
  }, []);

  return { fetching, isLoading, error, setError };
};
