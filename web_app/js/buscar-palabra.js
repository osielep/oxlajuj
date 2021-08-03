var urlApi = "http://localhost:60957/api/"
var LimpiarDiv = "";

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

        //OracionesDeEjemplo()
    });
}

function Limpiar() {

    $("#TxtPalabraTraductor").val("");

    //$("#ResultadoBusquedaEjemplos").val("");
    //$(ResultadoBusquedaEjemplos).prepend(" ");

}
var palabra = 'pasdas \' \' '


function OracionesDeEjemplo() {
    var settings = {
        "url": urlApi + "BuscarOracionDeEjemplo",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "TxtPalabraEspanol": $("#TxtPalabraTraductor").val()
        }),
    };

    document.getElementById('ResultadoBusquedaEjemplos').innerHTML = LimpiarDiv;

    $.ajax(settings).done(function(response) {

        $.each(
            response,
            function(index, data) {

                var idDiv = data.TxtPalabraEspanol;
                var OracionEspanol = data.TxOracionEspanol;
                var OracionMaya = data.TxtOracionIdiomaMaya;

                $(ResultadoBusquedaEjemplos).prepend("<div id=" + idDiv + "> <small><em>Español:</em></small> " + OracionEspanol + " <br> <small><em>Q'eqchi':</em></small> " + OracionMaya + " </div> <br>");

                console.log(response);
            }
        );
    });
}