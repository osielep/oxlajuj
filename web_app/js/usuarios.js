//var urlApi = "https://api.oxlajuj.com/api/"
var urlApi = "http://localhost:60957/api/"

var DXTXTname = localStorage.getItem('NameUser');
var DXTXTC0pe = localStorage.getItem('DUXDUser');
var tokenGloabl = localStorage.getItem('tokenuser');



function CargarDatosUser() {
    $(NombreUserPerfil).prepend(DXTXTname);
    CargarMaterialDidactico();
    CargarFoto();
}

function CargarMaterialDidactico() {
    var settings = {
        "url": urlApi + "TitulosWoksheetUser",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + tokenGloabl + "",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdUsuario": DXTXTC0pe
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

                var MaterialDidactico = '<div class="col-md-6 col-sm-12"><div class="card"><div class="card-body"><h5 class="card-title"><i class="fas fa-chalkboard-teacher"></i> <span id="UsuarioTituloHoja">' + HojaTitulo + '</span></h5><p class="card-text"><span id="UsuarioCuerpoHoja">' + HOjaCuerpo + '</span></p><a href="../recursos/material-didactico/ver.html?MtDD=' + HojaId + '" class="btn btn-warning btn-sm text-light">Visualizar</a></div></div></div>'
                $(GridMaterialDidactico).prepend(MaterialDidactico);

            }
        );
    });
}


function encodeImageFileAsURL() {

    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            ActualizarFoto(srcData)

        }
        fileReader.readAsDataURL(fileToLoad);
    }
}

function ActualizarFoto(UrlFoto) {
    var settings = {
        "url": "http://localhost:60957/api/ActualizarFoto",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdUsuario": DXTXTC0pe,
            "UrlFoto": UrlFoto
        }),
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        window.location.reload();
    });
}

function CargarFoto() {
    var settings = {
        "url": "http://localhost:60957/api/VerFoto",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdUsuario": DXTXTC0pe
        }),
    };

    $.ajax(settings).done(function(response) {
        $.each(
            response,
            function(index, data) {

                var Url = data.UrlFoto
                localStorage.setItem('FotoUsuario', Url);

                var FtUsr = '<img src="' + Url + '" class="rounded mx-auto d-block" style="width: 250px;" alt="..."></img>'
                $(FotoUsuario).prepend(FtUsr);

            }
        );
    });
}