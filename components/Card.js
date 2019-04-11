import React from 'react'
import Card from 'components/Card'

export default ({ score, price, image, hotelUrl, imageAlt }) => (
  <>
    <a href={hotelUrl} className="card">
      <img src={image} alt={imageAlt || 'This hotel ilustratative image'}/>
      <div className="price">{price}</div>
      <div className="score">{score}</div>
    </a>
  </>
)
