var urlApi = "https://api.oxlajuj.com/api/"
    //var urlApi = "http://localhost:60957/api/"
var tokenGloabl = localStorage.getItem('tokenuser');
var DXTXTname = localStorage.getItem('NameUser');
var DXTXTC0pe = localStorage.getItem('DUXDUser');

//MENSAJES RETORNO
var Mensaje404 = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Oops!</strong> los datos son incorrectos o no existen.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
var Mensaje405 = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Oops!</strong> tu cuenta fue desactivada.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
var Mensaje200 = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Hooray!</strong> inicio de sesion exitoso.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    //STATUS LOGIN
var GlobalButtom = '<div class="card"> <div class="dropdown text-end">        <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">            <img src="https://clubsuizomadrid.org/assets/images/juntadirectiva/user-gray.png" alt="mdo" width="32" height="32" class="rounded-circle"> ' + DXTXTname + '       </a>        <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">            <li>                <a class="dropdown-item dropdown-item-danger d-flex gap-2 align-items-center" href="redirigir.html?direccion=material-didactico">                    <svg class="bi" width="16" height="16"><use xlink:href="#trash"/></svg> Editar Perfil                </a>            </li>            <li>                <a class="dropdown-item dropdown-item-danger d-flex gap-2 align-items-center" href="#">                    <svg class="bi" width="16" height="16"><use xlink:href="#progreso"/></svg> Mi material </a></li><li><hr class="dropdown-divider"></li><li><a  class="dropdown-item dropdown-item-danger d-flex gap-2 align-items-center" " href="../logout.html" >                    <svg class="bi" width="16" height="16"><use xlink:href="#salir"/></svg> Cerrar sesion                </a>            </li>        </ul>    </div></div>'
var GlobalButtomSingout = '<button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#LoginModal">    Iniciar Sesion</button>'

var CorreoUsuario = $("#EmailForm").val()
var PasswordUsuario = $("#PasswordForm").val()
var datos = '';



function autenticacionUser() {

    var settings = {
        "url": urlApi + "login/echoping",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer " + tokenGloabl + ""
        },
    };

    $.ajax(settings).done(function(response) {
        console.log(response);

        document.getElementById('SesionGlobalButton').innerHTML = datos;
        //$(SesionGlobalButton).prepend(datos);
        $(SesionGlobalButton).prepend(GlobalButtom);

    }).fail(function(response) {

        document.getElementById('SesionGlobalButton').innerHTML = datos;
        $(SesionGlobalButton).prepend(GlobalButtomSingout);

    });

}

function sessionLogout() {
    localStorage.clear();
    setTimeout(function() { window.location.href = "/traductor/"; }, 2000);
}

function LoginUserToken() {

    var settings = {
        "url": urlApi + "login/authenticate",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "usuario": $("#EmailForm").val(),
            "clave": $("#PasswordForm").val()
        }),
    };


    $.ajax(settings).done(function(response) {
        document.getElementById('AlertaError').innerHTML = '';

        localStorage.setItem('tokenuser', response);
        var token2 = localStorage.getItem('tokenuser');

        //console.log(token2);
        LoginUsers();

    }).fail(function(response) {

        LoginUsers();

    });
}

function LoginUsers() {

    var settings = {
        "url": urlApi + "IniciarSesion",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "TxtEmailUsuario": $("#EmailForm").val(),
            "TxtPasswordUsuario": $("#PasswordForm").val()
        }),
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        $.each(
            response,
            function(index, data) {

                document.getElementById('AlertaError').innerHTML = '';

                var Codigo = data.CODIGO_RETORNO;
                var Usuario = data.NOMBRE_USUARIO;
                var DDDUser = data.ID_USUARIO;

                console.log(Codigo);

                if (Codigo == '404') {
                    $(AlertaError).prepend(Mensaje404);
                }

                if (Codigo == '405') {
                    $(AlertaError).prepend(Mensaje405);
                }

                if (Codigo == '200') {
                    $(AlertaError).prepend(Mensaje200);
                    localStorage.setItem('NameUser', Usuario);
                    localStorage.setItem('DUXDUser', DDDUser);

                    setTimeout(function() { window.location.href = "../traductor/"; }, 1000);
                }

            }
        );
    });


}