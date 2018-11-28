const dosaImg = require("../../../assets/indian-food/breakfast/dosa.jpg");
const idliVadaImg = require("../../../assets/indian-food/breakfast/idli-vada.jpg");
const ravaIdliImg = require("../../../assets/indian-food/breakfast/rava-idli.jpg");
const alooParathaImg = require("../../../assets/indian-food/breakfast/aloo-paratha.jpg");
const omeletteImg = require("../../../assets/indian-food/breakfast/cheese-mushroom-omelette.jpg");
const kurmaPuriImg = require("../../../assets/indian-food/breakfast/kurma-puri.jpg");
const palakParathaImg = require("../../../assets/indian-food/breakfast/palak-paratha.jpg");
const pohaImg = require("../../../assets/indian-food/breakfast/poha.jpg");
const upmaImg = require("../../../assets/indian-food/breakfast/upma.jpg");

const dataBreakfast = [
  {
    image: dosaImg,
    dishName: "Masala Dosa",
    amount: "60",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 0
  },
  {
    image: idliVadaImg,
    dishName: "Idli Vada",
    amount: "40",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 1
  },
  {
    image: alooParathaImg,
    dishName: "Aloo Paratha",
    amount: "50",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 2
  },
  {
    image: omeletteImg,
    dishName: "Cheese Mushroom Omelette",
    amount: "60",
    badgeDanger: true,
    badgeSuccess: false,
    quantity: 1
  },
  {
    image: ravaIdliImg,
    dishName: "Rava Idli",
    amount: "30",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 0
  },
  {
    image: palakParathaImg,
    dishName: "Palak Paratha",
    amount: "55",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 0
  },
  {
    image: kurmaPuriImg,
    dishName: "Kurma Puri",
    amount: "50",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 0
  },
  {
    image: pohaImg,
    dishName: "Poha",
    amount: "30",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 0
  },
  {
    image: upmaImg,
    dishName: "Upma",
    amount: "30",
    badgeDanger: false,
    badgeSuccess: true,
    quantity: 0
  }
];

module.exports = dataBreakfast;
