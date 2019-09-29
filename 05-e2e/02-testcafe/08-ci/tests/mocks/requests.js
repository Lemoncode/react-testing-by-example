import { RequestMock } from 'testcafe';

export const getMockRequest = (url, data, statusCode) =>
  RequestMock()
    .onRequestTo(url)
    .respond(data, statusCode, {
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': true,
    });
