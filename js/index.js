$(document).ready(function(){

    $(".btnBuscar").on('click',function(){

        let valorBusqueda = $("#idBuscar").val();
        if (valorBusqueda != undefined && valorBusqueda != null && valorBusqueda.trim() != "") {
            let paramUrl = "valor="+valorBusqueda;
            window.location.href = "/pages/proyectos.html?"+ window.btoa(paramUrl);
        }
    });


});