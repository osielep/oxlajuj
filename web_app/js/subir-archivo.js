// document.addEventListener("DOMContentLoaded", () => {
//     let form = document.getElementById('form_subir');

//     form.addEventListener('submit', function(event) {
//         event.preventDefault();
//         subir_archivo(this);
//     });
// });

// function subir_archivo(form) {
//     let peticion = new XMLHttpRequest();

//     peticion.addEventListener("progress", (event) => {
//         let porcentaje = Math.round((event.loaded / event.total) * 100);
//         console.log(porcentaje);
//     })

//     peticion.open('post', 'subir-archivo.php');
//     peticion.send(new FormData(form));
// }



function CargarImagen() {
    var base64 = getBase64Image(document.getElementById("ImagenUsuario"));
    console.log(base64);
}


function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL();
    return dataURL;
}