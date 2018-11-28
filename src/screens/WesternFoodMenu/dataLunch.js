const grilledBuffaloChickenTacosImg = require("../../../assets/western-food/lunch/grilled-buffalo-chicken-tacos.jpg");
const chickenFingersImg = require("../../../assets/western-food/lunch/chicken-fingers.jpg");
const spanakopitaImg = require("../../../assets/western-food/lunch/spanakopita.jpg");
const veggieBurgerImg = require("../../../assets/western-food/lunch/veggie-burger.jpg");
const greekSaladImg = require("../../../assets/western-food/lunch/greek-salad.jpg");

const dataLunch = [
  {
    image: grilledBuffaloChickenTacosImg,
    dishName: "Grilled Buffalo Chicken Tacos",
    amount: "170",
    badgeDanger: true,
    badgeSuccess: false,
    quantity: 1
  },
  {
    image: chickenFingersImg,
    dishName: "Chicken Fingers",
    amount: "120",
    badgeDanger: true,
    badgeSuccess: false,
    quantity: 0
  },
  {
    image: spanakopitaImg,
    dishName: "Spanakopitay",
    amount: "160",
    badgeDanger: true,
    badgeSuccess: false,
    quantity: 1
  },
  {
    image: veggieBurgerImg,
    dishName: "Veggie Burger",
    amount: "140",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  },
  {
    image: greekSaladImg,
    dishName: "Greek Salad",
    amount: "90",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  }
];

module.exports = dataLunch;
