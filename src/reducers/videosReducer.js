import * as ActionsTypes from '../actions/types'

function videosReducer(state = { items: [] }, action) {
    const { videosInfo = { items: [] }, type } = action

    switch(type){
        case ActionsTypes.FETCH_VIDEOS:
            return videosInfo
        case ActionsTypes.FETCH_PREV_VIDEOS:
            return videosInfo
        case ActionsTypes.FETCH_NEXT_VIDEOS:
            return videosInfo
        default:
            return state
    }
}

export default videosReducer
