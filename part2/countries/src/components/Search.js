import React from 'react';

const Search = ({ setSearch, search }) => (
  <div>
    find countries
    <input value={search} onChange={(e) => setSearch(e.target.value)} />
  </div>
);

export default Search;
