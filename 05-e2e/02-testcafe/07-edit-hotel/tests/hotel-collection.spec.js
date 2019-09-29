import { Selector } from 'testcafe';
import { config } from '../testcafe.config';
import { getMockRequest, mockHotels } from './mocks';

fixture('Hotel collection specs').page(`${config.baseUrl}#/hotels`);

test.requestHooks(
  getMockRequest('http://localhost:3000/api/hotels', mockHotels, 200)
)(
  'should fetch 2 hotels and show it in screen when visit /hotels urls',
  async t => {
    // Arrange

    // Act

    // Assert
    await t
      .expect(
        Selector('[data-testid=hotelCollectionContainer]').childElementCount
      )
      .eql(2);
  }
);
