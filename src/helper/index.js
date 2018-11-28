import { AsyncStorage } from 'react-native';

export class FoodCart {

	static addToCart(item) {

		// AsyncStorage.removeItem('cartData'); 
		// return;

		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('cartData')
			.then(function(value) {

				let isInCart = false;
				let res = 1; // return response (0 -> Added to cart / 1 -> Cart updated)
				let cartArr = value === null ? [] : JSON.parse(value);

				for(let i = 0; i < cartArr.length; i++) {
					if(cartArr[i].id === item.id) {
						cartArr[i] = item;
						isInCart = true;
						break;
					}
				}

				if(!isInCart) {
					cartArr.push(item);
					res = 0;
				}

				AsyncStorage.setItem('cartData', JSON.stringify(cartArr));
				let response = {
					cart: cartArr,
					result: res
				}
				resolve(response);
			});
		});
	}

	static addToWishList(item) {

		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('wishList')
			.then(function(value) {
 
				let isInCart = false;
				let res = 1; // return response (0 -> Added to wishlist / 1 -> Removed from wishlist)
				let cartArr = value === null ? [] : JSON.parse(value);
				let index = -1;

				for(let i = 0; i < cartArr.length; i++) {
					if(cartArr[i].id === item.id) {
						cartArr[i] = item;
						isInCart = true;
						index = i;
						break;
					}
				}

				if(!isInCart) {
					cartArr.push(item);
					res = 0;
				} else {
					cartArr.splice(index, 1);
				}

				AsyncStorage.setItem('wishList', JSON.stringify(cartArr));
				resolve(res);
			});
		});
	}

	static isInWishList(item) {

		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('wishList')
			.then(function(value) {

				let isInCart = false;
				let res = 1; // return response (0 -> Added to cart / 1 -> Cart updated)
				let cartArr = value === null ? [] : JSON.parse(value);
				if(cartArr.length === 0) {
					res = 0;
				}

				for(let i = 0; i < cartArr.length; i++) {
					if(cartArr[i].id === item.id) {
						cartArr[i] = item;
						isInCart = true;
						break;
					}
				}

				if(!isInCart) {
					res = 0;
				}

				resolve(res);
			});
		});
	}
	static removeFromCart(item) {

		// AsyncStorage.removeItem('cartData');
		// return;

		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('cartData')
			.then(function(value) {

				let res = 1; // return response (0 -> Not removed / 1 -> Removed)
				let cartArr = JSON.parse(value);

				let i;
				for(i = 0; i < cartArr.length; i++) {
					if(cartArr[i].id === item.id) {
						break;
					}
				}
				cartArr.splice(i, 1);

				AsyncStorage.setItem('cartData', JSON.stringify(cartArr));
				const response = {
					result: res,
					cart: cartArr
				};
				resolve(response);
			});
		});
	}

	//my code

	static removeFromWishList(item) {

		// AsyncStorage.removeItem('wishList');
		// return;

		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('wishList')
			.then(function(value) {

				let res = 1; // return response (0 -> Not removed / 1 -> Removed)
				let cartArr = JSON.parse(value);

				let i;
				for(i = 0; i < cartArr.length; i++) {
					if(cartArr[i].id === item.id) {
						break;
					}
				}
				cartArr.splice(i, 1);

				AsyncStorage.setItem('wishList', JSON.stringify(cartArr));
				resolve(res);
			});
		});
	}

	static updateWishList(type, index) {

		// AsyncStorage.removeItem('wishList');
		// return;

		return new Promise((resolve, reject) => {
			AsyncStorage.getItem('wishList')
			.then(function(value) {

				let res = 1; // return response (0 -> Not removed / 1 -> Removed)
				let cartArr = JSON.parse(value);

				switch (type) {
					case 'plus':
						cartArr[index].quantity += 1;
					break;

					case 'minus':
						cartArr[index].quantity -= 1;
					break;
				}
				AsyncStorage.setItem('wishList', JSON.stringify(cartArr));
				resolve(res);
			});
		});
	}
}