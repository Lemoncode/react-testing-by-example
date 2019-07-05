import * as React from 'react';
import { LanguageContext } from './languageContext';

export const useLanguage = () => {
  const [message, setMessage] = React.useState('');
  const { language, setLanguage } = React.useContext(LanguageContext);

  React.useEffect(() => {
    setMessage(`The current language is: ${language}`);
  }, [language]);

  return {
    message,
    setLanguage,
  };
};
