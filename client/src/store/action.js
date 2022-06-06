export const getPostList = (postList, searchValue) => {
    return {
      type: 'GET_POST_LIST',
      payload: {postList: postList, searchValue: searchValue}
    }
}
export const getPostID = payload => {
  return {
    type: 'GET_POST_ID',
    payload
  }
}
export const getPlaceCoords = (lat, lng, description) => {
  return {
    type: 'GET_PLACE_COORDS',
    payload: {lat: lat, lng: lng, description: description}
  }
}