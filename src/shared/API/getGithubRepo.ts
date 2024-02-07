import { APP_API_URL } from './const';
import { getData } from './getData';

export const getGithubRepo = async (userLogin: string, repoName: string) => {
  const response = await getData(
    `${APP_API_URL}/repos/${userLogin}/${repoName}`
  );

  return response;
};
