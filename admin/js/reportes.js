//var urlApi = "https://api.oxlajuj.com/api/"
var urlApi = "http://localhost:60957/api/"


function UsuariosActivos() {
    document.getElementById('TituloTabla').innerText = ""
    $("#TblUsuarios td").remove();



    var settings = {
        "url": urlApi + "ReporteUsuariosActivos",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({}),
    };

    $.ajax(settings).done(function(response) {
        $.each(
            response,
            function(index, data) {

                var IdUser = data.IdUsuario
                var NmUser = data.TxtNombreUsuario
                var ApUser = data.TxtApellidoUsuario
                var EmUser = data.TxtEmailUsuario
                var GnUser = data.TxtNombreGenero

                var fila = "<tr><td>" + IdUser +
                    "</td><td>" + NmUser +
                    "</td><td>" + ApUser +
                    "</td><td>" + EmUser +
                    "</td><td>" + GnUser +
                    "</td><td><a href='' title='Cambiar clave de usuario' data-bs-toggle='modal' data-bs-target='#SetPassword'><span class='badge rounded-pill bg-success'><i class='fas fa-key'></i></span></a>  <a href='' title='Desactivar usuario' onclick='DesactivarUsuario(" + IdUser + ");'><span class='badge rounded-pill bg-danger'><i class='fas fa-user-times'></i></span></span></a> <a href='' title='Enviar notificación' onclick='Notificacion(" + IdUser + ");'><span class='badge rounded-pill bg-warning'><i class='fas fa-bell'></i></span></span></a></td></tr>";
                //"</td><td><a href='#' '>  <span class='badge bg-success'><i class='fas fa-plus-square'></i> Agregar</span></a> </td></tr>";
                $(fila).appendTo("#TblUsuarios");

            }
        );
    });

    var tx1 = "Usuarios activos"
    $(TituloTabla).prepend(tx1);


}


function UsuariosInactivos() {


    document.getElementById('TituloTabla').innerText = ""

    $("#TblUsuarios td").remove();

    var settings = {
        "url": urlApi + "ReporteUsuariosInactivos",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({}),
    };

    $.ajax(settings).done(function(response) {
        $.each(
            response,
            function(index, data) {

                var IdUser = data.IdUsuario
                var NmUser = data.TxtNombreUsuario
                var ApUser = data.TxtApellidoUsuario
                var EmUser = data.TxtEmailUsuario
                var GnUser = data.TxtNombreGenero

                var fila = "<tr><td>" + IdUser +
                    "</td><td>" + NmUser +
                    "</td><td>" + ApUser +
                    "</td><td>" + EmUser +
                    "</td><td>" + GnUser +
                    "</td><td><a href='' title='Cambiar clave de usuario' onclick='CambiarClave(" + IdUser + ");'><span class='badge rounded-pill bg-success'><i class='fas fa-key'></i></span></a>   <a href='' title='Activar usuario' onclick='ActivarUsuario(" + IdUser + ");'><span class='badge rounded-pill bg-warning'><i class='fas fa-user-plus'></i></span></span></a></td></tr>";
                //"</td><td><a href='#' '>  <span class='badge bg-success'><i class='fas fa-plus-square'></i> Agregar</span></a> </td></tr>";
                $(fila).appendTo("#TblUsuarios");

            }
        );
    });

    var tx = "Usuarios inactivos"
    $(TituloTabla).prepend(tx);

}