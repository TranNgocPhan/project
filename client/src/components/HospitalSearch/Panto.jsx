import React, { useContext, useEffect, useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { MapContext } from './HospitalSearch';

import { store } from '../../store';

function Panto() {
    const map = useContext(MapContext);
    const [content, setContent] = useState();
    const { placeCoords, description } = store.getState();

    useEffect(() => {
        if(map !== undefined) {
            map.panTo({ lat: placeCoords.lat, lng: placeCoords.lng });
            map.setZoom(14);
        }
    }, [placeCoords]);

    return (
        <>
            {placeCoords && 
                <>
                    <Marker
                        position={{ lat: placeCoords.lat, lng: placeCoords.lng }}
                        icon={{
                            url: './images/dtb/medicine.png',
                            scaledSize: new window.google.maps.Size(44, 44),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(22, 22)
                        }}
                        onClick={() => setContent(description)}
                    />
                    {content && 
                        <InfoWindow position={{ lat: placeCoords.lat, lng: placeCoords.lng }} onCloseClick={() => setContent(undefined)}>
                            <div style={{maxWidth: '28rem'}}>                   
                                <p style={{color: 'var(--color-textgray)', fontSize: '1.6rem', width: '100%'}}>{description}</p>
                            </div>
                        </InfoWindow>
                    }
                </>
            }
        </>                
    )
}

export default Panto;