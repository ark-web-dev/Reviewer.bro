import { APP_API_URL } from './const';
import { getData } from './getData';

export const getGithubUserRepos = async (userLogin: string) => {
  const response = await getData(`${APP_API_URL}/users/${userLogin}/repos`);

  return response;
};
