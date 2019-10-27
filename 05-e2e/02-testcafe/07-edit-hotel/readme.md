# 07 Edit hotel

In this example we are going to test a `hotel edit`.

We will start from `06-custom-commands`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- To edit an hotel we need to visit `hotels` and click on edit button:

### ./tests/hotel-edit.spec.js

```javascript
import { config } from '../testcafe.config';

fixture('Hotel edit specs').page(`${config.baseUrl}/#/hotels`);

test('should navigate to second hotel when click on edit second hotel', async t => {
  // Arrange
  // Act
  // Assert
});
```

- Add `data-testid`:

### ./src/pods/hotel-collection/components/hotel-card.component.jsx

```diff
...
      <CardActions>
        <IconButton
          aria-label="Add to favorites"
          onClick={() => onEditHotel(hotel.id)}
+         data-testid={`editHotelButton-with-hotelId=${hotel.id}`}
        >
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

```

- Add spec:

### ./tests/hotel-edit.spec.js

```diff
+ import { Selector } from 'testcafe';
import { config } from '../testcafe.config';
+ import { getMockRequest, mockHotels } from './mocks';

fixture('Hotel edit specs').page(`${config.baseUrl}/#/hotels`);

- test('should navigate to second hotel when click on edit second hotel', async t => {
+ test.requestHooks(
+   getMockRequest('http://localhost:3000/api/hotels', mockHotels, 200)
+ )(
+   'should navigate to second hotel when click on edit second hotel',
  // Arrange

  // Act
+ await t.click(
+   Selector('[data-testid="editHotelButton-with-hotelId=id-2"]')
+ );

  // Assert

});

```

- Let's extract `getUrl` method:

### ./tests/commands/commands.js

```diff
- import { Selector } from 'testcafe';
+ import { Selector, ClientFunction } from 'testcafe';

export const fillLoginForm = async (t, user, password) => {
  await t.typeText(Selector('[data-testid=userInput]'), user);
  await t.typeText(Selector('[data-testid=passwordInput]'), password);
  await t.click(Selector('[data-testid=loginButton]'));
};

+ export const getURL = ClientFunction(() => window.location.href);

```

- Update spec:

### ./tests/hotel-edit.spec.js

```diff
import { Selector } from 'testcafe';
import { config } from '../testcafe.config';
import { getMockRequest, mockHotels } from './mocks';
+ import { getURL } from './commands';

...
test.requestHooks(
  getMockRequest('http://localhost:3000/api/hotels', mockHotels, 200)
)(
  'should navigate to second hotel when click on edit second hotel',
  async t => {
    // Arrange

    // Act
    await t.click(
      Selector('[data-testid="editHotelButton-with-hotelId=id-2"]')
    );

    // Assert
+   const url = await getURL();
+   await t.expect(url).eql('http://localhost:8080/#/hotels/id-2');
  }
);

```

- Update `login` spec:

### ./tests/login.spec.js

```diff
import { Selector, ClientFunction } from 'testcafe';
import { config } from '../testcafe.config';
- import { fillLoginForm } from './commands';
+ import { fillLoginForm, getURL } from './commands';

...

test('should update header user name and navigate to hotels url when type valid credentials', async t => {
  // Arrange
  const user = 'admin';
  const password = 'test';
- const getURL = ClientFunction(() => window.location.href);

...
});

```

- Should update hotel name, and see the update after save button click:

### ./src/pods/hotel-edit/hotel-edit.component.jsx

```diff
...
  return (
    <FormComponent className={classes.container} onSubmit={onSave}>
      <TextFieldComponent
        label="Name"
        name="name"
        value={hotel.name}
        onChange={onFieldUpdate}
        error={hotelErrors.name.message}
+       data-testid="nameInput"
      />

      <TextFieldComponent
        label="Address"
        name="address"
        value={hotel.address}
        onChange={onFieldUpdate}
        error={hotelErrors.address.message}
+       data-testid="addressInput"
      />

      <img className={classes.picture} src={hotel.picture} />

      <RatingComponent
        name="rating"
        value={hotel.rating}
        max={5}
        onChange={onFieldUpdate}
        error={hotelErrors.rating.message}
+       data-testid="ratingContainer"
      />

      <DropdownComponent
        name="city"
        label="city"
        onChange={onFieldUpdate}
        value={hotel.city}
        list={cities}
        error={hotelErrors.city.message}
+       data-testid="citySelect"
      />

      <TextareaComponent
        name="description"
        label="Description"
        value={hotel.description}
        onChange={onFieldUpdate}
        error={hotelErrors.description.message}
+       data-testid="descriptionInput"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
+       data-testid="saveButton"
      >
        Save
      </Button>
    </FormComponent>
  );
};

```

- Update `dropdown` component:

### ./src/common/components/dropdown.component.jsx

```diff
...
      error={error}
+     data-testid={props['data-testid']}
    >
      {list.map(collection => (
...
```

- Update `rating` component:

### ./src/common/components/rating.component.jsx

```diff
...
        value={value}
        max={max}
        onChange={handleChange}
+       data-testid={props['data-testid']}
      />
...

```

- Update `hotel card` component:

### ./src/pods/hotel-collection/components/hotel-card.component.jsx

```diff
...
      <CardHeader
        avatar={<Avatar aria-label="Hotel">{hotel.rating}</Avatar>}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={hotel.name}
+       titleTypographyProps={{
+         'data-testid': `hotelName-with-hotelId=${hotel.id}`,
+       }}
        subheader={hotel.address}
      />
...

```

- Add update `cities` ids with mocks:

### ./tests/mocks/hotels.js

```diff
export const mockHotels = [
  {
    id: 'id-1',
    thumbNailUrl: 'test-picture-1',
    name: 'test-name-1',
    shortDescription: 'test-description-1',
    address1: 'test-address-1',
    hotelRating: 1,
-   city: 'test-city-1',
+   city: 'Seattle',
  },
  {
    id: 'id-2',
    thumbNailUrl: 'test-picture-2',
    name: 'test-name-2',
    shortDescription: 'test-description-2',
    address1: 'test1-address-2',
    hotelRating: 2,
-   city: 'test-city-2',
+   city: 'Chicago',
  },
];

```

- Update spec:

### ./tests/hotel-edit.spec.js

```diff
import { Selector } from 'testcafe';
import { config } from '../testcafe.config';
import { getMockRequest, mockHotels } from './mocks';
import { getURL } from './commands';

- fixture('Hotel edit specs').page(`${config.baseUrl}/#/hotels`);
+ fixture('Hotel edit specs')
+   .page(`${config.baseUrl}/#/hotels`)
+   .requestHooks(
+     getMockRequest('http://localhost:3000/api/hotels', mockHotels, 200)
+   );

- test.requestHooks(
-   getMockRequest('http://localhost:3000/api/hotels', mockHotels, 200)
- )(
-   'should navigate to second hotel when click on edit second hotel',
-   async t => {
+ test('should navigate to second hotel when click on edit second hotel', async t => {
    // Arrange

    // Act
    await t.click(
      Selector('[data-testid="editHotelButton-with-hotelId=id-2"]')
    );

    // Assert
    const url = await getURL();
    await t.expect(url).eql('http://localhost:8080/#/hotels/id-2');
  }
);

...
+ test('should update hotel name, and see the update after save button click', async t => {
+   // Arrange
+   const nameInput = Selector('[data-testid="nameInput"]');
+   const updatedName = 'updated name value';

+   // Act
+   await t.click(Selector('[data-testid="editHotelButton-with-hotelId=id-2"]'));
+   await t.selectText(nameInput).pressKey('delete');
+   await t.typeText(nameInput, updatedName);
+   await t.click(Selector('[data-testid="ratingContainer"] :nth-child(4)'));
+   await t.click(Selector('[data-testid="saveButton"]'));

+   // Assert
+   const url = await getURL();
+   await t.expect(url).eql('http://localhost:8080/#/hotels');
+   await t
+     .expect(Selector('[data-testid="hotelName-with-hotelId=id-2"]').textContent)
+     .eql(updatedName);
+ });

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
