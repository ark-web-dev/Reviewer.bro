import { APP_API_URL } from './const';
import { getData } from './getData';

export const getGithubContributors = async (
  userName: string,
  repoName: string
) => {
  const response = await getData(
    `${APP_API_URL}/repos/${userName}/${repoName}/contributors`
  );

  return response;
};
