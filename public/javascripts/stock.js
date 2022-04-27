$(document).ready ( function () {

    console.log ("inside javascript file");

    $("#stockOptions").on ("submit", function (e) {

        e.preventDefault ();

        const formData = new FormData (this);

        sendData (formData);

        // DEBUG
        console.log ("after sending form data");
    });

});


let sendData = function (formData) {

    const XHR = new XMLHttpRequest ();

    let encodedUrl = "";
    let data = [];

    data.push (encodeURI (formData.timeSeries));
    data.push (encodeURI (formData.priceType));

    // DEBUG
    for (let item in data) {
        console.log (item);
    }

    encodedUrl = data.join ('/');

    // DEBUG
    console.log ("Encoded URL: " + encodedUrl);

    XHR.open ("GET", ("/"+encodedUrl));
    XHR.send ();
}