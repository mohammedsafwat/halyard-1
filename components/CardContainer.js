import React from 'react'
import Card from 'components/Card'

export default ({ cards, hasError }) => (
      <>
        <div className="card-container">
        { hasError ?
          <div>There's no suggestions over here. Would you like to try <button onClick="">another random destination?</button></div>
          :
          cards.map(card => (
            <Card key={card.id} image={card.image} score={card.score} price={card.price}/>
          ))
        }
        </div>
      </>
)
