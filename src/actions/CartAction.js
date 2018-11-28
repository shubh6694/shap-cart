import { SET_CART_ITEM } from '../constants';

export function updateCart(item) {
    return (dispatch) => {
        dispatch(setCartItem(item))
    }
}

export function setCartItem(item) {
    return {
        type: SET_CART_ITEM,
        data: item
    }
}
