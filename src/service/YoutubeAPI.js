import axios from 'axios'

export default class YoutubeAPI {
  get apiKey() {
    return 'AIzaSyCgOxBBXkqvac1aocaWSQJnBaslmxSYg8A'
  }

  build(endpoint) {
    return `https://www.googleapis.com/youtube/v3/${endpoint}`
  }

  search(query) {
    return axios.get(this.build('search'), {
      params: {
        part: 'id, snippet',
        q: query,
        type: 'video',
        key: this.apiKey,
        maxResults: 16
      }
    })
    .then(res => {
      return {
        items: res.data.items,
        pagination:  res.data.pageInfo,
        nextPageToken: res.data.nextPageToken,
        prevPageToken:  res.data.prevPageToken
      }
    })
    .catch(err => {
      console.log('Erro ao buscar lista de videos :(', err)
    })
  }

  searchById(id) {
    return axios.get(this.build('videos'), {
      params: {
        id,
        part: 'snippet,statistics,player',
        key: this.apiKey
      }
    }).then(res => {
      return res.data.items[0]
    }).catch(err => {
      console.error(`Erro ao buscar o video ${id}`)
    })
  }

  getPage(token, query) {
    return axios.get(this.build('search'), {
      params: {
        part: 'id, snippet',
        q: query,
        type: 'video',
        key: this.apiKey,
        pageToke: token,
        maxResults: 16
      }
    }).then(res => {
      return res.data.items
    }).catch(err => {
      console.error(`Erro ao paginar`)
    })
  }
}
