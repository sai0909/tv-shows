import api from '.'

const END_POINT = '/shows'

// Get All TV Shows from the api
function getAllShows () {
  return api.get(END_POINT)
}

// Get TV Show details with cast info
function getShow (showId) {
  return api.get(`${END_POINT}/${showId}?embed[]=seasons&embed[]=cast&embed[]=crew`)
}

// Get TV Show images
function getShowImages (showId) {
  return api.get(`${END_POINT}/${showId}/images`)
}

export { getAllShows, getShow, getShowImages }
