const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


router.get('/', function(req, res, next) {
  res.render ('search');
});


router.post ('/',  async (req, res) => {

  let keywords = req.body.searchKeywords;

  const data = await searchStockSymbol(keywords);

  res.send (data);
});


/**
 * method to search the stocks based on given input from
 * the user
 */
const searchStockSymbol = async (keywords) => {

  // api_url
  let api_url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + keywords + "&apikey=RZXPA6POVXIQTX63";

  let response = await fetch (api_url);
  let data = await response.json();

  // DEBUG
  // console.log ("Data before sending it back to the browser --------");
  // console.log (data);

  return data;
};

module.exports = router;
