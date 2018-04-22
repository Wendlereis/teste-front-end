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
    }).then(res => {
      return {
        items: res.data.items,
        pagination: res.data.pageInfo
      }
    }).catch(err => {
      console.error('Erro ao buscar lista de videos :(')
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
}
