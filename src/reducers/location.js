import { UPDATE_ADDRESS } from '../constants'
const initialState = {
  address: ''
}

export default function locReducer (state = initialState, action) {
  switch (action.type) {
    case UPDATE_ADDRESS:
      return {
        ...state,
        address: action.data
      }
      
    default:
      return state
  }
}