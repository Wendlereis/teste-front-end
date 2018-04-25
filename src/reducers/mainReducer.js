import { combineReducers } from 'redux'

import videosInfo from './videosReducer'
import videoDetails from './videoDetailsReducer'

export default combineReducers({
  videosInfo,
  videoDetails
})
