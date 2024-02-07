import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { ComplexError, CustomError } from '../types/types';

type FetchingData<A> = {
  fetching: (...args: A[]) => void;
  isLoading: boolean;
  error: ComplexError;
  setError: Dispatch<SetStateAction<ComplexError>>;
};

export const useFetching = <A>(
  callback: (...args: A[]) => Promise<void>,
  loaderDelay: number = 500
): FetchingData<A> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ComplexError>(null);

  const fetching = useCallback(async (...args: A[]) => {
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
