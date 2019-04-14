import React, { useState } from 'react';
import AutocompleteRemoteDataSource from 'data/datasources/remote/AutocompleteRemoteDataSource'
import LocalContext from 'contexts/LocalContext';

export default function LocalSearch() {
  const [locationToBeSearched, updateLocationToBeSearched] = useState('');
  const searchRef = React.createRef();
  const [suggestionsList, updateSuggestionList] = useState([]);
  async function handleLocationSearch({ target }) {
    updateLocationToBeSearched(target.value);
    const list = await AutocompleteRemoteDataSource.autocomplete(locationToBeSearched)
    updateSuggestionList(list);
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
                <div key={suggestion.name} className="suggestion" onClick={() => setLocation(suggestion)}>
                  {suggestion.name} | <b>{suggestion.country}</b>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </LocalContext.Consumer>
  )
}