import { Selector } from 'testcafe';
import { config } from '../testcafe.config';
import { getMockRequest, mockHotels } from './mocks';
import { getURL } from './commands';

fixture('Hotel edit specs')
  .page(`${config.baseUrl}/#/hotels`)
  .requestHooks(
    getMockRequest('http://localhost:3000/api/hotels', mockHotels, 200)
  );

test('should navigate to second hotel when click on edit second hotel', async t => {
  // Arrange

  // Act
  await t.click(Selector('[data-testid="editHotelButton-with-hotelId=id-2"]'));

  // Assert
  const url = await getURL();
  await t.expect(url).eql('http://localhost:8080/#/hotels/id-2');
});

test('should update hotel name, and see the update after save button click', async t => {
  // Arrange
  const nameInput = Selector('[data-testid="nameInput"]');
  const updatedName = 'updated name value';

  // Act
  await t.click(Selector('[data-testid="editHotelButton-with-hotelId=id-2"]'));
  await t.selectText(nameInput).pressKey('delete');
  await t.typeText(nameInput, updatedName);
  await t.click(Selector('[data-testid="ratingContainer"] :nth-child(4)'));
  await t.click(Selector('[data-testid="saveButton"]'));

  // Assert
  const url = await getURL();
  await t.expect(url).eql('http://localhost:8080/#/hotels');
  await t
    .expect(Selector('[data-testid="hotelName-with-hotelId=id-2"]').textContent)
    .eql(updatedName);
});
