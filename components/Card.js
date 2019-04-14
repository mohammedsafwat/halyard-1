import React from 'react'

export default ({
  currency,
  hotelUrl,
  image,
  imageAlt,
  price,
  score
}) => (
  <>
    <a href={hotelUrl} className="card" target="_blank">
      <img src={image} alt={imageAlt || 'This hotel ilustratative image'}/>
      <div className="price"><small>{currency}</small> {price}</div>
      <div className="score">{score}</div>
    </a>
  </>
)

