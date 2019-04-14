import React, { useState } from 'react';
import AutocompleteRemoteDataSource from 'data/datasources/remote/AutocompleteRemoteDataSource'
import LocalContext from 'contexts/LocalContext';

export default function LocalSearch() {
  const [locationToBeSearched, updateLocationToBeSearched] = useState('');
  const searchRef = React.createRef();
  const [suggestionsList, updateSuggestionList] = useState([
    { // testinho
      cityName: "Berlin",
      countryName: "Germany",
      latitude: "52.5162142840317",
      longitude: "13.3768173214048"
    },
  ]);
  async function handleLocationSearch({ target }) {
    updateLocationToBeSearched(target.value);
    // const list = await AutocompleteRemoteDataSource.autocomplete(locationToBeSearched)
  };
  const focusOnSearchInput = () => searchRef.current.focus();

  return (
    <LocalContext.Consumer>
      {({location, setLocation}) => (
        <>
          <div className="search-input-container">
            <input
              placeholder={location.name || ''}
              value={locationToBeSearched}
              onChange={handleLocationSearch}
              ref={searchRef}/>
            <img src="/static/search.svg" alt="search for another location" onClick={focusOnSearchInput}/>
          </div>
          <div className="suggestions-area">
            <div className="suggestions-list">
              {suggestionsList.map(suggestion => (
                <div key={suggestion.cityName} className="suggestion" onClick={() => setLocation(suggestion)}>
                  {suggestion.cityName} | <b>{suggestion.countryName}</b>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </LocalContext.Consumer>
  )
}