$(document).ready(function(){
    autoInicioEspecialidades();
    autoInicioDoctoresMensajes();
    autoInicioDoctoresReservas();
    autoInicioClientesMensajes();
    autoInicioClientesReservas();
});
/*
$(document).ready(function(){
    //instrucciones que se ejecutan cuando carga la página!
    extraerInformacionEspecialidades()
    extraerInformacionDoctores()
    extraerInformacionClientes()
    extraerInformacionMensajes()
    extraerInformacionReservas()
    extraerInformacionAdministradores()
    });

function pintarRespuestaDoctores(respuestaDoctor) {
    let tablaDoctores=  `<div class="container"><div class="row">`;
    for(i=0; i<items.length; i++){
        tablaDoctores+=
            <div class="card" style="width: 18rem; ">
                <div class="card-body">
                    <h5 class="card-title">${respuestaDoctor[i].department}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${respuestaDoctor[i].year}</h6>
                    <p class="card-text">${respuestaDoctor[i].name}</p>
                    <button class="btn btn-danger" onclick="borrarElemento(${respuestaDoctor[i].id}">Borrar</button>
                </div>
            </div>
    }
tablaDoctores+= "</div></div>"
$("#resultado").append(tablaDoctores);
}
*/
/////////////////////BLOQUE ESPECIALIDADES////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//Extrae especialidades para desplegable al cargar página
function autoInicioEspecialidades() {
    console.log("cargando...")
    $.ajax({
        url: "http://129.151.122.81:8080/api/Specialty/all",
        type: "GET",
        datatype: "JSON",
        success: function (desplegableEspecialidades) {
            console.log(desplegableEspecialidades);
            let $select = $("#DoctorSpecialty");
            $.each(desplegableEspecialidades, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            })
        }
    });
}

//Extrae todas las especialidades de la base de datos
function extraerInformacionEspecialidades() {
    $.ajax({
        url: "http://129.151.122.81:8080/api/Specialty/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaEspecialidades) {
            console.log(respuestaEspecialidades);
            pintarRespuestaEspecialidades(respuestaEspecialidades);
        },
    });
}

//Presenta lista o tabla de especialidades
function pintarRespuestaEspecialidades(respuestaEspecialidades) {
    let tablaEspecialistas = "<table> <tr> <th>Id</th> <th>Name</th> <th>Description</th> </tr>";
    for (i = 0; i < respuestaEspecialidades.length; i++) {
        tablaEspecialistas += "<tr>";
        tablaEspecialistas += "<td>" + respuestaEspecialidades[i].id + "</td>";
        tablaEspecialistas += "<td>" + respuestaEspecialidades[i].name + "</td>";
        tablaEspecialistas += "<td>" + respuestaEspecialidades[i].description + "</td>";
        tablaEspecialistas += "<td> <button onclick = 'borrarInformacionEspecialidad(" + respuestaEspecialidades[i].id + ")'>Delete</button>";
        tablaEspecialistas += "<td> <button onclick = 'actualizarInformacionEspecialidad(" + respuestaEspecialidades[i].id + ")'>Update</button>";
        tablaEspecialistas += "<td> <button onclick = 'cargarInformacionEspecialidad(" + respuestaEspecialidades[i].id + ")'>Edit</button>";
        tablaEspecialistas += "</tr>";
    }
    tablaEspecialistas += "</table>";
    $("#resultadoEspecialidades").html(tablaEspecialistas);
}

//Guarda una nueva especialidad en la base de datos
function guardarInformacionEspecialidad() {
    let especialidad = {
        name: $("#EspecialidadesName").val(),
        description: $("#EspecialidadesDescription").val(),
    };

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(especialidad),
        url: "http://129.151.122.81:8080/api/Specialty/save",

        success: function (response) {
            console.log(response);
            console.log("New specialty added");
            $("#resultado").empty();
            $("#id").val("");
            $("#EspecialidadesName").val("");
            $("#EspecialidadesDescription").val("");
            alert("New specialty added");
            extraerInformacionEspecialidades();
            window.location.reload()
        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("Error saving. Try again.");
        },
    });
}

////Cargar información de una especialidad en los campos para editar
function cargarInformacionEspecialidad(idEspecialidad) {
  let myData = {
    id: idEspecialidad,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "http://129.151.122.81:8080/api/Specialty/" + idEspecialidad,
    type: "GET",
    dataType: "JSON",
    success: function (respuestaEspecialista) {
      console.log(respuestaEspecialista);
      let specialty = respuestaEspecialista.items[0];
      $("#EspecialidadesId").val(specialty.id);
      $("#EspecialidadesName").val(specialty.name);
      $("#EspecialidadesDescription").val(specialty.description);
    },
  });
}

//Actualiza un especialidad en la base de datos
function actualizarInformacionEspecialidad(idEspecialidad) {
    let myData = {
        id: idEspecialidad,
        name: $("#EspecialidadesName").val(),
        description: $("#EspecialidadesDescription").val(),
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Specialty/" + idEspecialidad,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
        $("#resultado").empty();
        $("#id").val("");
        $("#EspecialidadesName").val("");
        $("#EspecialidadesDescription").val("");
        extraerInformacionEspecialidades();
        alert("Specialty updated");
        },
    });
}

//Elimina una especialidad en la base de datos
function borrarInformacionEspecialidad(idEspecialidad) {
    let myData = {
        id: idEspecialidad,
    };

    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Specialty/" + idEspecialidad,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        
        success: function (respuesta) {
            $("#resultado").empty();
            extraerInformacionEspecialidades();
            alert("Specialty deleted");
        },
    });
}
///////////////////BLOQUE DOCTORES////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//Extrae todos los doctores de la base de datos para desplegable de mensajes
function autoInicioDoctoresMensajes() {
    console.log("cargando...")
    $.ajax({
        url: "http://129.151.122.81:8080/api/Doctor/all",
        type: "GET",
        datatype: "JSON",
        success: function (desplegableDoctores) {
            console.log(desplegableDoctores);
            let $select = $("#MensajeDoctor");
            $.each(desplegableDoctores, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            })
        }
    });
}

//Extrae todos los doctores de la base de datos para desplegable de reservas
function autoInicioDoctoresReservas() {
    console.log("cargando...")
    $.ajax({
        url: "http://129.151.122.81:8080/api/Doctor/all",
        type: "GET",
        datatype: "JSON",
        success: function (desplegableDoctores) {
            console.log(desplegableDoctores);
            let $select = $("#ReservaDoctor");
            $.each(desplegableDoctores, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            })
        }
    });
}

//Extrae todos los doctores de la base de datos
function extraerInformacionDoctores() {
    $.ajax({
        url: "http://129.151.122.81:8080/api/Doctor/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaDoctor) {
            console.log(respuestaDoctor);
            pintarRespuestaDoctores(respuestaDoctor);
        },
    });
}

//Presenta lista o tabla de doctores
function pintarRespuestaDoctores(respuestaDoctor) {
    let tablaDoctores = "<table> <tr> <th>Id</th> <th>Name</th> <th>Department</th> <th>Year</th> <th>Description</th> <th>Specialty</th> </tr>";
    for (i = 0; i < respuestaDoctor.length; i++) {
        tablaDoctores += "<tr>";
        tablaDoctores += "<td>" + respuestaDoctor[i].id + "</td>";
        tablaDoctores += "<td>" + respuestaDoctor[i].name + "</td>";
        tablaDoctores += "<td>" + respuestaDoctor[i].department + "</td>";
        tablaDoctores += "<td>" + respuestaDoctor[i].year + "</td>";
        tablaDoctores += "<td>" + respuestaDoctor[i].description + "</td>";
        tablaDoctores += "<td>" + respuestaDoctor[i].specialty.name + "</td>";
        tablaDoctores += "<td> <button onclick = 'borrarInformacionDoctor(" + respuestaDoctor[i].id + ")'>Delete</button>";
        tablaDoctores += "<td> <button onclick = 'actualizarInformacionDoctor(" + respuestaDoctor[i].id + ")'>Update</button>";
        tablaDoctores += "<td> <button onclick = 'cargarInformacionDoctor(" + respuestaDoctor[i].id + ")'>Edit</button>";
        tablaDoctores += "</tr>";
    }
    tablaDoctores += "</table>";
    $("#resultadoDoctores").html(tablaDoctores);
}

//Guarda un nuevo doctor en la base de datos
function guardarInformacionDoctor() {
let doctor = {
    name: $("#DoctorName").val(),
    department: $("#DoctorDepartment").val(),
    year: $("#DoctorYear").val(),
    description: $("#DoctorDescription").val(),
    specialty: {id:+$("#DoctorSpecialty").val()},
};
$.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    data: JSON.stringify(doctor),
    url: "http://129.151.122.81:8080/api/Doctor/save",

        success: function (response) {
            console.log(response);
            console.log("New doctor added");
            $("#resultado").empty();
            $("#DoctorId").val("");
            $("#DoctorName").val("");
            $("#DoctorDepartment").val("");
            $("#DoctorYear").val("");
            $("#DoctorDescription").val("");
            //$("#DoctorSpecialty").val("");
            alert("New doctor added");
            extraerInformacionDoctores();
            window.location.reload();
        },

        error: function (jqXHR, textStatus, errorThrown) {
            //window.location.reload();
            alert("Error saving. Try again.");
        },
    });
}

////Cargar información de un doctor en los campos para editar
function cargarInformacionDoctor(idDoctor) {
  let myData = {
    id: idDoctor,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "http://129.151.122.81:8080/api/Doctor/" + idDoctor,
    type: "GET",
    dataType: "JSON",
    success: function (respuestaDoctor) {
      console.log(respuestaDoctor);
      let specialty = respuestaDoctor.items[0];
      $("#DoctorId").val(specialty.id);
      $("#DoctorName").val(specialty.name);
      $("#DoctorDepartment").val(specialty.department);
      $("#DoctorYear").val(specialty.year);
      $("#DoctorDescription").val(specialty.description);
    },
  });
}

//Actualiza un doctor en la base de datos
function actualizarInformacionDoctor(idDoctor) {
    let doctor = {
        id: idDoctor,
        description: $("#DoctorDescription").val(),
        name: $("#DoctorName").val(),
        department: $("#DoctorDepartment").val(),
        year: $("#DoctorYear").val(),
    };
    console.log(doctor);
    let dataToSend = JSON.stringify(doctor);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Doctor/" + idDoctor,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaDoctor) {
        $("#resultado").empty();
        $("#DoctorId").val("");
        $("#DoctorName").val("");
        $("#DoctorDepartment").val("");
        $("#DoctorYear").val("");
        $("#DoctorDescription").val("");
        //$("#DoctorSpecialty").val("");
        extraerInformacionDoctores();
        alert("Doctor updated");
        },
    });
}

//Elimina un doctor en la base de datos
function borrarInformacionDoctor(idDoctor) {
    let myData = {
        id: idDoctor,
    };

    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Doctor/" + idDoctor,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        
        success: function (respuestaDoctor) {
            $("#resultado").empty();
            extraerInformacionDoctores();
            alert("Doctor deleted");
        },
    });
}


//////////////////////BLOQUE CLIENTES/////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//Extrae todos los clientes de la base de datos para desplegable de mensajes
function autoInicioClientesMensajes() {
    console.log("cargando...")
    $.ajax({
        url: "http://129.151.122.81:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (desplegableClientes) {
            console.log(desplegableClientes);
            let $select = $("#MensajeCliente");
            $.each(desplegableClientes, function(id, name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                console.log("select "+name.idClient);
            })
        }
    });
}

//Extrae todos los clientes de la base de datos para desplegable de reservas
function autoInicioClientesReservas() {
    console.log("cargando...")
    $.ajax({
        url: "http://129.151.122.81:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (desplegableClientes) {
            console.log(desplegableClientes);
            let $select = $("#ReservaCliente");
            $.each(desplegableClientes, function(id, name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                console.log("select "+name.idClient);
            })
        }
    });
}

//Extrae todos los clientes de la base de datos
function extraerInformacionClientes() {
    $.ajax({
        url: "http://129.151.122.81:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaClientes) {
            console.log(respuestaClientes);
            pintarRespuestaClientes(respuestaClientes);
        },
    });
}

//Presenta lista o tabla de clientes
function pintarRespuestaClientes(respuestaClientes) {
    let tablaClientes = "<table> <tr> <th>Id</th> <th>Name</th> <th>Email</th> <th>Age</th> <th>Password</th> </tr>";
    for (i = 0; i < respuestaClientes.length; i++) {
        tablaClientes += "<tr>";
        tablaClientes += "<td>" + respuestaClientes[i].idClient + "</td>";
        tablaClientes += "<td>" + respuestaClientes[i].name + "</td>";
        tablaClientes += "<td>" + respuestaClientes[i].email + "</td>";
        tablaClientes += "<td>" + respuestaClientes[i].age + "</td>";
        tablaClientes += "<td>" + respuestaClientes[i].password + "</td>";
        tablaClientes += "<td> <button onclick = 'borrarInformacionCliente(" + respuestaClientes[i].idClient + ")'>Delete</button>";
        tablaClientes += "<td> <button onclick = 'actualizarInformacionCliente(" + respuestaClientes[i].idClient + ")'>Update</button>";
        tablaClientes += "<td> <button onclick = 'cargarInformacionCliente(" + respuestaClientes[i].idClient + ")'>Edit</button>";
        tablaClientes += "</tr>";
    }
    tablaClientes += "</table>";
    $("#resultadoClientes").html(tablaClientes);
}

function guardarInformacionCliente() {
    let cliente = {
        email: $("#ClienteEmail").val(),
        password: $("#ClientePassword").val(),
        name: $("#ClienteName").val(),
        age: $("#ClienteAge").val(),
    };

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(cliente),
        url: "http://129.151.122.81:8080/api/Client/save",

        success: function (response) {
            console.log(response);
            console.log("New client added");
            alert("New client added");
            $("#resultado").empty();
            $("#ClienteId").val("");
            $("#ClienteEmail").val("");
            $("#ClientePassword").val("");
            $("#ClienteName").val("");
            $("#ClienteAge").val("");
            extraerInformacionClientes();
            window.location.reload();
        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("Error saving. Try again.");
        },
    });
}

////Cargar información de un cliente en los campos para editar
function cargarInformacionCliente(idClient) {
  let myData = {
    id: idClient,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "http://129.151.122.81:8080/api/Client/" + idClient,
    type: "GET",
    dataType: "JSON",
    success: function (respuestaCliente) {
      console.log(respuestaCliente);
      let specialty = respuestaCliente.items[0];
      $("#EspecialidadesId").val(specialty.id);
      $("#EspecialidadesName").val(specialty.name);
      $("#EspecialidadesDescription").val(specialty.description);
    },
  });
}

//Actualiza un cliente en la base de datos
function actualizarInformacionCliente(idClient) {
    let cliente = {
        idClient: idClient,
        email: $("#ClienteEmail").val(),
        password: $("#ClientePassword").val(),
        name: $("#ClienteName").val(),
        age: $("#ClienteAge").val(),
    };
    console.log(cliente);
    let dataToSend = JSON.stringify(cliente);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Client/" + idClient,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaClientes) {
            $("#resultado").empty();
            $("#ClienteId").val("");
            $("#ClienteEmail").val("");
            $("#ClientePassword").val("");
            $("#ClienteName").val("");
            $("#ClienteAge").val("");
        extraerInformacionClientes();
        alert("Client updated");
        },
    });
}

//Elimina un cliente en la base de datos
function borrarInformacionCliente(idClient) {
    let myData = {
        id: idClient,
    };

    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Client/" + idClient,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        
        success: function (respuestaClientes) {
            $("#resultado").empty();
            extraerInformacionClientes();
            alert("Client deleted");
        },
    });
}


//////////////////////BLOQUE MENSAJES/////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//Extrae todos los mensajes de la base de datos
function extraerInformacionMensajes() {
    $.ajax({
        url: "http://129.151.122.81:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaMensajes) {
            console.log(respuestaMensajes);
            pintarRespuestaMensajes(respuestaMensajes);
        },
    });
}

//Presenta lista o tabla de mensajes
function pintarRespuestaMensajes(respuestaMensajes) {
    let tablaMensajes = "<table> <tr> <th>Id</th> <th>Doctor</th> <th>Client</th> <th>Message</th> </tr>";
    for (i = 0; i < respuestaMensajes.length; i++) {
        tablaMensajes += "<tr>";
        tablaMensajes += "<td>" + respuestaMensajes[i].idMessage + "</td>";
        tablaMensajes += "<td>" + respuestaMensajes[i].doctor.name + "</td>";
        tablaMensajes += "<td>" + respuestaMensajes[i].client.name + "</td>";
        tablaMensajes += "<td>" + respuestaMensajes[i].messageText + "</td>";
        tablaMensajes += "<td> <button onclick = 'borrarInformacionMensaje(" + respuestaMensajes[i].idMessage + ")'>Delete</button>";
        tablaMensajes += "<td> <button onclick = 'actualizarInformacionMensaje(" + respuestaMensajes[i].idMessage + ")'>Update</button>";
        tablaMensajes += "<td> <button onclick = 'cargarInformacionMensaje(" + respuestaMensajes[i].idMessage + ")'>Edit</button>";
        tablaMensajes += "</tr>";
    }
    tablaMensajes += "</table>";
    $("#resultadoMensajes").html(tablaMensajes);
}

//Guarda un nuevo mensaje en la base de datos
function guardarInformacionMensaje() {
    let mensaje = {
        messageText: $("#MensajeMessageText").val(),
        doctor: {id:+$("MensajeDoctor").val()},
        client: {idClient:+$("MensajeCliente").val()},
    };

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(mensaje),
        url: "http://129.151.122.81:8080/api/Message/save",

        success: function (response) {
            console.log(response);
            console.log("New message added");
            alert("New message added");
            $("#resultado").empty();
            $("#MensajeId").val("");
            $("#MensajeMessageText").val("");
            //extraerInformacionMensajes();
            //window.location.reload();
        },

        error: function (jqXHR, textStatus, errorThrown) {
            //window.location.reload();
            alert("Error saving. Try again.");
        },
    });
}

////Cargar información de un mensaje en los campos para editar
function cargarInformacionMensaje(idMessage) {
  let myData = {
    id: idMessage,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "http://129.151.122.81:8080/api/Message/" + idMessage,
    type: "GET",
    dataType: "JSON",
    success: function (respuestaMensaje) {
      console.log(respuestaMensaje);
      let specialty = respuestaMensaje.items[0];
      $("#EspecialidadesId").val(specialty.id);
      $("#EspecialidadesName").val(specialty.name);
      $("#EspecialidadesDescription").val(specialty.description);
    },
  });
}

//Actualiza un mensaje en la base de datos
function actualizarInformacionMensaje(idMessage) {
    let mensaje = {
        idMessage: idMessage,
        messageText: $("#MensajeMessageText").val(),
    };
    console.log(mensaje);
    let dataToSend = JSON.stringify(mensaje);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Message/" + idMessage,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        
        success: function (respuestaMensajes) {
            $("#resultado").empty();
            $("#MensajeId").val("");
            $("#MensajeMessageText").val("");
            extraerInformacionMensajes();
            alert("Message updated");
        },
    });
}

//Elimina un mensaje en la base de datos
function borrarInformacionMensaje(idMessage) {
    let myData = {
        id: idMessage,
    };

    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Message/" + idMessage,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        
        success: function (respuestaMensajes) {
            $("#resultado").empty();
            extraerInformacionMensajes();
            alert("Message deleted");
        },
    });
}


//////////////////////BLOQUE RESERVAS/////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//Extrae todas las reservas de la base de datos
function extraerInformacionReservas() {
    $.ajax({
        url: "http://129.151.122.81:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaReservas) {
            console.log(respuestaReservas);
            pintarRespuestaReservas(respuestaReservas);
        },
    });
}

//Presenta lista o tabla de reservas
function pintarRespuestaReservas(respuestaReservas) {
    let tablaReservas = "<table> <tr> <th>Id</th> <th>Doctor</th> <th>Client</th> <th>Specialty</th> <th>Star Date</th> <th>End Date</th> <th>Status</th> <th>Score</th> <th>Message</th> </tr>";
    for (i = 0; i < respuestaReservas.length; i++) {
        tablaReservas += "<tr>";
        tablaReservas += "<td>" + respuestaReservas[i].idReservation + "</td>";
        tablaReservas += "<td>" + respuestaReservas[i].doctor.name + "</td>";
        tablaReservas += "<td>" + respuestaReservas[i].client.name + "</td>";
        tablaReservas += "<td>" + respuestaReservas[i].doctor.specialty.name + "</td>";
        tablaReservas += "<td>" + respuestaReservas[i].startDate + "</td>";
        tablaReservas += "<td>" + respuestaReservas[i].devolutionDate + "</td>";
        tablaReservas += "<td>" + respuestaReservas[i].status + "</td>";
        tablaReservas += "<td> <button onclick = 'borrarInformacionReserva(" + respuestaReservas[i].idReservation + ")'>Delete</button>";
        tablaReservas += "<td> <button onclick = 'actualizarInformacionReserva(" + respuestaReservas[i].idReservation + ")'>Update</button>";
        tablaReservas += "<td> <button onclick = 'cargarInformacionReserva(" + respuestaReservas[i].idReservation + ")'>Edit</button>";
        tablaReservas += "</tr>";
    }
    tablaReservas += "</table>";
    $("#resultadoReservas").html(tablaReservas);
}

//Guarda una nueva reserva en la base de datos
function guardarInformacionReserva() {
    let reserva = {
        startDate: $("#ReservaStartDate").val(),
        devolutionDate: $("#ReservaDevolutionDate").val(),
        status: $("#ReservaStatus").val(),
        client: {idClient:+$("ReservaCliente").val()},
        doctor: {id:+$("ReservaDoctor").val()},
    };

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(reserva),
        url: "http://129.151.122.81:8080/api/Reservation/save",

        success: function (response) {
            console.log(response);
            console.log("New reservation added");
            alert("New reservation added");
            $("#resultado").empty();
            $("#ReservaStartDate").val("");
            $("#ReservaDevolutionDate").val("");
            extraerInformacionReservas();
            //window.location.reload();
        },

        error: function (jqXHR, textStatus, errorThrown) {
            //window.location.reload();
            alert("Error saving. Try again.");
        },
    });
}

////Cargar información de una reserva en los campos para editar
function cargarInformacionReserva(idReservation) {
  let myData = {
    id: idReservation,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "http://129.151.122.81:8080/api/Reservation/" + idReservation,
    type: "GET",
    dataType: "JSON",
    success: function (respuestaReserva) {
      console.log(respuestaReserva);
      let specialty = respuestaReserva.items[0];
      $("#EspecialidadesId").val(specialty.id);
      $("#EspecialidadesName").val(specialty.name);
      $("#EspecialidadesDescription").val(specialty.description);
    },
  });
}

//Actualiza una reserva en la base de datos
function actualizarInformacionReserva(idReservation) {
    let reserva = {
        id: idReservation,
        startDate: $("#ReservaStartDate").val(),
        devolutionDate: $("#ReservaDevolutionDate").val(),
        status: $("#ReservaStatus").val(),
        score: $("#ReservaScore").val(),
    };
    console.log(reserva);
    let dataToSend = JSON.stringify(reserva);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Reservation/" + idReservation,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaReservas) {
            $("#resultado").empty();
            $("#ReservaId").val("");
            $("#ReservaStartDate").val("");
            $("#ReservaDevolutionDate").val("");
            $("#ReservaStatus").val("");
            $("#ReservaScore").val("");
        extraerInformacionReservas();
        alert("Reserve updated");
        },
    });
}

//Elimina una reserva en la base de datos
function borrarInformacionReserva(idReservation) {
    let myData = {
        id: idReservation,
    };

    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Reservation/" + idReservation,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        
        success: function (respuestaReservas) {
            $("#resultado").empty();
            extraerInformacionReservas();
            alert("Reserve deleted");
        },
    });
}


//////////////////////BLOQUE USUARIOS ADMINISTRADORES/////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//Extrae todos los administradores de la base de datos
function extraerInformacionAdministradores() {
    $.ajax({
        url: "http://129.151.122.81:8080/api/Admin/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaAdministradores) {
            console.log(respuestaAdministradores);
            pintarRespuestaAdministradores(respuestaAdministradores);
        },
    });
}

//Presenta lista o tabla de administradores
function pintarRespuestaAdministradores(respuestaAdministradores) {
    let tablaAdministradores = "<table> <tr> <th>Id</th> <th>Name</th> <th>Email</th> <th>Password</th> </tr>";
    for (i = 0; i < respuestaAdministradores.length; i++) {
        tablaAdministradores += "<tr>";
        tablaAdministradores += "<td>" + respuestaAdministradores[i].idAdmin + "</td>";
        tablaAdministradores += "<td>" + respuestaAdministradores[i].name + "</td>";
        tablaAdministradores += "<td>" + respuestaAdministradores[i].email + "</td>";
        tablaAdministradores += "<td>" + respuestaAdministradores[i].password + "</td>";
        tablaAdministradores += "<td> <button onclick = 'borrarInformacionAdministrador(" + respuestaAdministradores[i].idAdmin + ")'>Delete</button>";
        tablaAdministradores += "<td> <button onclick = 'actualizarInformacionAdministrador(" + respuestaAdministradores[i].idAdmin + ")'>Update</button>";
        tablaAdministradores += "<td> <button onclick = 'cargarInformacionAdministrador(" + respuestaAdministradores[i].idAdmin + ")'>Edit</button>";
        tablaAdministradores += "</tr>";
    }
    tablaAdministradores += "</table>";
    $("#resultadoAdministradores").html(tablaAdministradores);
}

function guardarInformacionAdministrador() {
    let administrador = {
        email: $("#AdministradorEmail").val(),
        password: $("#AdministradorPassword").val(),
        name: $("#AdministradorName").val(),
    };

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(administrador),
        url: "http://129.151.122.81:8080/api/Admin/save",

        success: function (response) {
            console.log(response);
            console.log("New administrator added");
            alert("New administrator added");
            $("#resultado").empty();
            $("#AdministradorId").val("");
            $("#AdministradorEmail").val("");
            $("#AdministradorPassword").val("");
            $("#AdministradorName").val("");
            extraerInformacionAdministradores();
            window.location.reload();
        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload();
            alert("Error saving. Try again.");
        },
    });
}

////Cargar información de un administrador en los campos para editar
function cargarInformacionAdministrador(idAdmin) {
  let myData = {
    id: idAdmin,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "http://129.151.122.81:8080/api/Admin/" + idAdmin,
    type: "GET",
    dataType: "JSON",
    success: function (respuestaAdministrador) {
      console.log(respuestaAdministrador);
      let specialty = respuestaAdministrador.items[0];
      $("#EspecialidadesId").val(specialty.id);
      $("#EspecialidadesName").val(specialty.name);
      $("#EspecialidadesDescription").val(specialty.description);
    },
  });
}

//Actualiza un administrador en la base de datos
function actualizarInformacionAdministrador(idAdmin) {
    let administrador = {
        idAdmin: idAdmin,
        email: $("#AdministradorEmail").val(),
        password: $("#AdministradorPassword").val(),
        name: $("#AdministradorName").val(),
    };
    console.log(administrador);
    let dataToSend = JSON.stringify(administrador);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Admin/" + idAdmin,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaAdministradores) {
            $("#resultado").empty();
            $("#AdministradorId").val("");
            $("#AdministradorEmail").val("");
            $("#AdministradorPassword").val("");
            $("#AdministradorName").val("");
        extraerInformacionAdministradores();
        alert("Administrator updated");
        },
    });
}

//Elimina un administrador en la base de datos
function borrarInformacionAdministrador(idAdmin) {
    let myData = {
        id: idAdmin,
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Admin/" + idAdmin,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        
        success: function (respuestaAdministradores) {
            $("#resultado").empty();
            extraerInformacionAdministradores();
            alert("Administrator deleted");
        },
    });
}
