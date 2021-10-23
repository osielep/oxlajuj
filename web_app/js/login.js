var Mensaje404 = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Oops!</strong> los datos son incorrectos o no existen.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
var Mensaje405 = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Oops!</strong> tu cuenta fue desactivada.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
var Mensaje200 = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Hooray!</strong> inicio de sesion exitoso.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

function syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while ((end - start) < milliseconds) {
        end = new Date().getTime();
    }
}

function LoginUsers() {

    var CorreoUsuario = document.getElementById("EmailForm").value;
    var PasswordUsuario = document.getElementById("PasswordForm").value;

    var settings = {
        "url": "http://localhost:60957/api/IniciarSesion",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "TxtEmailUsuario": CorreoUsuario,
            "TxtPasswordUsuario": PasswordUsuario
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
                    setTimeout(window.location.href, 5000);
                }

            }
        );
    });


}