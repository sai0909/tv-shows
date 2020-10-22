import api from '.'

const END_POINT = '/search/shows?q='

// Get Show details
function getSearchShowsData (query) {
  return api.get(`${END_POINT}${query}`)
}

export { getSearchShowsData }
