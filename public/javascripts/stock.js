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
                lineSeries.risingStroke ('#2FA85A', 3, null, 'round', 'round');
                lineSeries.fallingStroke ('#EE4237', 3, null, 'round', 'round');

                chart.title("Symbol = " + symbol);
                chart.container("chartContainer");
                chart.draw();
            });

    });

});
