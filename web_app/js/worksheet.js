var urlApi = "http://localhost:60957/api/"


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

    $.ajax(settings).done(function(response) {
        var vacio = ""
        $.each(
            response,
            function(index, data) {
                $(vacio).appendTo("#TablaTopPalabras");
                var fila = "<tr><td>" + data.TxtPalabraEspanol +
                    "</td><td>" + data.TxtPalabraIdiomaMaya +
                    "</td><td><a href='#' '>  <span class='badge bg-success'><i class='fas fa-plus-square'></i> Agregar</span></a> </td></tr>";
                $(fila).appendTo("#TablaTopPalabras");
            }
        );

    });
}


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
            document.getElementById("FormViewHojaCuerpo").style.display = "block";
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

function VerWorksheetHeader() {
    var settings = {
        "url": urlApi + "VerWorksheetHeader",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdWorksheetHeader": 1
        }),
    };

    VerWorksheetBody();

    $.ajax(settings).done(function(response) {
        console.log(response);
        $.each(
            response,
            function(index, data) {
                var fila = "<tr><td>" + data.ImgLogo +
                    "</td><td>" + data.FechaAplicacion +
                    "</td><td>" + data.TxtDocente +
                    "</td><td>" + data.TxtTipoWorksheet +
                    "</td></tr>";
                $(fila).appendTo("#TblWorksheetHeader");
            }
        );
    });
}

function VerWorksheetBody() {
    var settings = {
        "url": urlApi + "VerWorksheetBody",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdWorksheetHeader": 1
        }),
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        $.each(
            response,
            function(index, data) {

                var TotalPalabras = data.Palabras;
                var separadorPalabras = TotalPalabras.split('---');
                //var PalabrasIndividual = separadorPalabras.split('/');

                var fila = "<tr><td>" + data.NoSerie +
                    "</td><td>" + data.TxtNombreEvaluacion +
                    "</td><td>" + data.TxtDescripcion +
                    "</td><td>" + separadorPalabras[0] +
                    "</td></tr>";
                $(fila).appendTo("#TblWorksheetBody");
            }
        );
    });
}