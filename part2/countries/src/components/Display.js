// import { useEffect } from 'react';
import Country from './Country';
import List from './List';

const Display = ({ countries, country }) => (
  <>
    {country ? <Country country={country} /> : <List countries={countries} />}
  </>
);

export default Display;
