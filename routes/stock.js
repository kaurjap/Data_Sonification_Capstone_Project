/**
 * This page displays data for a specific stock company using its
 * symbol as a URL param to query the API to obtain that specific
 * stock company's data.
 */

const express = require ('express');
const router = express.Router ();
const fetch = require ('node-fetch');

// other options for stock price selection
let timeSeriesOptions = [
    "TIME_SERIES_INTRADAY",
    "TIME_SERIES_DAILY",
    "TIME_SERIES_WEEKLY",
    "TIME_SERIES_MONTHLY"
];


// JSON object that stores the stock data configurations
let stockConfiguration = {
    symbol: "",
    priceType: "",
    timeSeries: "",
    startDate: "",
    endDate: "",
};


// object to store the data to play
// This data should be sent as a response
let dataToPlay = {
    dates: [],
    prices: []
};


router.get ("/:symbol", async (req, res) => {

    // for testing, using symbol=MSFT

    const stockSymbol = req.params.symbol;

    stockConfiguration.symbol = stockSymbol;
    res.render ('stock');



    /*

    The following code to fetch the data from API should be put in a different function.

    console.log (dataInterval[1]);
    // DEBUG
    console.log ("Symbol = " + stockSymbol);

    const api_url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + stockSymbol + "&outputsize=full&datatype=json&apikey=RZXPA6POVXIQTX63";

    // use the fetch API to retrieve the data from the stocks API
    const response = await fetch (api_url);
    const json = await response.json ();

    console.log ("---------- API response --------- ");
    console.log (json);
    res.send (json);

     */
});


module.exports = router;