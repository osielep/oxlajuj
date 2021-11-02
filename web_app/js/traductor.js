var urlApi = "https://api.oxlajuj.com/api/"

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
    //Mostrar cards para informacion
    var valor = '';
    document.getElementById('CardDefiniciones').innerHTML = valor;
    $(CardDefiniciones).prepend(CardInfo);
    document.getElementById('CardEjemplos').innerHTML = valor;
    $(CardEjemplos).prepend(CardEje);
    document.getElementById('ComoUsarFrt').textContent = $("#PalabraBuscar").val();



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

            //Mostrar traduccion
            document.getElementById('TxtMejorResultado').innerHTML = MejorResultado;

            //Mostrar info adicional
            document.getElementById('listaPalabra').innerHTML = valor;
            $(DefPlEsp).prepend(PalbraEspanolFrt);
            $(listaPalabra).prepend(listaPalabrasD, CategoriaGramatical);
            $(listaPalabraCTA).prepend(TipoPalabra);

            AutorTexto(data.IdPalabra);
            RecuperarAudio(data.IdPalabra);
        });


    });
    OracionesDeEjemplo()
}

function LimpiarSpan() {

    var valor = '';
    document.getElementById('DefPlEsp').innerHTML = valor;
    document.getElementById('CtaGramFrt').innerHTML = valor;
    document.getElementById('TipoPalrabFrt').innerHTML = valor;


    //$("#ResultadoBusquedaEjemplos").val("");
    //$(ResultadoBusquedaEjemplos).prepend(" ");

}

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
                $.each(
                    response,
                    function(index, data) {

                        var OracionEspanol = data.TxOracionEspanol;
                        var OracionMaya = data.TxtOracionIdiomaMaya;

                        var oraciones1234 = '<div > <small class="text-warning"><em>Q"eqchi"</em></small> ' + OracionMaya + ' <br> <span class="small text-muted"><em class="text-success">Espanol </em>' + OracionEspanol + '</span> </div> <br>'
                        $(oraciones1234).appendTo("#deftraductor");
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
                var BadgeTOP = "<span> <a href='../traductor/index.html?txtPalabra=" + data.TxtPalabraEspanol + "'><span class='badge rounded-pill bg-" + cardcolor + " '>" + data.TxtPalabraEspanol + "</span></a></span>";

                $(ViewTopWords).prepend(BadgeTOP);


            }
        );
    });
}

function CopiarPortapapeles() {
    document.getElementById('toastMensaje').textContent = "Elemento copiado al portapapeles";
    var content = document.getElementById('TxtMejorResultado');
    content.select();
    document.execCommand('copy');
    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

function Notificacion() {

    var TipoError = "¡Debes ingresar una palabra para traducir!"
    var error = '<span class="text-danger"><strong>' + TipoError + '</strong></span>'
    document.getElementById('toastMensaje').innerHTML = error;
    var toastLiveExample = document.getElementById('liveToast')
    var toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
}

function AutorTexto(IdPalabraP) {

    document.getElementById('AutorTextoT').textContent = "";
    document.getElementById('AutorTextoTA').textContent = "";

    var settings = {
        "url": urlApi + "AutorTexto",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdPalabra": IdPalabraP
        }),
    };

    $.ajax(settings).done(function(response) {
        $.each(
            response,
            function(index, data) {

                var nombre = data.TxtNombreAutor
                var apellido = data.TxtApellidoAutor
                $(AutorTextoT).prepend(nombre);
                $(AutorTextoTA).prepend(apellido);
            }

        );
    });
}

function ComprobarParametro() {
    var Pr = localStorage.getItem('PalabraTmp')
    var vr = ""

    if (Pr !== 'null') {
        //$(Pr).appendTo("#PalabraBuscar");
        $(PalabraBuscar).prepend(Pr);
        BuscarPalabra();
    } else {
        //$(PalabraBuscar).prepend(Pr);
    }
}

function RecuperarAudio(DDDAudio) {
    document.getElementById('AutorAudioT').textContent = "";
    document.getElementById('AutorAudioTA').textContent = "";

    var settings = {
        "url": urlApi + "OtenerAudio",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdPalabra": DDDAudio
        }),
    };



    $.get(settings, function(data) {
        if (data.length > 0) {
            $.ajax(settings).done(function(response) {
                $.each(
                    response,
                    function(index, data) {
                        var idA = data.IdAudioEspecial
                        var direccion = data.Direccion
                        var nombreA = data.TxtNombreAutor
                        var apellidoA = data.TxtApellidoAutor
                        $(AutorAudioT).prepend(nombreA);
                        $(AutorAudioTA).prepend(apellidoA);


                        console.log(direccion)
                        var Audio102 = '<span class="badge rounded-pill bg-warning pronunciacion"><span id="txtPRT"><i class="fas fa-play-circle"></i> Escuchar</span></span>';
                        document.getElementById('Audio101').innerHTML = Audio102

                        ReproducirAudio(direccion);
                    }

                );
            });
        } else {

            var Audio404 = '<span></span>'
            document.getElementById('Audio101').innerHTML = Audio404
        }
    });
}

function ReproducirAudio(Direccion101) {
    let boton = document.querySelector(".pronunciacion")

    boton.addEventListener("click", () => {
        $('#txtPRT').html('<i class="fas fa-spinner fa-pulse"></i>  Escuchando')
        let etiquetaAudio = document.createElement("audio")
        etiquetaAudio.setAttribute("src", "" + Direccion101 + "")

        etiquetaAudio.play()
        setTimeout(() => $('#txtPRT').html('<i class="fas fa-play-circle"></i> Escuchar'), 1500)
        $("txtPRT").css("pointer-events", "none");
    })
}