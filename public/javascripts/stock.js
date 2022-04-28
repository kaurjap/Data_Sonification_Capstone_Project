
$(document).ready ( function () {

    /*
        array of prices, but of type string
     */
    let prices = [];
    let counter = 0;

    /*
        Tone JS Audio Setup
    */
    let synth = new Tone.Synth().toDestination();


    /**
     * Plot a chart and create a play button when the stock options are
     * selected and submitted.
     */
    $("#stockOptions").on ("submit", function (e) {

        e.preventDefault();

        const symbol = document.getElementById("stockSymbol").innerText;
        const timeSeries = document.getElementById("timeSeries").value;
        const priceType = document.getElementById("priceType").value;

        // DEBUG
        // console.log ("Price Type: ", priceType);
        // console.log ("Time Series: ", timeSeries);


        fetch ("/stock/" + symbol + "/" + timeSeries + "/" + priceType, {
            method: 'get'
        })
            .then((response) => response.json())
            .then(async (response) => {
                // console.log("server response: ");
                console.log ("Data pairs (Server response): ");
                console.log (response.dataPairs);

                prices = response.prices;

                let chartArea = document.getElementById("chartContainer");
                chartArea.innerHTML = "";

                let dataTable = anychart.data.table ();

                await dataTable.addData(response.dataPairs);

                let chart = anychart.stock();
                let plot = chart.plot(0);

                let lineSeries = plot.line(dataTable);
                chart.scroller().line(dataTable);

                // to color mark the rising and falling strokes
                lineSeries.risingStroke('rgba(19,186,66,0.66)', 3, null, 'round', 'round');
                lineSeries.fallingStroke('rgba(186,19,30,0.66)', 3, null, 'round', 'round');

                chart.title("Symbol = " + symbol);
                chart.container("chartContainer");
                chart.draw();
            })
            .then(() => {
                counter ++;
                if (counter === 1) {
                    createButton();
                }
            })
            .then ( async () => {

            let playButton = document.getElementById ("playButton");

            // wait for the audio to set up
            await Tone.start ();

            /**
             * Method to play the data when the play button is clicked
             */
            playButton.addEventListener ("click", function (e) {
                e.preventDefault ();

                let mappedPrices = new Array();

                let soundRange = {
                    min: 100,
                    max: 8000
                }

                // intended array of floats
                let stockPrices = new Array ();

                // convert the prices from strings to floats first
                prices.forEach ( (price) => {
                    stockPrices.push (parseFloat (price));
                });

                let pricesRange = {
                    min: Math.min.apply (null, stockPrices),
                    max: Math.max.apply (null, stockPrices)
                }

                let reversedPrices = stockPrices.reverse ();

                reversedPrices.forEach ( (price) => {
                    mappedPrices.push ( Math.round (scale (price, pricesRange, soundRange)) );
                })

                // DEBUG
                console.log ("Mapped Prices: ");
                console.log (mappedPrices);


                // using Tone's audio synthesizer to produce the sound
                let i = 0;
                mappedPrices.forEach ( (frequency) => {
                    const now = Tone.now ();
                    synth.triggerAttackRelease (frequency, "2n", now);
                    console.log ("i = " + i);
                    i++;
                    sleep (250);
                })

            });

        });
    });

}); // end document.ready ()


/**
 * Using the Date module to create a sleep method
 *
 * @param milliseconds  the number of milliseconds to pause for
 */
let sleep = (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


/**
 * Method that gets called to create a play button
 * after the chart for the desired data is displayed.
 */
let createButton = () => {
    let buttonArea = document.getElementById ("mainArea");

    let playButton = document.createElement("button");
    playButton.innerText = "Play!";
    playButton.setAttribute('id', 'playButton');
    buttonArea.appendChild (playButton);
}


/**
 * Method to scale one value of input data to another value
 * to another range of output data.
 *
 * @param value            the value to be scaled
 * @param inputRange       the minimum and maximum values of the previous range
 * @param outputRange      the minimum and maximum values of the output range
 * @returns {*}            the input value mapped to the output range
 */
let scale = (value, inputRange, outputRange) => {
    let fromRange = inputRange.max - inputRange.min;
    let toRange = outputRange.max - outputRange.min;
    let scale = toRange/fromRange;

    // value * scale + output range's min
    let result = value * scale + outputRange.min;

    if (result < outputRange.min) {
        result = outputRange.min;
    } else if (result > outputRange.max) {
        result = outputRange.max;
    }

    return result;
}