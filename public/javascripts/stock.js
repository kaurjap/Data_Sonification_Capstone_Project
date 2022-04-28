$(document).ready ( function () {

    $("#stockOptions").on ("submit", function (e) {

        e.preventDefault ();

        const symbol = document.getElementById ("stockSymbol").innerText;
        const timeSeries = document.getElementById ("timeSeries").value;
        const priceType = document.getElementById ("priceType").value;

        // DEBUG
        console.log ("Price Type: ", priceType);
        console.log ("Time Series: ", timeSeries);

        fetch ("/stock/" + symbol + "/" + timeSeries + "/" + priceType , {
            method: 'get'
        }).then ( (response) => response.json ())
            .then ( async (response) => {
                console.log("server response: ");
                console.log(response);

                let dataTable = anychart.data.table();

                await dataTable.addData(response);

                let chart = anychart.stock ();
                let plot = chart.plot (0);

                let lineSeries = plot.line (dataTable);
                chart.scroller ().line (dataTable);

                // to color mark the rising and falling strokes
                lineSeries.risingStroke ('rgba(19,186,66,0.66)', 3, null, 'round', 'round');
                lineSeries.fallingStroke ('rgba(186,19,30,0.66)', 3, null, 'round', 'round');

                chart.title("Symbol = " + symbol);
                chart.container("chartContainer");
                chart.draw();
            }).then ( () => {
                createButton ();
        });

    });

});

let createButton = function () {
    let buttonArea = document.getElementById ("mainArea");

    let playButton = document.createElement("button");
    playButton.innerText = "Play!";
    playButton.setAttribute('id', 'playButton');
    buttonArea.appendChild (playButton);
}
