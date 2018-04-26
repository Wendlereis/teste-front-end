import * as ActionTypes from './types'
import * as videosIntegrations from '../integrations/videosIntegrations'

export const fetchVideos = (query) => {
  return (dispatch) => {
    videosIntegrations.fetchVideos(query)
      .then((videosInfo) => {
        dispatch({
          type: ActionTypes.FETCH_VIDEOS,
          videosInfo
        })
      })
  }
}

export const fetchNextPage = (token, query) => {
  return (dispatch) => {
    videosIntegrations.fetchPage(token, query)
      .then((videosInfo) => {
        dispatch({
          type: ActionTypes.FETCH_NEXT_VIDEOS,
          videosInfo
        })
      })
  }
}

export const fetchPrevPage = (token, query) => {
  return (dispatch) => {
    videosIntegrations.fetchPage(token, query)
      .then((videosInfo) => {
        dispatch({
          type: ActionTypes.FETCH_PREV_VIDEOS,
          videosInfo
        })
      })
  }
}

export const fetchVideoDetails = (id) => {
  return (dispatch) => {
    videosIntegrations.fetchVideoDetails(id)
      .then((videoDetails) => {
        dispatch({
          type: ActionTypes.FETCH_VIDEO_DETAILS,
          videoDetails: videoDetails.data.items
        })
      })
  }
}
