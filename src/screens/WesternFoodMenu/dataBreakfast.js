const eggBenedictImg = require("../../../assets/western-food/breakfast/egg-benedict.jpg");
const chickenFatijaImg = require("../../../assets/western-food/breakfast/chicken-fajita.jpg");
const frenchToastImg = require("../../../assets/western-food/breakfast/french-toast.jpg");
const buttermilkPancakeImg = require("../../../assets/western-food/breakfast/buttermilk-pancake.jpg");
const monteCristoImg = require("../../../assets/western-food/breakfast/monte-cristo.jpg");

const dataBreakfast = [
  {
    image: eggBenedictImg,
    dishName: "Egg Benedict",
    amount: "60",
    badgeDanger: true,
    badgeSuccess: false,
    quantity: 0
  },
  {
    image: chickenFatijaImg,
    dishName: "Chicken Fatija",
    amount: "90",
    badgeDanger: true,
    badgeSuccess: false,
    quantity: 1
  },
  {
    image: frenchToastImg,
    dishName: "French Toast",
    amount: "40",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 0
  },
  {
    image: buttermilkPancakeImg,
    dishName: "Buttermilk Pancake",
    amount: "70",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 2
  },
  {
    image: monteCristoImg,
    dishName: "Monte Cristo",
    amount: "80",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 0
  }
];

module.exports = dataBreakfast;
