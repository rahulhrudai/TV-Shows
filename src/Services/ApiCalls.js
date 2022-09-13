import axios from 'axios'
const baseURL = 'http://api.tvmaze.com/'

export function getAllShows () {
  return axios.get(baseURL + 'shows')
}

export function getShowDetails (id) {
  return axios.get(baseURL + 'shows/' + id)
}

export function searchForShows (showName) {
  return axios.get(baseURL + 'search/shows?q=' + showName)
}
