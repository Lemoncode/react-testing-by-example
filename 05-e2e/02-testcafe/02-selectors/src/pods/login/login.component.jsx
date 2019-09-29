import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { TextFieldComponent, FormComponent } from 'common/components';
import { useStyles } from './login.component.styles';

export const LoginComponent = props => {
  const { onLogin, credentials, onUpdateCredentials, credentialErrors } = props;

  const classes = useStyles();

  return (
    <Card>
      <CardHeader title="Login" />
      <CardContent>
        <FormComponent className={classes.formContainer} onSubmit={onLogin}>
          <TextFieldComponent
            label="Name"
            name="login"
            value={credentials.login}
            onChange={onUpdateCredentials}
            error={credentialErrors.login.message}
            data-testid="userInput"
          />
          <TextFieldComponent
            label="Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={onUpdateCredentials}
            error={credentialErrors.password.message}
            data-testid="passwordInput"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            data-testid="loginButton"
          >
            Login
          </Button>
        </FormComponent>
      </CardContent>
    </Card>
  );
};
