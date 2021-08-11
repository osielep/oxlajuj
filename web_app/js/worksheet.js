var urlApi = "http://localhost:60957/api/"

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