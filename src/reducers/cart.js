import { SET_CART_ITEM } from '../constants'
const initialState = {
    cart: []
}

export default function cartReducer(state = initialState, action) {
    switch (action.type) {

        case SET_CART_ITEM:
            return {
                ...state,
                cart: action.data
            }

        default:
            return state
    }
}