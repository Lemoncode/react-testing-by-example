import * as React from 'react';
import {Display} from './display';
import {Edit} from './edit';


export const NameEdit = () => {
  const [username, setUsername]  = React.useState('');

  return(
    <>
      <Display username={username}/>
      <Edit username={username} onSetUsername={setUsername}/>
    </>
  )
}
