import React from 'react';

const List = ({ countries }) => (
  <ul>
    {countries.map((country) => (
      <li key={country.name.common}>{country.name.common}</li>
    ))}
  </ul>
);
export default List;
