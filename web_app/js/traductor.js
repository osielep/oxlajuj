var urlApi = "http://api.oxlajuj.com/api/"
var urlApi2 = "http://localhost:60957/api/"
var LimpiarDiv = "";
var scriptAudio = "<span class='ejemplos' style='color: green;'><i class='fas fa-volume-up'></i></span>";
var colours = ["primary", "secondary", "success", "warning", "danger", "info"];
var EspacioInfo = "<div class='row justify-content-md-center gy-3'><div class='col col-lg-5 col-10'><div class='card '><div class='card-body '><label for=' '>Definiciones</label>               <hr width='75% ' />                <div id='def-traductor'>                    <h6><strong> <span  id='DefPlEsp'></span></strong></h6>                    <ul class='fa-ul'>                        <li id='listaPalabra'>                        </li>                    </ul>                    <h6><strong>categoria</strong></h6>                    <ul class='fa-ul'>                        <li id='listaPalabraCTA'>                        </li>                    </ul>                </div>            </div>            <div class='card-fo'>            </div>        </div>    </div>    <div class='col col-lg-5 col-10'>        <div class='card'>            <div class='card-body '>                <label for=' '>¿Cómo usar <strong><span  id='ComoUsarFrt'></span></strong>?</label>                <hr width='75% ' />                <div id='deftraductor'>                </div>            </div>        </div>    </div>    <p></p>    <p></p></div>";
var CardInfo = "<div class='card '>    <div class='card-body '>        <label for=' '>Definiciones</label>        <hr width='75% ' />        <div id='def-traductor'>            <h6><strong> <span  id='DefPlEsp'></span></strong></h6><ul class='fa-ul'><li id='listaPalabra'></li></ul><h6><strong>categoria</strong></h6><ul class='fa-ul'><li id='listaPalabraCTA'></li></ul></div></div></div>"
var CardEje = "<div class='card'>    <div class='card-body '>        <label for=' '>¿Cómo usar <strong><span  id='ComoUsarFrt'></span></strong>?</label>        <hr width='75% ' />        <div id='deftraductor'>        </div>    </div></div>"
var OracionesNo = "<div class='alert alert-warning d-flex align-items-center' role='alert'>    <svg class='bi flex-shrink-0 me-2' width='24' height='24' role='img' aria-label='Warning:'><use xlink:href='#exclamation-triangle-fill'/></svg>    <div>        <strong class=''>Ooops!</strong> <br> Aún no hay ejemplos de esta palabra. <br> <em>¿Quieres contribuir?</em>    </div></div>"

function Mayuscula(palabra) {
    return palabra.map(p => p[0].toUpperCase() + p.slice(1));
}

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

        $.each(response, function(index, data) {

            var MejorResultado = data.TxtPalabraIdiomaMaya;
            var CategoriaGramatical = data.TxtNombreCtaGramatical;

            var PalbraEspanolFrt = $("#PalabraBuscar").val();
            var CategoriaGramatical = "<br><span class='fa-li'><i class='fas fa-spell-check'></i></span> <small class='text-muted'><em>" + data.TxtNombreCtaGramatical + "</em></small> </span></span>"
            var TipoPalabra = "<span class='fa-li'><i class='fas fa-dice-d6'></i></span> <small class='text-muted'><em>" + data.TxtNombreTipoPalabra + "</em></small> </span></span>"
            var listaPalabrasD = "<span class='fa-li'><i class='fas fa-venus-mars'></i></span><small class='text-muted'> <em>Nombre masculino</em></small></span></span>"

            var valor = '';

            //Mostrar cards para informacion
            document.getElementById('CardDefiniciones').innerHTML = valor;
            $(CardDefiniciones).prepend(CardInfo);


            //Mostrar traduccion
            document.getElementById('TxtMejorResultado').innerHTML = MejorResultado;

            //Mostrar info adicional
            document.getElementById('listaPalabra').innerHTML = valor;
            $(DefPlEsp).prepend(PalbraEspanolFrt);
            $(listaPalabra).prepend(listaPalabrasD, CategoriaGramatical);
            $(listaPalabraCTA).prepend(TipoPalabra);


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


    $.get(settings, function(data) {
        if (data.length > 0) {
            $.ajax(settings).done(function(response) {

                //var PalbraEspanolFrt = $("#PalabraBuscar").val();
                //$(PalbraEspanolFrt).appendTo("#ComoUsarFrt");
                //console.log(PalbraEspanolFrt);
                //console.log(response.TxtOracionIdiomaMaya);


                $.each(
                    response,
                    function(index, data) {


                        //Mostrar cards para ejemplos
                        var valor = '';
                        document.getElementById('CardEjemplos').innerHTML = valor;
                        $(CardEjemplos).prepend(CardEje);



                        var OracionEspanol = data.TxOracionEspanol;
                        var OracionMaya = data.TxtOracionIdiomaMaya;
                        var oraciones1234 = "<div > <small class='text-warning'><em>Q'eqchi'</em></small> " + OracionMaya + " <br> <span class='small text-muted'><em class='text-success'>Espanol </em>" + OracionEspanol + "</span> </div> <br>";
                        var PalbraEspanolFrt = $("#PalabraBuscar").val();
                        //console.log(oraciones1234);







                        //Mostrar oraciones
                        $(ComoUsarFrt).prepend(PalbraEspanolFrt);
                        $(deftraductor).prepend(oraciones1234);
                        // $(oraciones1234).appendTo("#deftraductor");
                        //document.getElementById('deftraductor').innerHTML = oraciones1234;
                        //$(deftraductor).prepend(oraciones1234);


                        console.log(response);
                        //console.log(PalbraEspanolFrt);
                    }
                );
            });
        } else {
            document.getElementById('deftraductor').innerHTML = OracionesNo;
        }


    });

}

function PalabrasPopulares() {
    var settings = {
        "url": urlApi + "ObtenerTopPalabras",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function(response) {
        $.each(
            response,
            function(index, data) {

                var cardcolor = colours[Math.floor(Math.random() * colours.length)];
                var BadgeTOP = "<span> <a href='traductor.html?txtPalabra=" + data.TxtPalabraEspanol + "'><span class='badge rounded-pill bg-" + cardcolor + " '>" + data.TxtPalabraEspanol + "</span></a></span>";

                $(ViewTopWords).prepend(BadgeTOP);

                console.log(response);
            }
        );
    });
}