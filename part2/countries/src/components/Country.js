// import { useState, useEffect } from 'react';
import Weather from './Weather';

const Country = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital[0]}</div>
    <div>area {country.area}</div>
    <h3>languages:</h3>
    <ul>
      {Object.values(country.languages).map((val) => (
        <li key={val}>{val}</li>
      ))}
    </ul>
    <img src={country.flags.png} alt={country.name.common} />
    <Weather capital={country.capital[0]} latlng={country.latlng} />
  </div>
);
export default Country;
