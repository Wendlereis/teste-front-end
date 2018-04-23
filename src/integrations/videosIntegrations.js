import axios from 'axios'

const API = 'https://www.googleapis.com/youtube/v3/'
const API_KEY = 'AIzaSyCgOxBBXkqvac1aocaWSQJnBaslmxSYg8A'

export const fetchVideos = (query) => {
  return axios.get(`${API}/search`), {
    params: {
      part: 'id, snippet',
      q: query,
      type: 'video',
      key: API_KEY,
      maxResults: 16
    }
  })
  .then(res => {
    const {
      items,
      pageInfo,
      nextPageToken,
      prevPageToken
    } = res.data
    return {
      items,
      pagination: pageInfo,
      nextPageToken,
      prevPageToken
    }
  })
  .catch(err => {
    console.log('Erro ao buscar lista de videos :(', err)
  })
}
