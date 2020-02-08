# 06 Material UI

In this example we will test components using material-ui library.

We will start from `05-router`.

# Steps

- `npm install` to install previous sample packages:

```bash
npm install
```

- Let's create a simple material-ui `Card`:

### ./src/card.tsx

```javascript
import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(
  createStyles({
    card: {
      maxWidth: 300,
    },
  })
);

interface Props {
  title: string;
  body: string;
  onClick: () => void;
}

export const CardComponent: React.FunctionComponent<Props> = props => {
  const { title, body, onClick } = props;
  const classes = useStyles(props);

  return (
    <Card className={classes.card}>
      <CardHeader title={title} />
      <CardContent>{body}</CardContent>
      <CardActions>
        <Button color="primary" onClick={onClick}>
          Learn more
        </Button>
      </CardActions>
    </Card>
  );
};
```

- Let's add some specs:

### ./src/card.spec.tsx

```javascript
import * as React from 'react';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import { CardComponent } from './card';

describe('Card component specs', () => {
  it('', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

- should display a card with title and body when it feeds a title and body:

### ./src/card.spec.tsx

```diff
import * as React from 'react';
import { render, waitForElement, fireEvent } from '@testing-library/react';
import { CardComponent } from './card';

describe('Card component specs', () => {
- it('', () => {
+ it('should display a card with title and body when it feeds a title and body', () => {
    // Arrange
+   const props = {
+     title: 'Test title',
+     body: 'Test body',
+     onClick: jest.fn(),
+   };

    // Act
+   const { getByText } = render(<CardComponent {...props} />);

+   const titleElement = getByText(props.title);
+   const bodyElement = getByText(props.body);

    // Assert
+   expect(titleElement).toBeInTheDocument();
+   expect(bodyElement).toBeInTheDocument();
  });
});

```

- should call onClick property when it clicks on "Learn more" button:

### ./src/card.spec.tsx

```diff
...

+ it('should call onClick property when it clicks on "Learn more" button', () => {
+   // Arrange
+   const props = {
+     title: 'Test title',
+     body: 'Test body',
+     onClick: jest.fn(),
+   };

+   // Act
+   const { getByText } = render(<CardComponent {...props} />);

+   const buttonElement = getByText('Learn more');
+   fireEvent.click(buttonElement);

+   // Assert
+   expect(props.onClick).toHaveBeenCalled();
+ });

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
