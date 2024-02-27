import { setContributorsAction } from '@/store/entities/contributors/contributorsActionCreators';
import { fetchContributorsThunk } from '@/store/entities/contributors/thunk/fetchContributorsThunk';
import { ContributorsState } from '@/store/entities/contributors/types/contributorsActions';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { useEffect } from 'react';

export const useContributorsMetaData = () => {
  const dispatch = useAppDispatch();
  const { currentRepo } = useAppSelector((store) => store.currentRepo);
  const { contributors, isContributorsLoading, error }: ContributorsState =
    useAppSelector((store) => store.contributors);

  useEffect(() => {
    if (currentRepo) {
      dispatch(fetchContributorsThunk());
    }
  }, [currentRepo]);

  useEffect(() => {
    return () => {
      dispatch(setContributorsAction(null));
    };
  }, []);

  return {
    items: contributors,
    isLoading: isContributorsLoading,
    error: error,
  };
};
