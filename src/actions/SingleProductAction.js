import { SET_ITEM, SET_SIMILAR_ITEMS, SET_WISHLIST_FLAG } from '../constants'
import signedUrl from "../SignedUrl";
import { FoodCart } from '../helper';

export function setItem(item) {
	return (dispatch) => {

		dispatch(itemFun(item))

		FoodCart.isInWishList(item)
			.then((res) => {
				if (res === 1) {
					dispatch(wishlist(true))
				} else {
					dispatch(wishlist(false))
				}
			});

		if (item.categories) {
			if (item.categories.length > 0) {
				let filters = Object;
				filters = {
					category: item.categories[0].id
				};

				let linkToApi = signedUrl("products", "GET", filters);

				fetch(linkToApi, {
					method: 'GET',
				})
					.then((response) => response.json())
					.then((responseData) => {
						let similarItems = null;
						if (responseData.length > 0) {
							similarItems = [];
						}
						for (let i = 0; i < responseData.length; i++) {
							let item = responseData[i];
							let single = {
								id: item.id,
								image: item.images[0].src,
								name: item.name,
								price: item.price || 0,
								text: item.description.replace(/<\/?[^>]+(>|$)/g, ""),
								badgeDanger: false,
								badgeSuccess: true,
								quantity: 1,
								index: i
							}
							similarItems.push(single);
						}
						dispatch(setSimilarItems(similarItems));
					})
					.done(() => {
					});
			}
		}
	}
}

export function setWishlist(data) {
	return (dispatch) => {
		dispatch(wishlist(data))
	}
}

export function itemFun(item) {
	return {
		type: SET_ITEM,
		data: item
	};
}

export function setSimilarItems(similarItems) {
	return {
		type: SET_SIMILAR_ITEMS,
		data: similarItems
	};
}

export function wishlist(data) {
	return {
		type: SET_WISHLIST_FLAG,
		data
	};
}