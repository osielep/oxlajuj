var urlApi = "http://localhost:60957/api/"

function BuscarPalabra() {
    var settings = {
        "url": urlApi + "BuscarPalabra",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "TxtPalabraEspanol": $("#TxtPalabraTraductor").val()
        }),
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        $.each(response, function(index, data) {
            var MejorResultado = data.TxtPalabraIdiomaMaya;
            document.getElementById('TxtMejorResultado').innerHTML = MejorResultado;
            Limpiar()
        });
    });
}

function Limpiar() {
    $("#TxtPalabraTraductor").val("");
}
var palabra = 'pasdas \' \' '