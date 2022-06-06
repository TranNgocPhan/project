import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import Panto from './Panto';

import Search from './Search';
import mapStyles from './mapStyles';
import './style.css';

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh"
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  gestureHandling: 'greedy'
}
export const MapContext = React.createContext();

function HospitalSearch() {
  const [coords, setCoords] = useState({});
  const [data, setData] = useState([]);
  const [content, setContent] = useState();
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState();
  const [map, setMap] = useState();
  const [flag, setFlag] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA61kKFRHneDlKcgKa7lCfOKk7zV1LTh1Q',
    libraries
  })

  const onMapLoad = useCallback(map1 => {
    const service = new window.google.maps.places.PlacesService(map1);
    const pyrmont = new window.google.maps.LatLng(16.054407, 108.202164);
    service.nearbySearch({
      location: pyrmont,
      radius: 200 * 1000,
      type: ['hospital']
    }, 
    function(results, status) {
      if(status === 'OK') setData(results);
    }
    )
    setMap(map1);
  }, []);
  const handleMapClick = useCallback(e => {
    setMarkers(prevState => [...prevState, {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date()
    }])
  }, []);
  const handleRerender = useCallback(() => {
    flag ? setFlag(false) : setFlag(true);
  }, [flag]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: 16.054407, lng: 108.202164 });
    });
  }, []);
  

  return (
    <MapContext.Provider value={map}>  
        <div className="search_title">
          <h1>Hospital Search</h1>
          <img src="./images/dtb/hospital.png" alt="" className="image_title" />
        </div>
        {coords && isLoaded &&
          <>
            <Search coords={coords} handleRerender={handleRerender} />
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={14}
              center={coords}
              options={options}
              onClick={handleMapClick}
              onLoad={onMapLoad}          
            >
              {markers.length >= 1 && markers.map(obj => 
                <Marker 
                  key={obj.time.toISOString()}
                  position={{ lat: obj.lat, lng: obj.lng }}
                  icon={{
                    url: './images/dtb/medicine.png',
                    scaledSize: new window.google.maps.Size(44, 44),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(22, 22)
                  }}
                  onClick={() => setSelected(obj)}
                />
              )}
              {data.length >= 1 && data.map((obj, index) => 
                <Marker 
                  key={index} 
                  position={obj.geometry.location}
                  icon={{
                    url: './images/dtb/medicine.png',
                    scaledSize: new window.google.maps.Size(44, 44),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(22, 22)
                  }}
                  title={obj.name}
                  onClick={() => setContent(obj)}
                />
              )}
              {content && 
                <InfoWindow position={content.geometry.location} onCloseClick={() => setContent(undefined)}>
                  <div style={{maxWidth: '30rem'}}>                   
                    <p style={{color: 'var(--color-textgray)', fontSize: '1.6rem', width: '100%'}}>{content.name}</p>
                  </div>
                </InfoWindow>
              }
              <Panto />
              {selected && 
                <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected('')}>
                  <div>
                    <h3>Hospital</h3>
                    <p>Time marked: {formatRelative(selected.time, new Date())}</p>
                  </div>
                </InfoWindow>
              }

            </GoogleMap> 
          </>
        }
    </MapContext.Provider>
  )
}

export default HospitalSearch;