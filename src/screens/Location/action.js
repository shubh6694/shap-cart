import { UPDATE_ADDRESS } from '../../constants'

export function updateAddress(address) {
  return (dispatch) => { 
    dispatch(setAddress(address))
  }
}

export function setAddress(address) {
  return {
    type: UPDATE_ADDRESS,
    data: address 
  }
}    