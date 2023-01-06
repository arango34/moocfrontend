import { useEffect, useState } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Display from './components/Display';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios(
          `https://restcountries.com/v3.1/name/${search}`
        );
        if (!data) {
          setCountries([]);
          setCountry(null);
        }
        if (data.length === 1) {
          setCountry(data[0]);
        }
        if (data.length > 1) {
          setCountries(data);
          setCountry(null);
        }
      } catch (error) {
        setCountries([]);
        setCountry(null);
        console.log(error.message);
      }
    };

    fetchCountries();
  }, [search]);

  return (
    <section>
      <Search search={search} setSearch={setSearch} />
      {(country || countries.length < 11) && (
        <Display countries={countries} country={country} />
      )}
      {!country && countries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
    </section>
  );
}
export default App;
