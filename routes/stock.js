/**
 * This page displays data for a specific stock company using its
 * symbol as a URL param to query the API to obtain that specific
 * stock company's data.
 */

const express = require ('express');
const router = express.Router ();
const fetch = require ('node-fetch');

// other options for stock price selection
let timeSeriesKeys = {
  "TIME_SERIES_DAILY": "Time Series (Daily)",
  "TIME_SERIES_WEEKLY": "Weekly Time Series",
  "TIME_SERIES_MONTHLY": "Monthly Time Series"
};


// JSON object that stores the stock data configurations
let requestConfig = {
    symbol: "",
    priceType: "",
    timeSeries: "",
    startDate: "",
    endDate: "",
};

let returnData = {
    dataPairs: [],
    prices: []
};


router.get ("/:symbol", async (req, res) => {

    const stockSymbol = req.params.symbol;
    requestConfig.symbol = stockSymbol;

    // form to take input on options to play
    res.render ('stock', {symbol: stockSymbol});

});


router.get ("/:symbol/:timeSeries/:priceType", async (req, res) => {

    // DEBUG
    // console.log ("URL = " + req.url);
    // console.log ("inside the correct route");

    requestConfig.timeSeries = req.params.timeSeries;
    requestConfig.priceType = req.params.priceType;

    // DEBUG
    // console.log ("Time Series: " + req.params.timeSeries);
    // console.log ("Price Type: " + req.params.priceType);


    const api_url = "https://www.alphavantage.co/query?function=" + requestConfig.timeSeries + "&symbol=" + requestConfig.symbol + "&outputsize=full&datatype=json&apikey=RZXPA6POVXIQTX63";

    // use the fetch API to retrieve the data from the stocks API
    const response = await fetch (api_url);
    const json = await response.json ();
    const data = JSON.parse (JSON.stringify (json));

    console.log ("---------- API response --------- ");

    // filter out the response data into what is needed based on stock configurations
    let dates = data [timeSeriesKeys[requestConfig.timeSeries]];
    // console.log (dates);

    // let dataPairs = [];

    for (let date in dates) {

        const stockPrice = dates [date] [requestConfig.priceType];
        returnData.prices.push (stockPrice);

        let pair = [ date, parseFloat (stockPrice) ];
        // dataPairs.push (pair);
        returnData.dataPairs.push (pair);
    }

    // console.log (dataToPlay);
    // console.log (dataPairs);

    // res.send (JSON.stringify (dataToPlay));
    res.send (returnData);
});


module.exports = router;