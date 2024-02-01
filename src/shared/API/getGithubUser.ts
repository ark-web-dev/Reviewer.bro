import { APP_API_URL } from './const';
import { getData } from './getData';

export const getGithubUser = async (userName: string) => {
  const response = await getData(`${APP_API_URL}/users/${userName}`);
  return response;
};
