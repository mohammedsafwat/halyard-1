import React from 'react'
import Card from 'components/Card'
import InfiniteScroll from "react-infinite-scroll-component";

export default ({ cards, fetchMoreHotels, hasError }) => (
  <>
    { hasError ?
      <div>There's no suggestions over here. Would you like to try <button onClick="">another random destination?</button></div>
      :
      <InfiniteScroll
        className="card-container"
        dataLength={cards.length}
        next={fetchMoreHotels}
        hasMore={true}
        loader={<div></div>}
        scrollThreshold={0.4}
        height={400}
      >
      { cards.map(card => (
        <Card key={card.hotelId} image={card.hotelImage} score={card.hotelScore} price={card.hotelPrice}/>
      )) }
      </InfiniteScroll>
    }
  </>
)
