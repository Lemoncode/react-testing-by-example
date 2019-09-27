# 06 Edit hotel

In this example we are going to test a `hotel edit`.

We will start from `05-custom-commands`.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

- To edit an hotel we need to visit `hotels` and click on edit button:

### ./cypress/integration/hotel-edit.spec.js

```javascript
describe('Hotel edit specs', () => {
  it('should navigate to second hotel when click on edit second hotel', () => {
    // Arrange
    // Act
    // Assert
  });
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

### ./cypress/integration/hotel-edit.spec.js

```diff
describe('Hotel edit specs', () => {
  it('should navigate to second hotel when click on edit second hotel', () => {
    // Arrange
+   const params = {
+     apiPath: '/hotels',
+     fixture: 'fixture:hotels',
+     fetchAlias: 'fetchHotels',
+   };

    // Act
+   cy.loadData(params);
+   cy.visit('#/hotels');
+   cy.wait('@fetchHotels');
+   cy.get('[data-testid="editHotelButton-with-hotelId=id-2"]').click();

    // Assert
+   cy.url().should('eq', 'http://localhost:8080/#/hotels/id-2');
  });
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

### ./src/pods/hotel-collection/components.jsx

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

### ./cypress/fixtures/hotels.json

```diff
[
  {
    "id": "id-1",
    "thumbNailUrl": "test-picture-1",
    "name": "test-name-1",
    "shortDescription": "test-description-1",
    "address1": "test-address-1",
    "hotelRating": 1,
-   "city": "test-city-1"
+   "city": "Seattle"
  },
  {
    "id": "id-2",
    "thumbNailUrl": "test-picture-2",
    "name": "test-name-2",
    "shortDescription": "test-description-2",
    "address1": "test-address-2",
    "hotelRating": 2,
-   "city": "test-city-2"
+   "city": "Chicago"
  }
]

```

- Update spec:

### ./cypress/integration/hotel-edit.spec.js

```diff
...
+ it('should update hotel name, and see the update after save button click', () => {
+   // Arrange
+   const params = {
+     apiPath: '/hotels',
+     fixture: 'fixture:hotels',
+     fetchAlias: 'fetchHotels',
+   };
+   const updatedName = 'updated name value';

+   // Act
+   cy.loadData(params);
+   cy.visit('#/hotels');
+   cy.wait('@fetchHotels');
+   cy.get('[data-testid="editHotelButton-with-hotelId=id-2"]').click();
+   cy.get('[data-testid="nameInput"]')
+     .clear()
+     .type(updatedName);
+   cy.get('[data-testid="ratingContainer"] :nth-child(4)').click();
+   cy.get('[data-testid="saveButton"]').click();

+   // Assert
+   cy.url().should('eq', 'http://localhost:8080/#/hotels');
+   cy.get('[data-testid="hotelName-with-hotelId=id-2"]').should(
+     'have.text',
+     updatedName
+   );
+ });
```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
