import { SET_ITEM, SET_SIMILAR_ITEMS, SET_WISHLIST_FLAG } from '../constants'
const initialState = {
  item: {
    id: 0,
    image: null,
    name: '',
    price: 0,
    text: "",
    quantity: 1,
    index: 1,
    categories: []
  },
  similarItems: [],
  isInWishList: false
}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ITEM:
      return {
        ...state,
        item: action.data
      }

    case SET_SIMILAR_ITEMS:
      return {
        ...state,
        similarItems: action.data
      }

    case SET_WISHLIST_FLAG:
      return {
        ...state,
        isInWishList: action.data
      }

    default:
      return state
  }
}