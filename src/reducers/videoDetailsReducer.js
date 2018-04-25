import * as ActionTypes from '../actions/types'

function videoDetailsReducer(state = {}, action) {
  const { videoDetails = {}, type } = action

  switch (type) {
    case ActionTypes.FETCH_VIDEO_DETAILS:
      return videoDetails

    default:
      return state
  }
}

export default videoDetailsReducer
