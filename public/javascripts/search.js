$(document).ready ( () => {

    $("#searchForm").on ("submit", function (e) {
        // DEBUG
        // console.log ("Button clicked!");
        // console.log ("We are seeing if the server side default form call still works even if this client-side function is there.")

        e.preventDefault();

        const formData = new FormData (this);

        // DEBUG
        // console.log ("Form input: " + formData.get ("searchKeywords"));

        const searchParams = new URLSearchParams ();

        searchParams.append ("searchKeywords", formData.get ("searchKeywords"));

        fetch ("/search", {
            method: 'post',
            body: searchParams
        }).then ( response => response.json ()).then ( (searchResults) => {

            // DEBUG
            // console.log (searchResults['bestMatches']);

            // the following is an array of all the resulting stocks
            let bestMatches = searchResults['bestMatches'];
            console.log (typeof bestMatches);
            console.log (bestMatches.length);

            let message = document.getElementById("message");

            // insert the resulting data into a table
            let table = document.getElementById("searchResults");

            if (bestMatches.length > 0) {

                message.innerText = "Best Matches: ";

                table.innerHTML = "";
                let tableHeadingsRow = document.createElement("tr");
                let tableHeading1 = document.createElement("th");
                let tableHeading2 = document.createElement("th");
                let tableHeading3 = document.createElement("th");
                tableHeading1.innerText = "Symbol";
                tableHeading2.innerText = "Name";
                tableHeading3.innerText = "Region";
                tableHeadingsRow.appendChild(tableHeading1);
                tableHeadingsRow.appendChild(tableHeading2);
                tableHeadingsRow.appendChild(tableHeading3);
                table.appendChild (tableHeadingsRow);


                for (const stock of bestMatches) {

                    let tableRow = document.createElement("tr");
                    tableRow.classList.add ("clickable-row");
                    let symbol = stock ['1. symbol'];
                    let name = stock ['2. name'];
                    let region = stock ['4. region'];

                    // DEBUG
                    // console.log (symbol);
                    // console.log (name);
                    // console.log (region);

                    let cell1 = tableRow.insertCell () ;
                    cell1.classList.add ("symbol");
                    cell1.innerHTML = symbol;

                    let cell2 = tableRow.insertCell () ;
                    cell2.classList.add ("name");
                    cell2.innerHTML = name;

                    let cell3 = tableRow.insertCell () ;
                    cell3.innerHTML = region;
                    cell3.classList.add ("region");

                    table.appendChild (tableRow);
                }

            } else {
                message.innerText = "Sorry, no matches found.";
                table.innerHTML = "";
            }

        })
            .then ( () => {
                let clickableRows = document.querySelectorAll(".clickable-row");

                /**
                 * Method that sends the user to the stock symbol's page upon
                 * clicking that stock result
                 */
                clickableRows.forEach ( (row) => {
                    row.addEventListener ("click", function (e) {
                        let data = row.getElementsByTagName ("td");
                        const symbol = data [0].innerText;
                        // console.log (symbol);

                        // window.location.href = "http://localhost:3000/stock/" + symbol;

                        // using relative path
                        window.location.href = "/stock/" + symbol;

                    })
                });
            });
    });

});
