const initialState = {
    postList: [],
    searchValue: '',
    idPost: '',
    placeCoords: {},
    description: ''
};

export default function reducer(state, action) {
    switch(action.type) {
      case 'GET_POST_LIST':
        return {
          postList: [...action.payload.postList],
          searchValue: action.payload.searchValue
        };
      case 'GET_POST_ID':
        return {
          idPost: action.payload
        };
      case 'GET_PLACE_COORDS':
        return {
          placeCoords: { lat: action.payload.lat, lng: action.payload.lng },
          description: action.payload.description
        };
      default: return state;
    }
}
export {initialState};