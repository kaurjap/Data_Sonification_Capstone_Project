$(document).ready ( function () {

    $("#stockOptions").on ("submit", function (e) {

        e.preventDefault ();

        const symbol = document.getElementById("stockSymbol").innerText;
        // const formData = new FormData (this);

        const timeSeries = document.getElementById("timeSeries").value;
        const priceType = document.getElementById("priceType").value;

        // DEBUG
        console.log ("Price Type value in browser", priceType);
        console.log ("Time Series value in browser", timeSeries);

        fetch ("/stock/" + symbol + "/" + timeSeries + "/" + priceType , {
            method: 'get'
        }).then ( (response) => {
            console.log ("server response: " + response);
        });

    });

});
