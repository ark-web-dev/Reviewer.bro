import { APP_API_URL } from './const';
import { getData } from './getData';

export const getGithubUser = async (userLogin: string) => {
  const response = await getData(`${APP_API_URL}/users/${userLogin}`);

  return response;
};
