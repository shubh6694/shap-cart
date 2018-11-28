import { SET_ITEM } from '../../constants'

export function setItem(item) {
  return (dispatch) => { 
    dispatch(itemFun(item))
  }
}

export function itemFun(item) {
  return {
    type: SET_ITEM,
    data: item
  }
}