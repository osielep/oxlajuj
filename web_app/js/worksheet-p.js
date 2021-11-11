var urlApi = "http://localhost:60957/api/"
    //var urlApi = "https://api.oxlajuj.com/api/"
var DXTXTname = localStorage.getItem('NameUser');
var DXTXTC0pe = localStorage.getItem('DUXDUser');

function VerAllWorksheet() {
    var settings = {
        "url": "http://localhost:60957/api/VerAllWorksheet",
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

                var MaterialDidactico = '<div class="col"><div class="card"><div class="card-body"><h5 class="card-title">' + HojaTitulo + '</h5><p class="card-text">' + HOjaCuerpo + '</p><div class="btn-group" role="group" aria-label="Basic mixed styles example"><button type="button" class="btn btn-warning btn-sm text-light">Visualizar</button><button type="button" class="btn btn-success btn-sm text-light">Descargar</button></div></div></div></div>'
                $(GridMaterialDidactico).prepend(MaterialDidactico);

            }
        );
    });
}