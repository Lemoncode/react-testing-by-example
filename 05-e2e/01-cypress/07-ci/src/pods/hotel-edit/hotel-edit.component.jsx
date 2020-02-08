import React from 'react';
import {
  TextFieldComponent,
  DropdownComponent,
  TextareaComponent,
  FormComponent,
  RatingComponent,
} from 'common/components';
import { Button } from '@material-ui/core';
import { useStyles } from './hotel-edit.component.styles';

export const HotelEditComponent = props => {
  const { hotel, cities, onFieldUpdate, hotelErrors, onSave } = props;

  const classes = useStyles();

  return (
    <FormComponent className={classes.container} onSubmit={onSave}>
      <TextFieldComponent
        label="Name"
        name="name"
        value={hotel.name}
        onChange={onFieldUpdate}
        error={hotelErrors.name.message}
        data-testid="nameInput"
      />

      <TextFieldComponent
        label="Address"
        name="address"
        value={hotel.address}
        onChange={onFieldUpdate}
        error={hotelErrors.address.message}
        data-testid="addressInput"
      />

      <img className={classes.picture} src={hotel.picture} />

      <RatingComponent
        name="rating"
        value={hotel.rating}
        max={5}
        onChange={onFieldUpdate}
        error={hotelErrors.rating.message}
        data-testid="ratingContainer"
      />

      <DropdownComponent
        name="city"
        label="city"
        onChange={onFieldUpdate}
        value={hotel.city}
        list={cities}
        error={hotelErrors.city.message}
        data-testid="citySelect"
      />

      <TextareaComponent
        name="description"
        label="Description"
        value={hotel.description}
        onChange={onFieldUpdate}
        error={hotelErrors.description.message}
        data-testid="descriptionInput"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        data-testid="saveButton"
      >
        Save
      </Button>
    </FormComponent>
  );
};
