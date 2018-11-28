const kadaiPaneerImg = require("../../../assets/indian-food/mainCourse/kadai-paneer.jpg");
const chickenBiryaniImg = require("../../../assets/indian-food/mainCourse/chicken-biryani.jpg");
const vegHyderabadiGravyImg = require("../../../assets/indian-food/mainCourse/veg-hyderabadi-gravy.jpg");
const prawnCurryImg = require("../../../assets/indian-food/mainCourse/prawn-curry.jpg");
const butterPaneerImg = require("../../../assets/indian-food/mainCourse/butter-paneer.jpg");
const chickenRoastedImg = require("../../../assets/indian-food/mainCourse/chicken-roasted.jpg");
const chickenCurryImg = require("../../../assets/indian-food/mainCourse/chicken-curry.jpg");
const dalMakhaniImg = require("../../../assets/indian-food/mainCourse/dal-makhani.jpg");
const vegBiryaniImg = require("../../../assets/indian-food/mainCourse/veg-biryani.jpg");

const dataMainCourse = [
  {
    image: kadaiPaneerImg,
    dishName: "Kadai Paneer",
    amount: "170",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  },
  {
    image: chickenBiryaniImg,
    dishName: "Chicken Biryani",
    amount: "120",
    badgeDanger: true,
    badgeSuccess: false,
    quantity: 1
  },
  {
    image: vegHyderabadiGravyImg,
    dishName: "Hyderabadi Gravy",
    amount: "160",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  },
  {
    image: prawnCurryImg,
    dishName: "Prawn Curry",
    amount: "140",
    badgeDanger: true,
    badgeSuccess: false,
    quantity: 1
  },
  {
    image: butterPaneerImg,
    dishName: "Butter Paneer",
    amount: "190",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  },
  {
    image: chickenRoastedImg,
    dishName: "Chicken Roasted",
    amount: "220",
    badgeDanger: true,
    badgeSuccess: false,
    quantity: 1
  },
  {
    image: chickenCurryImg,
    dishName: "Chicken Curry",
    amount: "160",
    badgeDanger: true,
    badgeSuccess: false,
    quantity: 0
  },
  {
    image: dalMakhaniImg,
    dishName: "Dal Makhani",
    amount: "120",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  },
  {
    image: vegBiryaniImg,
    dishName: "Dum Biryani",
    amount: "130",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  }
];

module.exports = dataMainCourse;
