const rabriRasmalaiImg = require("../../../assets/indian-food/desserts/rabri-rasmalai.jpg");
const gulabJamunImg = require("../../../assets/indian-food/desserts/gulab-jamun.jpg");
const gajarHalwaImg = require("../../../assets/indian-food/desserts/gajar-halwa.jpg");
const rasagullaImg = require("../../../assets/indian-food/desserts/rasagulla.jpg");
const kheerImg = require("../../../assets/indian-food/desserts/kheer.jpg");
const chamChamImg = require("../../../assets/indian-food/desserts/cham-cham.jpg");
const rabriJalebiImg = require("../../../assets/indian-food/desserts/rabri-jalebi.jpg");

const dataDesserts = [
  {
    image: rabriRasmalaiImg,
    dishName: "Rabri Rasmalai",
    amount: "60",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  },
  {
    image: gulabJamunImg,
    dishName: "Gulab Jamun",
    amount: "20",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 0
  },
  {
    image: gajarHalwaImg,
    dishName: "Gajar ka Halwa",
    amount: "60",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 0
  },
  {
    image: rasagullaImg,
    dishName: "Rasagulla",
    amount: "30",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 0
  },
  {
    image: kheerImg,
    dishName: "Kheer",
    amount: "70",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 0
  },
  {
    image: chamChamImg,
    dishName: "Cham Cham",
    amount: "40",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  },
  {
    image: rabriJalebiImg,
    dishName: "Rabri Jalebi",
    amount: "30",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  }
];

module.exports = dataDesserts;
