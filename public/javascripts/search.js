$(document).ready ( function () {

    $("#searchForm").on ("submit", function (e) {
        console.log ("Button clicked!");
        console.log ("We are seeing if the server side default form call still works even if this client-side function is there.")

        e.preventDefault();

        const formData = new FormData (this);

        // DEBUG
        console.log ("Form input: " + formData.get ("searchKeywords"));

        const searchParams = new URLSearchParams ();

        searchParams.append ("searchKeywords", formData.get ("searchKeywords"));

        fetch ("/search", {
            method: 'post',
            body: searchParams
        }).then ( (response) => {
            console.log (typeof response);
            console.log (response.text ());
        });

    });


});