var tokenGloabl = localStorage.getItem('tokenuser');

var Mensaje404 = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Oops!</strong> los datos son incorrectos o no existen.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
var Mensaje405 = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Oops!</strong> tu cuenta fue desactivada.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
var Mensaje200 = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Hooray!</strong> inicio de sesion exitoso.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
var GlobalButtom = '<div class="card"> <div class="dropdown text-end">        <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle"> Widman Esquivel        </a>        <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">            <li>                <a class="dropdown-item dropdown-item-danger d-flex gap-2 align-items-center" href="#">                    <svg class="bi" width="16" height="16"><use xlink:href="#trash"/></svg> Editar perfil                </a>            </li>            <li>                <a class="dropdown-item dropdown-item-danger d-flex gap-2 align-items-center" href="#">                    <svg class="bi" width="16" height="16"><use xlink:href="#progreso"/></svg> Mis cursos </a></li><li><hr class="dropdown-divider"></li><li><a class="dropdown-item dropdown-item-danger d-flex gap-2 align-items-center" href="#">                    <svg class="bi" width="16" height="16"><use xlink:href="#salir"/></svg> Cerrar sesion                </a>            </li>        </ul>    </div></div>'
var GlobalButtomSingout = '<button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#LoginModal">    Iniciar Sesion</button>'
var CorreoUsuario = $("#EmailForm").val()
var PasswordUsuario = $("#PasswordForm").val()
var datos = '';



function autenticacionUser() {

    var settings = {
        "url": "http://localhost:60957/api/login/echoping",
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
}

function LoginUserToken() {

    var settings = {
        "url": "http://localhost:60957/api/login/authenticate",
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

        console.log(token2);
        LoginUsers();

    }).fail(function(response) {

        LoginUsers();

    });
}

function LoginUsers() {

    var settings = {
        "url": "http://localhost:60957/api/IniciarSesion",
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
                console.log(Codigo);

                if (Codigo == '404') {
                    $(AlertaError).prepend(Mensaje404);
                }

                if (Codigo == '405') {
                    $(AlertaError).prepend(Mensaje405);
                }

                if (Codigo == '200') {
                    $(AlertaError).prepend(Mensaje200);
                    setTimeout(function() { window.location.href = "../traductor/"; }, 2000);
                }

            }
        );
    });


}