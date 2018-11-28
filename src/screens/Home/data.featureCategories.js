import signedUrl from "../../SignedUrl";

let linkToApi = signedUrl("products/categories", "GET");

// const indianFoodImg = require("../../../assets/home-page/indian-food.jpg");
// const beverageImg = require("../../../assets/home-page/food-carnival.jpg");
// const data = [
//     {
//       image: indianFoodImg,
//       text: "Indian Food",
//       destination: "IndianFoodMenu"
//     },
//     {
//        image: beverageImg,
//        text: "Beverage",
//        destination: "Beverage"
//     },
// ];

let data = [];

fetch(linkToApi, {
    method: 'GET',
})
.then((response) => response.json())
.then((responseData) => {
	responseData.forEach(function(item){
		let temp = {
			id: item.id,
			text: item.namne,
			image: item.image.src,
			destination: "IndianFoodMenu"
		};
		data.push(temp);
	});
	module.exports = data;
	alert(JSON.stringify(data));
})
.done();
