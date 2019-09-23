import { Member } from '../model/member';

const baseUrl = 'https://api.github.com/orgs/lemoncode/members';

export const fetchMembers = (): Promise<Member[]> =>
  fetch(baseUrl)
    .then(extractPayload)
    .catch(getErrorMessage);

const extractPayload = (response: Response): Promise<Member[]> =>
  response.ok ? response.json() : responseError(response);

const responseError = (response: Response): Promise<string> =>
  response.json().then(getErrorMessage);

const getErrorMessage = (error: Error) => Promise.reject(error.message);
