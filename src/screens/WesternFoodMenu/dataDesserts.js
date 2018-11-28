const raspberryTiramisuImg = require("../../../assets/western-food/desserts/raspberry-tiramisu.jpg");
const waffleSundaeImg = require("../../../assets/western-food/desserts/waffle-sundae.jpg");
const baklavaImg = require("../../../assets/western-food/desserts/baklava.jpg");

const dataDesserts = [
  {
    image: raspberryTiramisuImg,
    dishName: "Raspberry Tiramisu",
    amount: "60",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  },
  {
    image: waffleSundaeImg,
    dishName: "Waffle Sundae",
    amount: "120",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 0
  },
  {
    image: baklavaImg,
    dishName: "Baklava",
    amount: "80",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 0
  }
];

module.exports = dataDesserts;
