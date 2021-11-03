//var urlApi = "https://api.oxlajuj.com/api/"
var urlApi = "http://localhost:60957/api/"

function NuevoUsuario() {
    var settings = {
        "url": urlApi + "RegistroUsuarios",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdInstitucion": 1,
            "TxtNombreUsuario": $("#NewUserNombre").val(),
            "TxtApellidoUsuario": $("#NewUserApellido").val(),
            "TxtEmailUsuario": $("#NewUserEmail").val(),
            "TxtPasswordUsuario": $("#NewUserPassword").val(),
            "IdGenero": $("#NewUserGenero").val(),
            "TxtDescripcion": "Mi perfil en oxlajuj",
            "TxtImg": "usuario.png"
        }),
    };

    $.ajax(settings).done(function(response) {
        $.each(
            response,
            function(index, data) {
                var Validar = data.Resultado;
                if (Validar == 0) {
                    window.alert("Error no se pudo crear el usuario")
                } else {
                    window.alert("Usuario creado correctamente")
                    window.location.href = "../traductor/"
                }
            }
        );
        console.log(response);
    }).fail(function(response) {
        window.alert("Ocurrio un error inesperado")
    });

}