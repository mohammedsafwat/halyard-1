import React from 'react'
import Card from 'components/Card'

import LocalContext from 'contexts/LocalContext';

export default () => (
  <LocalContext.Consumer>
  {({ setLocation, hotels, error }) => (
    <div className="card-container">
      {error ?
        <>
          <p>There's no suggestions over here.</p>
          <button onClick={setLocation}>Inspire</button>
        </>
      :
      hotels.map(hotels => (
        <Card
          key={hotels.hotelId}
          image={hotels.hotelImage}
          score={hotels.hotelScore}
          price={hotels.hotelPrice}
          hotelUrl={hotels.hotelUrl}
          currency={hotels.hotelCurrencyCode}/>
        ))
      }
    </div>
  )}
</LocalContext.Consumer>
)
