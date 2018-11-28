import { UPDATE_WISHLIST, ADD_CART, REMOVE_CART } from '../../constants';

export function updateWishlist(flag) {
  return (dispatch) => { 
    dispatch(update(flag))
  }
}

export function addInCart() {
    return (dispatch) => {
        dispatch(addCart())
    }
}

export function removeInCart() {
    return (dispatch) => {
        dispatch(removeCart())
    }
}

export function addCart() {
    return {
        type: ADD_CART
    }
}

export function removeCart() {
    return {
        type: REMOVE_CART
    }
}

export function update(flag) {
  return {
    type: UPDATE_WISHLIST,
    data: flag
  }
}    