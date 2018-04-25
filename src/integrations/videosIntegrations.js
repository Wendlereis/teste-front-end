import axios from 'axios'

const API = 'https://www.googleapis.com/youtube/v3'
const API_KEY = 'AIzaSyCgOxBBXkqvac1aocaWSQJnBaslmxSYg8A'

const handleFetchVideos = (res) => {
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
}

export const fetchVideos = (query) => {
  return axios.get(`${API}/search`, {
    params: {
      part: 'id, snippet',
      q: query,
      type: 'video',
      key: API_KEY,
      maxResults: 16
    }
  })
  .then(handleFetchVideos)
  .catch(err => {
    console.log('Erro ao buscar lista de videos :(', err)
  })
}

export const fetchPage = (token, query) => {
  return axios.get(`${API}/search`, {
    params: {
      part: 'id, snippet',
      q: query,
      type: 'video',
      key: API_KEY,
      pageToken: token,
      maxResults: 16
    }
  }).then(handleFetchVideos).catch(err => {
    console.error(`Erro ao paginar`)
  })
}

export const fetchVideoDetails = (id) => {
  return axios.get(`${API}/videos`, {
    params: {
      id,
      part: 'snippet,statistics,player',
      key: API_KEY
    }
  }).then(res => {
    return res
  })
}
