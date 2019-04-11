import React from 'react'
// import UserLocationRemoteDataSource from 'data/datasources/remote/UserLocationRemoteDataSource'
import Card from 'components/Card'

// class CardContainer extends React.Component {

export default ({ cards }) => (

  // async componentDidMount() {
  //   try {
  //     this.fetchHotelsData = await UserLocationRemoteDataSource.userLocation()
  //   } catch(err) {
  //     console.warn(err);
  //   }
  // }

  // render() {
  //   return (
      <>
        <div className="card-container">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          {/* {
            cards.map(card => {
              <Card key={card.id} score={card.score} price={card.price} image={card.image}/>
            })
          } */}
        </div>
      </>
  //   );
  // }
// }
)

// export default CardContainer

