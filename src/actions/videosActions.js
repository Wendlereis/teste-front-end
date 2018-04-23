import * as ActionTypes from './types'
import videosIntegrations from '../integrations/videosIntegrations'

export const fetchVideos = (query) => {
  return (dispatch) => {
    videosIntegrations.fetchVideos(query)
      .then((videosInfo) => {
          ActionTypes.FETCH_VIDEOS,
          videosInfo
      })
  }
}
