import { UPDATE_WISHLIST } from '../constants'
const initialState = {
    flag: true
}

export default function wishlistReducer (state = initialState, action) {
  switch (action.type) {
    case UPDATE_WISHLIST:
      return {
        ...state,
        flag: action.data
      }
      
    default:
      return state
  }
}