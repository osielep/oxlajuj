//var urlApi = "http://localhost:60957/api/"
var urlApi = "https://api.oxlajuj.com/api/"
var DXTXTname = localStorage.getItem('NameUser');
var DXTXTC0pe = localStorage.getItem('DUXDUser');

function VerAllWorksheet() {
    var settings = {
        "url": urlApi + "VerAllWorksheet",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdUsuario": 1
        }),
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        $.each(
            response,
            function(index, data) {

                var HojaId = data.IdHojaEncabezado
                var HojaTitulo = data.TxtTitulo
                var HOjaCuerpo = data.TxtDescripcion

                var MaterialDidactico = '<div class="col"><div class="card"><div class="card-body"><h5 class="card-title">' + HojaTitulo + '</h5><p class="card-text">' + HOjaCuerpo + '</p><div class="btn-group" role="group" ><a href="ver.html?MtDD=' + HojaId + '" class="btn btn-warning btn-sm text-light">Visualizar</a><a href="#" class="btn btn-success btn-sm text-light">Descargar</a></div></div></div></div>'
                $(GridMaterialDidactico).prepend(MaterialDidactico);

            }
        );
    });
}

function VerCuerpoP(PP_ID_WK) {

    var settings = {
        "url": urlApi + "VerHojaCuerpoParametro",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdHojaEncabezado": PP_ID_WK
        }),
    };



    $.ajax(settings).done(function(response) {

        if (response.length == 0) {
            window.alert("Error, no existen datos en el cuerpo");
        } else {


            $.each(
                response,
                function(index, data) {
                    var DescripcionH = data.TxtDescripcion;
                    var ID_WK_BD = data.IdHojaCuerpo;
                    $(DescripcionHoja).prepend(DescripcionH);
                    VerSeccioneP(ID_WK_BD)
                }
            );
        }

    });
}

function VerSeccioneP(PPDD) {
    var settings = {
        "url": urlApi + "VerTodasLasSeries",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdHojaCuerpo": PPDD
        }),
    };

    $.ajax(settings).done(function(response) {
        $.each(
            response,
            function(index, data) {

                var idTabla = data.IdHojaCuerpo + data.IdHojaSeccion
                var nombreSerie = data.TxtNombreEvaluacion
                var descripcionSerie = data.TxtDescripcion
                var cardTbl = '<div class="col"><div class="card"><div class="card-body"><div class="card-title"><span class="badge rounded-pill bg-success"><span ><i class="fas fa-book-open"></i><strong> SERIE </strong></span></span><br><span class="small text-warning"><strong><span id="TituloSerie">' + nombreSerie + '</span></strong></span><br><span><span id="DescripcionSerie">' + descripcionSerie + '</span></span></div><div class="row"><div class="container"><div class="alert alert-secondary" role="alert"><table id="TablaTopPalabras' + idTabla + '" class="table table-hover"><thead><tr><th scope="col">Español</th><th scope="col">Qeqchi</th></thead><tbody></tbody></table></div></div></div><div id="BtnGuardarTop' + idTabla + '" style="display: block;"></div></div></div></div></div>'
                $(cardTbl).appendTo("#SeccionesTablas");

            }
        );
        //console.log(response)

    });

    VerPalabrasP(PPDD);
}


function VerPalabrasP(TamanioSeccion) {
    var settings = {
        "url": urlApi + "VerHojaPalabrasParametro",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdHojaCuerpo": TamanioSeccion
        }),
    };

    $.ajax(settings).done(function(response) {
        $.each(
            response,
            function(index, data) {

                var idTabla = data.IdHojaCuerpo + data.IdHojaSeccion



                var fila = "<tr><td>" + data.TxtPalabraEspanol +
                    "</td><td>" + data.TxtPalabraIdiomaMaya + "</td></tr>";
                //"</td><td><a href='#' '>  <span class='badge bg-success'><i class='fas fa-plus-square'></i> Agregar</span></a> </td></tr>";
                $(fila).appendTo("#TablaTopPalabras" + idTabla + "");

            }
        );

    });
}