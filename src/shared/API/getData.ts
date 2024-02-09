import { CustomError } from '../types/types';

export const getData = async (url: string) => {
  let response;

  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error('Something went wrong. Try to reload your page.');
  }

  if (response.ok) {
    return response.json();
  }

  const error: CustomError = {
    status: response.status,
    message:
      response.status === 404
        ? 'Nothing found. Try another request.'
        : 'An error occurred, please try later.',
  };

  throw error;
};
