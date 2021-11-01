var urlApi = "http://localhost:60957/api/"
var PalabrasFor = []
    //Se ejecuta en onload
function ObtenerCategoriasPalabras() {
    var settings = {
        "url": "http://localhost:60957/api/ObtenerCategorias",
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
            }
        );
    });
}

//Se ejecuta en onload
function ObtenerTipoEvaluacion() {
    var settings = {
        "url": "http://localhost:60957/api/ObtenerTipoEvaluacion",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function(response) {
        //console.log(response);
        $.each(
            response,
            function(index, data) {
                var IdTipoEv = data.IdTipoEvaluacion;
                var NombreTipoEv = data.TxtNombreEvaluacion;
                var TipoPalabra = "<option value='" + IdTipoEv + "'>" + NombreTipoEv + "</option>";
                $(TipoPalabra).appendTo("#SelectTipoSeccionAll");
            }
        );
    });
}

//1. Guardar encabezado de la hoja (El ID se guarda en localStorage)
function GuardarEncabezadoWorksheet() {
    var settings = {
        "url": "http://localhost:60957/api/AgregarHojaEncabezado",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "TxtTitulo": $("#TituloWorksheet").val(),
            "RefLogo": "logo.png",
            "TxtDocente": $("#NombreDocente").val(),
            "FechaAplicacion": $("#FechaWorksheet").val(),
            "TxtTipoHoja": $("#SelectTipo").val(),
            "IntPrivacidad": 1,
            "IdUsuario": 1
        }),
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        $.each(
            response,
            function(index, data) {

                var ComprobarResultado = data.Resultado;

                if (ComprobarResultado != 0) {
                    window.alert("Encabezado guardado");
                    //Guardando dato en almacenamiento local
                    localStorage.setItem('IdHeaderWorksheet', ComprobarResultado);
                    VerEncabezado();
                } else {
                    window.alert("Error al guardar el encabezado");
                }
            }
        );
    });
}

//1.1 Se muestran los datos del encabezado
function VerEncabezado() {

    var IdHG = localStorage.getItem('IdHeaderWorksheet');

    var settings = {
        "url": "http://localhost:60957/api/VerHojaEncabezado",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdHojaEncabezado": IdHG
        }),
    };

    $.ajax(settings).done(function(response) {

        if (response.length == 0) {
            window.alert("Error, no existen datos");
        } else {
            document.getElementById("FormInputHojaEncabezado").style.display = "none";
            document.getElementById("FormViewHojaEncabezado").style.display = "block";
            $.each(
                response,
                function(index, data) {
                    var TituloH = data.TxtTitulo;
                    var DocenteH = data.TxtDocente;
                    var TipoH = data.TxtTipoHoja;
                    var FechaH = data.FechaAplicacion;

                    $(ListaTituloHoja).prepend(TituloH);
                    $(ListaNombreProfesor).prepend(DocenteH);
                    $(ListaTipoEvaluacion).prepend(TipoH);
                    $(ListaFechaAplicacion).prepend(FechaH);

                }
            );

        }

        document.getElementById("FormInputHojaCUerpo").style.display = "block";
    });

}

//2. Guardar cuerpo de la hoja (El ID se guarda en localStorage)
function GuardarCuerpoWorksheet() {
    var settings = {
        "url": "http://localhost:60957/api/AgregarHojaCuerpo",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdHojaEncabezado": localStorage.getItem('IdHeaderWorksheet'),
            "TxtDescripcion": $("#DescripcionWorksheet").val()
        }),
    };

    $.ajax(settings).done(function(response) {
        $.each(
            response,
            function(index, data) {

                var CResultadoBody = data.Resultado;

                if (CResultadoBody != 0) {
                    window.alert("Descripcion guardada");
                    //Guardando dato en almacenamiento local
                    localStorage.setItem('IdBodyWorksheet', CResultadoBody);
                    VerCuerpo();
                } else {
                    window.alert("Error al guardar el encabezado");
                }
            }
        );
    });
}

//2.1 Se muestra la descripcion en el encabezado
function VerCuerpo() {
    var settings = {
        "url": "http://localhost:60957/api/VerHojaCuerpo",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdHojaCuerpo": localStorage.getItem('IdBodyWorksheet')
        }),
    };

    $.ajax(settings).done(function(response) {

        if (response.length == 0) {
            window.alert("Error, no existen datos");
        } else {
            document.getElementById("FormInputHojaCUerpo").style.display = "none";
            document.getElementById("FormInputSeccion").style.display = "block";
            document.getElementById("FormViewSeccion").style.display = "block";
            $.each(
                response,
                function(index, data) {
                    var DescripcionH = data.TxtDescripcion;
                    $(DescripcionHoja).prepend(DescripcionH);
                }
            );
        }

    });
}

//3. Funcion para agregar secciones (El ID se envia como parametro)
function AgregarNuevaSeccion() {
    var settings = {
        "url": "http://localhost:60957/api/AgregarHojaSeccion",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdHojaCuerpo": localStorage.getItem('IdBodyWorksheet'),
            "IdTipoEvaluacion": $("#SelectTipoSeccionAll").val(),
        }),
    };



    $.ajax(settings).done(function(response) {

        $.each(
            response,
            function(index, data) {

                var resultado = data.Resultado

                if (data.Resultado == 0) {
                    window.alert("Error agregando la sección");
                    localStorage.setItem('IdSeccionTmp', 0);
                    console.log(data.Resultado)

                } else {
                    window.alert("Sección agregada con éxito");
                    localStorage.setItem('IdSeccionTmp', resultado);
                    console.log(data.Resultado)
                }
            }
        );

        var Comprobacion = localStorage.getItem('IdSeccionTmp');

        if (Comprobacion == 0) {
            window.alert("No se puede continuar");
        } else {
            PalabrasAleatoriasPorCategoria();
            VerTituloSecciones();
        }

    }).fail(function(response) {

        window.alert("Error inesperado");
        console.log(response)
    });

}

//3.1 Genera 5 palabras de forma aleatoria
function PalabrasAleatoriasPorCategoria() {
    var settings = {
        "url": "http://localhost:60957/api/TopCincoPalabras",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdTipoPalabra": $("#SelectTipoAll").val(),
        }),
    };

    var SeccionTempral = localStorage.getItem('IdSeccionTmp');

    $.ajax(settings).done(function(response) {

        $.each(
            response,
            function(index, data) {

                // $(vacio).appendTo("#TablaTopPalabras");
                // var fila = "<tr><td>" + data.TxtPalabraEspanol +
                //     "</td><td>" + data.TxtPalabraIdiomaMaya +
                //     "</td><td><a href='#' '>  <span class='badge bg-success'><i class='fas fa-plus-square'></i> Agregar</span></a> </td></tr>";
                // $(fila).appendTo("#TablaTopPalabras");

                var IdPalabraP = data.IdPalabra;

                setTimeout(AgregarPalabraSeccion(IdPalabraP, SeccionTempral), 500);
                console.log("Se ejecuto")
                    //console.log("IdPalabra:", IdPalabraP, " IdSeccion:", IdSeccionP);
                    //AgregarPalabraSeccion(IdPalabraP, IdSeccionP)
                    //RecuperarPalabras(IdSeccionP);
            }
        );
        console.log(response)
    });
}

//3.1.1 Se ejecuta 5 veces 
function AgregarPalabraSeccion(IdPalabraPq, IdSeccionPq) {
    var settings = {
        "url": "http://localhost:60957/api/AgregarHojaPalabras",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdHojaSeccion": IdSeccionPq,
            "IdPalabra": IdPalabraPq
        }),
    };

    console.log("IdPalabra_PR:", IdPalabraPq, "IdSeccion_PR:", IdSeccionPq)

    $.ajax(settings).done(function(response) {

        $.each(
            response,
            function(index, data) {
                if (data.Resultado == 0) {
                    //window.alert("Error guardando el vocabulario");
                    console.log(response)

                } else {
                    //window.alert("Vocabulario agregado con éxito");
                    console.log(response)

                }
            }
        );
    }).fail(function(response) {

        window.alert("Error inesperado");
        console.log(response)
    });

}

function VerTituloSecciones() {
    var rBody = localStorage.getItem('IdBodyWorksheet');
    var rSeccion = localStorage.getItem('IdSeccionTmp');

    var settings = {
        "url": "http://localhost:60957/api/ObtenerTituloSeccion",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdHojaCuerpo": rBody,
            "IdHojaSeccion": rSeccion
        }),
    };

    $.ajax(settings).done(function(response) {
        $.each(
            response,
            function(index, data) {

                var idTabla = data.IdHojaCuerpo + data.IdHojaSeccion
                var nombreSerie = data.TxtNombreEvaluacion
                var descripcionSerie = data.TxtDescripcion
                var cardTbl = '<div class="col"><div class="card"><div class="card-body"><div class="card-title"><span class="badge rounded-pill bg-success"><span ><i class="fas fa-book-open"></i><strong> SERIE </strong></span></span><br><span class="small text-warning"><strong><span id="TituloSerie">' + nombreSerie + '</span></strong></span><br><span><span id="DescripcionSerie">' + descripcionSerie + '</span></span></div><div class="row align-items-center"><table id="TablaTopPalabras' + idTabla + '" class="table table-hover"><thead><tr><th scope="col">Español</th><th scope="col">Qeqchi</th><th scope="col">Opciones</th></tr></thead><tbody></tbody></table></div></div></div></div>'
                $(cardTbl).appendTo("#SeccionesTablas");

            }
        );
        console.log(response)
        VerPalbrasSeccion();
    });

}


function VerPalbrasSeccion() {

    var rSeccion = localStorage.getItem('IdSeccionTmp');

    var settings = {
        "url": "http://localhost:60957/api/ObtenerPalabrasPorSeccion",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdHojaSeccion": rSeccion
        }),
    };

    $.ajax(settings).done(function(response) {
        $.each(
            response,
            function(index, data) {

                var idTabla = data.IdHojaCuerpo + data.IdHojaSeccion

                var fila = "<tr><td>" + data.TxtPalabraEspanol +
                    "</td><td>" + data.TxtPalabraIdiomaMaya +
                    "</td><td><a href='#' '>  <span class='badge bg-success'><i class='fas fa-plus-square'></i> Agregar</span></a> </td></tr>";
                $(fila).appendTo("#TablaTopPalabras" + idTabla + "");

            }
        );
        console.log(response)
    });
}