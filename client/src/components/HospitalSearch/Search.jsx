import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import { store } from '../../store';
import { getPlaceCoords } from '../../store/action';

import './style.css';

function Search({ handleRerender, coords }) {
    const { value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => coords.lat, lng: () => coords.lng },
            radius: 200 * 1000
        }
    });

    return (
        <div className="search">          
            <Combobox
                onSelect={async (address) => {
                    setValue('');
                    clearSuggestions();
                    try {
                        const results = await getGeocode({ address });
                        const { lat, lng } = await getLatLng(results[0]);
                        store.dispatch(getPlaceCoords(lat, lng, address));
                        handleRerender();
                    } catch (error) {
                        console.log(error);
                    }
                }}
                className="cb_select"
            >
                <ComboboxInput
                    value={value}
                    className="input_search"
                    onChange={e => setValue(e.target.value)}
                    placeholder="Enter an address..."
                >
                </ComboboxInput>
                <ComboboxPopover style={{zIndex: '10'}}>
                    <ComboboxList style={{backgroundColor: '#fff', zIndex: '10', width: '40rem'}}>
                        {status === 'OK' && data.map(({ id, description }) => 
                            <ComboboxOption key={id} value={description} className="cb_menu" />
                        )}   
                    </ComboboxList>                                                                     
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}

export default Search;