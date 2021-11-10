//var urlApi = "https://api.oxlajuj.com/api/"
var urlApi = "http://localhost:60957/api/"

var DXTXTname = localStorage.getItem('NameUser');
var DXTXTC0pe = localStorage.getItem('DUXDUser');



function CargarDatosUser() {
    $(NombreUserPerfil).prepend(DXTXTname);
    CargarMaterialDidactico();
}

function CargarMaterialDidactico() {
    var settings = {
        "url": urlApi + "TitulosWoksheetUser",
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
        console.log(response);
        $.each(
            response,
            function(index, data) {

                var HojaId = data.IdHojaEncabezado
                var HojaTitulo = data.TxtTitulo
                var HOjaCuerpo = data.TxtDescripcion

                var MaterialDidactico = '<div class="col-md-6 col-sm-12"><div class="card"><div class="card-body"><h5 class="card-title"><i class="fas fa-chalkboard-teacher"></i> <span id="UsuarioTituloHoja">' + HojaTitulo + '</span></h5><p class="card-text"><span id="UsuarioCuerpoHoja">' + HOjaCuerpo + '</span></p><button type="button" class="btn btn-outline-success btn-sm">Visualizar <i class="fas fa-external-link-alt"></i></button></div></div></div>'
                $(GridMaterialDidactico).prepend(MaterialDidactico);

            }
        );
    });
}