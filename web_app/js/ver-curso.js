var urlApi = "http://localhost:60957/api/"





function ObtenerCapitulos() {
    var settings = {
        "url": urlApi + "ObtenerCapitulosDeCurso",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdCursoDetalle": 1
        }),
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        $.each(
            response,
            function(index, data) {

                var IdCapitulo = data.IdCursoCapitulo
                var NombreCapitulo = data.TxtNombreCapitulo
                var CardCapitulo = '<div class="col-md-6 col-sm-12"><div class="card"><h5 class="card-header">' + NombreCapitulo + '</h5><div class="card-body"><ul class="list-group" id="CusoMaterial' + IdCapitulo + '"></ul></div></div></div>'
                $(CardCapitulo).appendTo("#VerCapitulos");

            }
        );
    });
}

function ObtenerMaterial() {
    var settings = {
        "url": urlApi + "ObtenerMaterialDeCapitulo",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdCursoDetalle": 1
        }),
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        $.each(
            response,
            function(index, data) {

                var IdCapitulo = data.IdCursoCapitulo
                var NombreMaterial = data.TxtNombreMaterial
                var TipoMaterial = data.TxtTipoMaterial
                var ColorEtiqueta = data.TxtColorEtiqueta

                if (IdCapitulo == '1') {
                    var Material = '<li class="list-group-item d-flex justify-content-between align-items-center">' + NombreMaterial + '<span class="badge bg-' + ColorEtiqueta + ' rounded-pill">' + TipoMaterial + '</span></li>'
                    $(Material).appendTo("#CusoMaterial1");
                }

                if (IdCapitulo == '2') {
                    var Material = '<li class="list-group-item d-flex justify-content-between align-items-center">' + NombreMaterial + '<span class="badge bg-' + ColorEtiqueta + ' rounded-pill">' + TipoMaterial + '</span></li>'
                    $(Material).appendTo("#CusoMaterial2");
                }

                if (IdCapitulo == '3') {
                    var Material = '<li class="list-group-item d-flex justify-content-between align-items-center">' + NombreMaterial + '<span class="badge bg-' + ColorEtiqueta + ' rounded-pill">' + TipoMaterial + '</span></li>'
                    $(Material).appendTo("#CusoMaterial3");
                }

            }
        );
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