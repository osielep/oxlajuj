//var urlApi = "https://api.oxlajuj.com/api/"
var urlApi = "http://localhost:60957/api/"

function TopLPalabras() {

    document.getElementById('TituloTabla').innerText = ""
    $("#TblPalabras td").remove();

    var settings = {
        "url": urlApi + "ReporteTopLPalabras",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function(response) {
        $.each(
            response,
            function(index, data) {

                var IdPlb = data.IdPalabra
                var EspPlb = data.TxtPalabraEspanol
                var QeqPlb = data.TxtPalabraIdiomaMaya
                var AutPlb = data.Autor
                var CtaPlb = data.TxtNombreCtaGramatical
                var TipPlb = data.TxtNombreTipoPalabra
                var AcmPlb = data.AcumuladoBusquedas

                var fila = "<tr><td>" + IdPlb +
                    "</td><td>" + EspPlb +
                    "</td><td>" + QeqPlb +
                    "</td><td>" + AutPlb +
                    "</td><td>" + CtaPlb +
                    "</td><td>" + TipPlb +
                    "</td><td>" + AcmPlb +
                    "</td><td><a href='' title='Cambiar clave de usuario' onclick='CambiarClave(" + IdPlb + ");'><span class='badge rounded-pill bg-success'><i class='fas fa-edit'></i></i></span></a>  <a href='' title='Desactivar usuario' onclick='DesactivarUsuario(" + IdPlb + ");'><span class='badge rounded-pill bg-danger'><i class='fas fa-trash-alt'></i></i></span></span></a> <a href='' title='Enviar notificación' onclick='Notificacion(" + IdPlb + ");'><span class='badge rounded-pill bg-warning'><i class='fas fa-bell'></i></span></span></a></td></tr>";
                //"</td><td><a href='#' '>  <span class='badge bg-success'><i class='fas fa-plus-square'></i> Agregar</span></a> </td></tr>";
                $(fila).appendTo("#TblPalabras");

            }
        );
    });

    var tx1 = "Primeras 50"
    $(TituloTabla).prepend(tx1);

}


function PalabrasPopulares() {

    document.getElementById('TituloTabla').innerText = ""
    $("#TblPalabras td").remove();

    var settings = {
        "url": urlApi + "ReportePalabrasPopulares",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function(response) {
        $.each(
            response,
            function(index, data) {

                var IdPlb = data.IdPalabra
                var EspPlb = data.TxtPalabraEspanol
                var QeqPlb = data.TxtPalabraIdiomaMaya
                var AutPlb = data.Autor
                var CtaPlb = data.TxtNombreCtaGramatical
                var TipPlb = data.TxtNombreTipoPalabra
                var AcmPlb = data.AcumuladoBusquedas

                var fila = "<tr><td>" + IdPlb +
                    "</td><td>" + EspPlb +
                    "</td><td>" + QeqPlb +
                    "</td><td>" + AutPlb +
                    "</td><td>" + CtaPlb +
                    "</td><td>" + TipPlb +
                    "</td><td>" + AcmPlb +
                    "</td><td><a href='' title='Cambiar clave de usuario' onclick='CambiarClave(" + IdPlb + ");'><span class='badge rounded-pill bg-success'><i class='fas fa-edit'></i></i></i></span></a>  <a href='' title='Desactivar usuario' onclick='DesactivarUsuario(" + IdPlb + ");'><span class='badge rounded-pill bg-danger'><i class='fas fa-trash-alt'></i></span></span></a> <a href='' title='Enviar notificación' onclick='Notificacion(" + IdPlb + ");'><span class='badge rounded-pill bg-warning'><i class='fas fa-bell'></i></span></span></a></td></tr>";
                //"</td><td><a href='#' '>  <span class='badge bg-success'><i class='fas fa-plus-square'></i> Agregar</span></a> </td></tr>";
                $(fila).appendTo("#TblPalabras");

            }
        );
    });

    var tx1 = "Más populares"
    $(TituloTabla).prepend(tx1);

}


function PalabrasCateogria() {

    document.getElementById('TituloTabla').innerText = ""
    $("#TblPalabras td").remove();

    var settings = {
        "url": urlApi + "PalabrasPorCategoria",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdTipoPalabra": $("#SelectTipoAll").val()
        }),
    };

    $.ajax(settings).done(function(response) {
        $.each(
            response,
            function(index, data) {

                var IdPlb = data.IdPalabra
                var EspPlb = data.TxtPalabraEspanol
                var QeqPlb = data.TxtPalabraIdiomaMaya
                var AutPlb = data.Autor
                var CtaPlb = data.TxtNombreCtaGramatical
                var TipPlb = data.TxtNombreTipoPalabra
                var AcmPlb = data.AcumuladoBusquedas

                var fila = "<tr><td>" + IdPlb +
                    "</td><td>" + EspPlb +
                    "</td><td>" + QeqPlb +
                    "</td><td>" + AutPlb +
                    "</td><td>" + CtaPlb +
                    "</td><td>" + TipPlb +
                    "</td><td>" + AcmPlb +
                    "</td><td><a href='' title='Cambiar clave de usuario' onclick='CambiarClave(" + IdPlb + ");'><span class='badge rounded-pill bg-success'><i class='fas fa-key'></i></span></a>  <a href='' title='Desactivar usuario' onclick='DesactivarUsuario(" + IdPlb + ");'><span class='badge rounded-pill bg-danger'><i class='fas fa-user-times'></i></span></span></a> <a href='' title='Enviar notificación' onclick='Notificacion(" + IdPlb + ");'><span class='badge rounded-pill bg-warning'><i class='fas fa-bell'></i></span></span></a></td></tr>";
                //"</td><td><a href='#' '>  <span class='badge bg-success'><i class='fas fa-plus-square'></i> Agregar</span></a> </td></tr>";
                $(fila).appendTo("#TblPalabras");

            }
        );
    });

    var tx1 = "Por categoria"
    $(TituloTabla).prepend(tx1);
}


function ObtenerCategoriasPalabras() {


    var settings = {
        "url": urlApi + "ObtenerCategorias",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function(response) {
        //console.log(response);
        $.each(
            response,
            function(index, data) {
                var IdCategoria = data.IdTipoPalabra;
                var NombreCategoria = data.TxtNombreTipoPalabra;
                var CategoriaSelect = "<option value='" + IdCategoria + "'>" + NombreCategoria + "</option>";
                $(CategoriaSelect).appendTo("#SelectTipoAll");
                $(CategoriaSelect).appendTo("#SelectTipoAll2");
            }
        );
    });
}