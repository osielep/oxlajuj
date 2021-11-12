var urlApi = "https://api.oxlajuj.com/api/"


document.addEventListener("DOMContentLoaded", () => {
    MostrarAvances();
});


function PorcentajeTotal() {
    var settings = {
        "url": urlApi + "MostarPorcentajeTotal",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "IdCursoCapitulo": 1,
            "IdEstudianteAsignacion": 1
        }),
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        $.each(
            response,
            function(index, data) {

                var porcentaje = data.PorcentajeAvanceTotal;
                var barraprogreso = "<div class='progress-bar bg-success' role='progressbar' style='width: " + porcentaje + "%;' aria-valuenow='" + porcentaje + "' aria-valuemin='0' aria-valuemax='100'>" + porcentaje + "%</div>"
                $(BarraProgresoCurso).prepend(barraprogreso);
            }
        );
    });
}


function ListaDeCapitulos() {
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

                var IdCursoCapitulo = data.IdCursoCapitulo
                var TxtNombreCapitulo = data.TxtNombreCapitulo

                var ItemCollapse = '<div class="card"><h5 class="card-header">' + TxtNombreCapitulo + '</h5><div class="card-body"><ul class="list-group" id="ListadoMaterialCapNo' + IdCursoCapitulo + '"></ul></div></div><br>'
                $(ItemCollapse).appendTo("#CardsCaps");

            }
        );
    });

    ListadoMaterialesCapitulo();
}

function ListadoMaterialesCapitulo() {
    var settings = {
        "url": urlApi + "ObtenerMaterialDeCapituloAvances",
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

                if (IdCapitulo == '1') {
                    var Material = '<a href="#" class="list-group-item "><li class=" d-flex justify-content-between align-items-center">' + NombreMaterial + '<span class="badge bg-success rounded-pill"><i class="fas fa-check"></i></span></li></a>'
                    $(Material).appendTo("#ListadoMaterialCapNo1");
                }

                if (IdCapitulo == '2') {
                    var Material = '<a href="#" class="list-group-item "><li class=" d-flex justify-content-between align-items-center">' + NombreMaterial + '<span class="badge bg-success rounded-pill"><i class="fas fa-check"></i></span></li></a>'
                    $(Material).appendTo("#ListadoMaterialCapNo2");
                }

                if (IdCapitulo == '3') {
                    var Material = '<a href="#" class="list-group-item "><li class=" d-flex justify-content-between align-items-center">' + NombreMaterial + '<span class="badge bg-success rounded-pill"><i class="fas fa-check"></i></span></li></a>'
                    $(Material).appendTo("#ListadoMaterialCapNo3");
                }

                if (IdCapitulo == '4') {
                    var Material = '<a href="#" class="list-group-item "><li class=" d-flex justify-content-between align-items-center">' + NombreMaterial + '<span class="badge bg-success rounded-pill"><i class="fas fa-check"></i></span></li></a>'
                    $(Material).appendTo("#ListadoMaterialCapNo4");
                }

            }
        );
    });
}

function MostrarAvances() {
    var Material = '<a href="#" class="list-group-item "><li class=" d-flex justify-content-between align-items-center"> Ejemplo <span class="badge bg-success rounded-pill"><i class="fas fa-check"></i></span></li></a>'
    $(Material).appendTo("#ListadoMaterialCapNo1");
    console.log(Material);
}