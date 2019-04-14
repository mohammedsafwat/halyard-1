import React, {useEffect, useState} from 'react';
import { Marker, StaticMap } from 'react-map-gl';
import LocalContext from 'contexts/LocalContext';

export default function Map() {
  const [viewport, setViewport] = useState({
    zoom: 5,
    bearing: 0,
    pitch: 0,
    height: 0,
    width: 0
  })

  const mapRef = React.createRef()

  useEffect(() => {
    const resize = () => {
      setViewport({
        ...viewport,
        height: window.innerHeight - 60,
        width: window.innerWidth <= 768 ? window.innerWidth : window.innerWidth * 0.7,
      })
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  })

  return (
    <LocalContext.Consumer>
      {({ location }) => (
        <StaticMap
          ref={mapRef}
          mapStyle="mapbox://styles/mapbox/light-v10"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
          {...viewport}
          latitude={+location.location.latitude}
          longitude={+location.location.longitude}
          onViewportChange={(viewport) => setViewport(viewport)}
        >
          <Marker
            latitude={+location.location.latitude}
            longitude={+location.location.longitude}
            offsetLeft={-12}
            offsetTop={-12}>
            <div className="marker" />
          </Marker>
        </StaticMap>
      )}
    </LocalContext.Consumer>
  );
}
