$(document).ready(function () {
    console.log("Pagina lista para usar");
    procesarEquipos();
    procesarEtiquetas();

    listaProyectosAux = listaProyectos;
    procesarProyecto();

    obtenerParametro();

    $("#idNewProject").on('click', function () {
        //Lanzar modal de formulario de registro de nuevo proyecto
        $("#idModalNewProject").modal('show');
    });


    //Clic en la "X de limpiar" del input 
    $('#idBuscar').on('search', function () {
        listaProyectosAux = listaProyectos;
        procesarProyecto();
    });

    //Clic en el boton de buscar
    $(".btnBuscar").on('click', function () {
        let valor = $('#idBuscar').val();
        if (valor != undefined && valor != null && valor.trim() != "") {
            listaProyectosAux = listaProyectos.filter(proy => proy.titulo.toLowerCase().includes(valor.toLowerCase()));
            procesarProyecto();
        }
    });

});

let listaEquipos = [
    {
        id: "E01",
        nombre: "Persona 01"
    },
    {
        id: "E02",
        nombre: "Persona 02"
    },
    {
        id: "E03",
        nombre: "Persona 03"
    },
    {
        id: "E04",
        nombre: "Persona 04"
    },
    {
        id: "E05",
        nombre: "Persona 05"
    }
]

function procesarEquipos() {
    $("#idTeamsProject").empty();
    listaEquipos.forEach(etiqueta => {
        $("#idTeamsProject").append('<option value="' + etiqueta.id + '">' + etiqueta.nombre + '</option>');
    });
}

let listaEtiquetas = [
    {
        id: 1,
        nombre: "Intel"
    },
    {
        id: 2,
        nombre: "FreeDos"
    },
    {
        id: 3,
        nombre: "Asus"
    },
    {
        id: 4,
        nombre: "Lenovo"
    },
    {
        id: 5,
        nombre: "Ryzen"
    },
    {
        id: 6,
        nombre: "GamaAlta"
    },
]

function procesarEtiquetas() {
    $("#idTagsProject").empty();
    listaEtiquetas.forEach(etiqueta => {
        $("#idTagsProject").append('<option value="' + etiqueta.id + '">' + etiqueta.nombre + '</option>');
    });
}

let listaProyectos = [
    {
        idProy: 1,
        titulo: "LAPTOP ASUS ExpertBook",
        descripcion: "	Procesador Intel® Core™ i5-1335U - 3.40GHz/4.6GHz.",
        fechaCreacion: "15-05-2025",
        responsable: "Alumno Certus",
        equipo: ["Persona 1", "Persona 2", "Persona 3", "Persona 4"],
        presupuesto: 1321321,
        imagen: "https://imagenes.deltron.com.pe/images/productos/on-line/items/large/nb/as/nbas90nx0801m02.jpg",
        etiquetas: ["Intel", "FreeDos", "Asus"]
    },
    {
        idProy: 2,
        titulo: "LAPTOP LENOVO V15 G4",
        descripcion: "Intel® Core™ i3-1315U 1.2 / 4.5GHz, cache L3 10MB.",
        fechaCreacion: "15-05-2025",
        imagen: "https://imagenes.deltron.com.pe/images/productos/items/nb/le/nblen83er001dlm.jpg",
        etiquetas: ["Intel", "Lenovo"]
    },
    {
        idProy: 3,
        titulo: "LAPTOP LENOVO IdeaPad Slim 3",
        descripcion: "AMD Ryzen™ 7 5825U (8C / 16T, 2.0 / 4.5GHz, 4MB L2 / 16MB L3).",
        fechaCreacion: "15-05-2025",
        imagen: "https://imagenes.deltron.com.pe/images/productos/items/nb/le/nblen82xb003mlm.jpg",
        etiquetas: ["Ryzen", "FreeDos", "Lenovo"]
    },
    {
        idProy: 4,
        titulo: "LAPTOP LENOVO IDEAPAD SLIM 3",
        descripcion: "Intel® Core™ i5-13420H.",
        fechaCreacion: "15-05-2025",
        imagen: "https://imagenes.deltron.com.pe/images/productos/items/nb/le/nblen83em00adlm.jpg",
        etiquetas: ["Intel", "FreeDos", "Lenovo"]
    }
];

let listaProyectosAux = [];

function procesarProyecto() {
    debugger
    //Limpiar el contenedor
    $("#idContenedor").empty();

    //Reccoriendo el arreglo de proyectos
    listaProyectosAux.forEach(p => {
        $("#idContenedor").append(
            '<div class="card mb-3 mr-mod idInputc" style="max-width: 540px;">' +
            '<div class="row g-0">' +
            '<div class="col-md-4">' +
            '<img src="' + p.imagen + '" class="img-fluid rounded-start" alt="' + p.titulo + '">' +
            '</div>' +
            '<div class="col-md-8">' +
            '<div class="card-body">' +
            '<h5 class="card-title">' + p.titulo + '</h5>' +
            '<p class="card-text">' + p.descripcion + '</p>' +
            '<p class="card-text"><small class="text-body-secondary">' + p.fechaCreacion + '</small></p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');
    });

}


function mostrarConfirmacion() {
    if (validarFormulario()) {
        $("#idModalConfirmation").modal('show');
    } else {
        alert("Completa el formulario");
    }
}

function guardarInformacion() {
    let nuevoProyecto = {
        idProy: listaProyectos.length + 1,
        titulo: $("#idTitleProject").val(),
        descripcion: $("#idDescription").val(),
        fechaCreacion: $("#idDateCreated").val(),
        responsable: $("#idLeader").val(),
        equipo: $("#idTeamsProject").val(),
        presupuesto: parseFloat($("#idPrep").val()),
        imagen: $("#idImg").val(),
        etiquetas: $("#idTagsProject").val()
    };

    listaProyectos.push(nuevoProyecto);

    procesarProyecto();

    $("#idModalConfirmation").modal('hide');
    $("#idModalNewProject").modal('hide');

    //Limpiando Inputs
    $("#idTitleProject").val('');
    $("#idDescription").val('');
    $("#idDateCreated").val('');
    $("#idLeader").val('');
    $("#idTeamsProject").val('');
    parseFloat($("#idPrep").val(undefined));
    $("#idImg").val('');
    $("#idTagsProject").val('');
}


function validarFormulario() {
    let validacion = true;

    //validacion cada input

    let vTitulo = $("#idTitleProject").val();
    if (vTitulo == undefined || vTitulo == null || vTitulo.trim() == "") {
        validacion = false;
        //$("#eTitleProject").attr('display: block');
    }

    let vDescripcion = $("#idDescription").val();
    if (vDescripcion == undefined || vDescripcion == null || vDescripcion.trim() == "") {
        validacion = false;
    }

    let vFecha = $("#idDateCreated").val();
    if (vFecha == undefined || vFecha == null || vFecha.trim() == "") {
        validacion = false;
    }

    let vResponsable = $("#idLeader").val();
    if (vResponsable == undefined || vResponsable == null || vResponsable.trim() == "") {
        validacion = false;
    }

    let vPresupuesto = $("#idPrep").val();
    if (vPresupuesto == undefined || vPresupuesto == null || vPresupuesto.trim() == "") {
        validacion = false;
    }

    let vImagen = $("#idImg").val();
    if (vImagen == undefined || vImagen == null || vImagen.trim() == "") {
        validacion = false;
    }

    let vEtiquetas = $("#idTagsProject").val();
    if (vEtiquetas == null || vEtiquetas.length == 0) {
        validacion = false;
    }

    let vEquipo = $("#idTeamsProject").val();
    if (vEquipo == null || vEquipo.length == 0) {
        validacion = false;
    }

    return validacion;
}


function obtenerParametro() {
    const valor = window.atob(window.location.search.split('?')[1]);
    let vValor = valor.split('valor=')[1];
    $("#idBuscar").val(vValor);
    listaProyectosAux = listaProyectos.filter(proy => proy.titulo.toLowerCase().includes(vValor.toLowerCase()));
    procesarProyecto();
}

let cart = [];

function addToCart(productName) {
    cart.push(productName);
    alert(`${productName} agregado al carrito!`);
    console.log(cart); // Muestra el carrito en la consola
}