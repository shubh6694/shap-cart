const paneerTikkaImg = require("../../../assets/indian-food/starter/paneer-tikka.jpg");
const haraBharaKabab = require("../../../assets/indian-food/starter/hara-bhara-kabab.jpg");
const chickenLollipopImg = require("../../../assets/indian-food/starter/chicken-lollipop.jpg");
const alooLollipopImg = require("../../../assets/indian-food/starter/aloo-lollipop.jpg");
const chickenTikkaImg = require("../../../assets/indian-food/starter/chicken-tikka.jpg");
const pineappleGrillImg = require("../../../assets/indian-food/starter/pineapple-grill.jpg");
const chickenGrillImg = require("../../../assets/indian-food/starter/chicken-grill.jpg");
const gobiManchurianImg = require("../../../assets/indian-food/starter/gobi-manchuri.jpg");

const dataStarter = [
  {
    image: paneerTikkaImg,
    dishName: "Paneer Tikka",
    amount: "120",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  },
  {
    image: haraBharaKabab,
    dishName: "Hara Bhara Kabab",
    amount: "90",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  },
  {
    image: chickenLollipopImg,
    dishName: "Chicken Lollipop",
    amount: "190",
    badgeDanger: true,
    badgeSuccess: false,
    quantity: 1
  },
  {
    image: alooLollipopImg,
    dishName: "Aloo Lollipop",
    amount: "80",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  },
  {
    image: chickenTikkaImg,
    dishName: "Chicken Tikka",
    amount: "140",
    badgeDanger: true,
    badgeSuccess: false,
    quantity: 0
  },
  {
    image: pineappleGrillImg,
    dishName: "Pineapple Grill",
    amount: "70",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  },
  {
    image: gobiManchurianImg,
    dishName: "Gobi Manchurian",
    amount: "80",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  },
  {
    image: chickenGrillImg,
    dishName: "Chicken Grill",
    amount: "160",
    badgeDanger: true,
    badgeSuccess: false,
    quantity: 0
  }
];

module.exports = dataStarter;
