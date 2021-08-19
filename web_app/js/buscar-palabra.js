var urlApi = "http://localhost:60957/api/"
var LimpiarDiv = "";

var CardBodyEjemplos = '<dl class="row">'
'<dt class="col-sm-2">' +
'<small class="text-warning">qeqchi<em></em></small>' +
'<small class="text-success "><em>español</em></small>' +
'</dt>' +
'<dd class="col-sm-10">' +
'<span>Xinxk’at li amche’.</span><br>' +
'<span>El palo brujo me quemó.</span>' +
'</dd>' +
'</dl>';

function BuscarPalabra() {
    var settings = {
        "url": urlApi + "BuscarPalabra",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "TxtPalabraEspanol": $("#PalabraBuscar").val()
        }),
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        $.each(response, function(index, data) {
            var MejorResultado = data.TxtPalabraIdiomaMaya;
            var CategoriaGramatical = data.TxtNombreCtaGramatical;
            var TipoPalabra = data.TxtNombreTipoPalabra;
            var PalbraEspanolFrt = $("#PalabraBuscar").val();

            var valor = '';
            document.getElementById('DefPlEsp').innerHTML = valor;
            document.getElementById('CtaGramFrt').innerHTML = valor;
            document.getElementById('TipoPalrabFrt').innerHTML = valor;

            document.getElementById('TxtMejorResultado').innerHTML = MejorResultado;
            $(DefPlEsp).prepend(PalbraEspanolFrt);
            $(CtaGramFrt).prepend(CategoriaGramatical);
            $(TipoPalrabFrt).prepend(TipoPalabra);

            console.log(PalbraEspanolFrt)
                //Limpiar()

        });

        //OracionesDeEjemplo()
    });
}

function LimpiarSpan() {

    var valor = '';
    document.getElementById('DefPlEsp').innerHTML = valor;
    document.getElementById('CtaGramFrt').innerHTML = valor;
    document.getElementById('TipoPalrabFrt').innerHTML = valor;


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
            "TxtPalabraEspanol": $("#PalabraBuscar").val()
        }),
    };

    //document.getElementById('ResultadoBusquedaEjemplos').innerHTML = LimpiarDiv;

    $.ajax(settings).done(function(response) {

        $.each(
            response,
            function(index, data) {

                var idDiv = data.TxtPalabraEspanol;
                var OracionEspanol = data.TxOracionEspanol;
                var OracionMaya = data.TxtOracionIdiomaMaya;
                var oraciones1234 = "<div id=" + idDiv + "> <small class='text-warning'><em>Q'eqchi'</em></small> " + OracionMaya + " <br> <span class='small text-muted'><em class='text-success'>Espanol </em>" + OracionEspanol + "</span> </div> <br>";
                var PalbraEspanolFrt = $("#PalabraBuscar").val();
                var valor = '';
                document.getElementById('ComoUsarFrt').innerHTML = valor;

                $(ComoUsarFrt).prepend(PalbraEspanolFrt);
                $(deftraductor).prepend(oraciones1234);

                console.log(response);
            }
        );
    });
}