document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById('form_subir');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        subir_archivo(this);
    });
});

function subir_archivo(form) {
    let peticion = new XMLHttpRequest();

    peticion.addEventListener("progress", (event) => {
        let porcentaje = Math.round((event.loaded / event.total) * 100);
        console.log(porcentaje);
    })

    peticion.open('post', 'subir-archivo.php');
    peticion.send(new FormData(form));
}