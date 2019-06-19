export const getNameCollection = () : Promise<Object[]> =>
    fetch('https://jsonplaceholder.typicode.com/users?')
      .then(response => response.json())
