import { Selector, RequestMock } from 'testcafe';
import { config } from '../testcafe.config';

const hotels = [
  {
    id: 'id-1',
    thumbNailUrl: 'test-picture-1',
    name: 'test-name-1',
    shortDescription: 'test-description-1',
    address1: 'test-address-1',
    hotelRating: 1,
    city: 'test-city-1',
  },
  {
    id: 'id-2',
    thumbNailUrl: 'test-picture-2',
    name: 'test-name-2',
    shortDescription: 'test-description-2',
    address1: 'test-address-2',
    hotelRating: 2,
    city: 'test-city-2',
  },
];
const mock = RequestMock()
  .onRequestTo('http://localhost:3000/api/hotels')
  .respond(hotels, 200, {
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': true,
  });
fixture('Hotel collection specs')
  .page(`${config.baseUrl}#/hotels`)
  .requestHooks(mock);
test('should fetch 2 hotels and show it in screen when visit /hotels urls', async t => {
  // Arrange
  const selector = Selector('[data-testid=hotelCollectionContainer]');

  // Act

  // Assert
  await t
    .expect(
      Selector('[data-testid=hotelCollectionContainer]').childElementCount
    )
    .eql(2);
});
