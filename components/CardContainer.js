import React from 'react'
import Card from 'components/Card'
import InfiniteScroll from "react-infinite-scroll-component";

import LocalContext from 'contexts/LocalContext';

export default () => (
  <LocalContext.Consumer>
  {({ setLocation, hotels, error, scrollBehavior }) => (
    error ?
      <div>
        There's no suggestions over here.
        <button onClick={setLocation}>Inspire</button>
      </div>
      :
      <InfiniteScroll
        className="card-container"
        dataLength={hotels}
        hasMore={true}
        height={400}
        loader={<div></div>}
        next={scrollBehavior}
        scrollThreshold={0.4}
      >
      {/* { hotels.map(hotels => (
        <Card key={hotels.hotelId} image={hotels.hotelImage} score={hotels.hotelScore} price={hotels.hotelPrice}/>
      )) } */}
      </InfiniteScroll>
  )}
</LocalContext.Consumer>
)
