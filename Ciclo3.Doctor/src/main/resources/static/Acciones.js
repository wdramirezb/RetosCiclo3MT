$(document).ready(function(){
    autoInicioEspecialidades();
    autoInicioDoctoresMensajes();
    autoInicioDoctoresReservas();
    autoInicioClientesMensajes();
    autoInicioClientesReservas();
    autoInicioReservas();
});


/////////////////////BLOQUE ESPECIALIDADES////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//Extrae especialidades para desplegable en doctores
function autoInicioEspecialidades() {
    console.log("cargando lista especialidades para doctores")
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
    let tablaEspecialistas = "<table><tr>";
        tablaEspecialistas += "<p>Use '<b>Delete</b>' to erase a record from the database <br> Use '<b>Edit</b>' to populate fields for edition of a record <br> Use '<b>Update</b>' to save changes to record in database</p>";
        tablaEspecialistas += "</tr>";
        tablaEspecialistas += "<tr> <th>Name</th> <th>Description</th> </tr>";
    for (i = 0; i < respuestaEspecialidades.length; i++) {
        tablaEspecialistas += "<tr>";
        //tablaEspecialistas += "<td>" + respuestaEspecialidades[i].id + "</td>";
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
            $("#id").val("");
            $("#EspecialidadesName").val("");
            $("#EspecialidadesDescription").val("");
            window.location.reload()
            alert("New specialty added");
            extraerInformacionEspecialidades();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error saving. Try again.");
        },
    });
}

////Cargar información de una especialidad en los campos para editar
function cargarInformacionEspecialidad(idEspecialidad) {
    $.ajax({
        url: "http://129.151.122.81:8080/api/Specialty/" + idEspecialidad,
        type: "GET",
        data: idEspecialidad,
        dataType: "JSON",
        success: function (respuestaEspecialidad) {
            console.log(respuestaEspecialidad);
            $("#EspecialidadesId").val(respuestaEspecialidad.id);
            $("#EspecialidadesName").val(respuestaEspecialidad.name);
            $("#EspecialidadesDescription").val(respuestaEspecialidad.description);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error loading for edition. Try again.");
        },
    });
}

//Actualiza un especialidad en la base de datos
function actualizarInformacionEspecialidad(idEspecialidad) {
    let especialidad = {
        id: idEspecialidad,
        name: $("#EspecialidadesName").val(),
        description: $("#EspecialidadesDescription").val(),
    };
    console.log(especialidad)
    let dataToSend = JSON.stringify(especialidad);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Specialty/" + idEspecialidad,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaEspecialidad) {
            $("#id").val("");
            $("#EspecialidadesName").val("");
            $("#EspecialidadesDescription").val("");
            window.location.reload()
            alert("Specialty updated");
            extraerInformacionEspecialidades();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error updating. Try again.");
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
            window.location.reload()
            alert("Specialty deleted");
            extraerInformacionEspecialidades();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error deleting. Used specialties can't be deleted.");
        },
    });
}


///////////////////BLOQUE DOCTORES////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//Extrae todos los doctores de la base de datos para desplegable de mensajes
function autoInicioDoctoresMensajes() {
    console.log("cargando lista de doctores para mensajes")
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
                console.log(id, JSON.stringify(name));
            })
        }
    });
}

//Extrae todos los doctores de la base de datos para desplegable de reservas
function autoInicioDoctoresReservas() {
    console.log("cargando lista de doctores para reservas")
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
        success: function (respuestaDoctores) {
            console.log(respuestaDoctores);
            pintarRespuestaDoctores(respuestaDoctores);
        },
    });
}

//Presenta lista o tabla de doctores
function pintarRespuestaDoctores(respuestaDoctores) {
    let tablaDoctores = "<table><tr>";
        tablaDoctores += "<p>Use '<b>Delete</b>' to erase a record from the database <br> Use '<b>Edit</b>' to populate fields for edition of a record <br> Use '<b>Update</b>' to save changes to record in database</p>";
        tablaDoctores += "</tr>";
        tablaDoctores += "<tr> <th>Name</th> <th>Department</th> <th>Year</th> <th>Description</th> <th>Specialty</th> </tr>";
    for (i = 0; i < respuestaDoctores.length; i++) {
        tablaDoctores += "<tr>";
        //tablaDoctores += "<td>" + respuestaDoctores[i].id + "</td>";
        tablaDoctores += "<td>" + respuestaDoctores[i].name + "</td>";
        tablaDoctores += "<td>" + respuestaDoctores[i].department + "</td>";
        tablaDoctores += "<td>" + respuestaDoctores[i].year + "</td>";
        tablaDoctores += "<td>" + respuestaDoctores[i].description + "</td>";
        tablaDoctores += "<td>" + respuestaDoctores[i].specialty.name + "</td>";
        tablaDoctores += "<td> <button onclick = 'borrarInformacionDoctor(" + respuestaDoctores[i].id + ")'>Delete</button>";
        tablaDoctores += "<td> <button onclick = 'actualizarInformacionDoctor(" + respuestaDoctores[i].id + ")'>Update</button>";
        tablaDoctores += "<td> <button onclick = 'cargarInformacionDoctor(" + respuestaDoctores[i].id + ")'>Edit</button>";
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
            $("#DoctorId").val("");
            $("#DoctorName").val("");
            $("#DoctorDepartment").val("");
            $("#DoctorYear").val("");
            $("#DoctorDescription").val("");
            $("#DoctorSpecialty").val("");
            window.location.reload();
            alert("New doctor added");
            extraerInformacionDoctores();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error saving. Try again.");
        },
    });
}

////Cargar información de un doctor en los campos para editar
function cargarInformacionDoctor(idDoctor) {
    $.ajax({
        url: "http://129.151.122.81:8080/api/Doctor/" + idDoctor,
        type: "GET",
        data: idDoctor,
        dataType: "JSON",
        success: function (respuestaDoctor) {
            console.log(respuestaDoctor);
            $("#DoctorId").val(respuestaDoctor.id);
            $("#DoctorName").val(respuestaDoctor.name);
            $("#DoctorDepartment").val(respuestaDoctor.department);
            $("#DoctorYear").val(respuestaDoctor.year);
            $("#DoctorDescription").val(respuestaDoctor.description);
            $("#DoctorSpecialty").val(respuestaDoctor.specialty.id);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error loading for edition. Try again.");
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
        specialty: {id:+$("#DoctorSpecialty").val()},
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
            $("#DoctorId").val("");
            $("#DoctorName").val("");
            $("#DoctorDepartment").val("");
            $("#DoctorYear").val("");
            $("#DoctorDescription").val("");
            $("#DoctorSpecialty").val("");
            window.location.reload();
            alert("Doctor updated");
            extraerInformacionDoctores();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error updating. Try again.");
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
            window.location.reload();
            alert("Doctor deleted");
            extraerInformacionDoctores();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error deleting. Used doctors can't be deleted.");
        },
    });
}


//////////////////////BLOQUE CLIENTES/////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//Extrae todos los clientes de la base de datos para desplegable de mensajes
function autoInicioClientesMensajes() {
    console.log("cargando lista clientes para mensajes")
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
    console.log("cargando lista clientes para reservas")
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
    let tablaClientes = "<table><tr>";
        tablaClientes += "<p>Use '<b>Delete</b>' to erase a record from the database <br> Use '<b>Edit</b>' to populate fields for edition of a record <br> Use '<b>Update</b>' to save changes to record in database</p>";
        tablaClientes += "</tr>";
        tablaClientes += "<tr> <th>Name</th> <th>Email</th> <th>Age</th> <th>Password</th> </tr>";
    for (i = 0; i < respuestaClientes.length; i++) {
        tablaClientes += "<tr>";
        //tablaClientes += "<td>" + respuestaClientes[i].idClient + "</td>";
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

////Guardar información de un nuevo cliente
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
            alert("New client added");
            $("#ClienteId").val("");
            $("#ClienteEmail").val("");
            $("#ClientePassword").val("");
            $("#ClienteName").val("");
            $("#ClienteAge").val("");
            window.location.reload();
            alert("New client added");
            extraerInformacionClientes();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error saving. Try again.");
        },
    });
}

////Cargar información de un cliente en los campos para editar
function cargarInformacionCliente(idClient) {
    $.ajax({
        url: "http://129.151.122.81:8080/api/Client/" + idClient,
        type: "GET",
        data: idClient,
        dataType: "JSON",
        success: function (respuestaCliente) {
            console.log(respuestaCliente);
            $("#ClienteId").val(respuestaCliente.id);
            $("#ClienteEmail").val(respuestaCliente.email);
            $("#ClientePassword").val(respuestaCliente.password);
            $("#ClienteName").val(respuestaCliente.name);
            $("#ClienteAge").val(respuestaCliente.age);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error loading for edition. Try again.");
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
            $("#ClienteId").val("");
            $("#ClienteEmail").val("");
            $("#ClientePassword").val("");
            $("#ClienteName").val("");
            $("#ClienteAge").val("");
            window.location.reload();
            alert("Client updated");
            extraerInformacionClientes();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error updating. Try again.");
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
            window.location.reload();
            alert("Client deleted");
            extraerInformacionClientes();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error deleting. Used clients can't be deleted.");
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
    let tablaMensajes = "<table><tr>";
        tablaMensajes += "<p>Use '<b>Delete</b>' to erase a record from the database <br> Use '<b>Edit</b>' to populate fields for edition of a record <br> Use '<b>Update</b>' to save changes to record in database</p>";
        tablaMensajes += "</tr>";
        tablaMensajes += "<tr> <th>Doctor</th> <th>Client</th> <th>Message</th> </tr>";
    for (i = 0; i < respuestaMensajes.length; i++) {
        tablaMensajes += "<tr>";
        //tablaMensajes += "<td>" + respuestaMensajes[i].idMessage + "</td>";
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
        doctor: {id:+$("#MensajeDoctor").val()},
        client: {idClient:+$("#MensajeCliente").val()},
    };
    console.log(mensaje);  
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(mensaje),
        url: "http://129.151.122.81:8080/api/Message/save",
        success: function (response) {
            console.log(response);
            $("#MensajeId").val("");
            $("#MensajeMessageText").val("");
            $("#MensajeDoctor").val("");
            $("#MensajeCliente").val("");
            window.location.reload();
            alert("New message added");
            extraerInformacionMensajes();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error saving. Try again.");
        },
    });
}

////Cargar información de un mensaje en los campos para editar
function cargarInformacionMensaje(idMessage) {
    $.ajax({
        url: "http://129.151.122.81:8080/api/Message/" + idMessage,
        type: "GET",
        data: idMessage,
        dataType: "JSON",
        success: function (respuestaMensaje) {
            console.log(respuestaMensaje);
            $("#MensajeId").val(respuestaMensaje.id);
            $("#MensajeDoctor").val(respuestaMensaje.doctor.id);
            $("#MensajeCliente").val(respuestaMensaje.client.idClient);
            $("#MensajeMessageText").val(respuestaMensaje.messageText);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error loading for edition. Try again.");
        },
    });
}

//Actualiza un mensaje en la base de datos
function actualizarInformacionMensaje(idMessage) {
    let mensaje = {
        idMessage: idMessage,
        messageText: $("#MensajeMessageText").val(),
        client: {idClient:+$("#MensajeCliente").val()},
        doctor: {id:+$("#MensajeDoctor").val()},
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
            $("#MensajeId").val("");
            $("#MensajeDoctor").val("");
            $("#MensajeCliente").val("");
            $("#MensajeMessageText").val("");
            window.location.reload();
            alert("Message updated");
            extraerInformacionMensajes();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error updating. Try again.");
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
            window.location.reload();
            alert("Message deleted");
            extraerInformacionMensajes();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error deleting. Used messages can't be deleted.");
        },
    });
}


//////////////////////BLOQUE RESERVAS/////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//Extrae todas las reservas de la base de datos para desplegable de calificaciones
function autoInicioReservas() {
    console.log("cargando lista reservas para calificaciones")
    $.ajax({
        url: "http://129.151.122.81:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (desplegableReservas) {
            console.log(desplegableReservas);
            let $select = $("#ScoreReserva");
            $.each(desplegableReservas, function(id, name){
                $select.append('<option value='+name.idReservation+'>'+name.startDate.slice(0,10)+'</option>');
                console.log("select "+name.idReservation);
            })
        }
    });
}

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
    let tablaReservas = "<table><tr>";
        tablaReservas += "<p>Use '<b>Delete</b>' to erase a record from the database <br> Use '<b>Edit</b>' to populate fields for edition of a record <br> Use '<b>Update</b>' to save changes to record in database</p>";
        tablaReservas += "</tr>";
        tablaReservas += "<tr> <th>Doctor</th> <th>Client</th> <th>Specialty</th> <th>Star Date</th> <th>End Date</th> <th>Status</th> <th>Score</th> <th>Creation Date</th> </tr>";
    for (i = 0; i < respuestaReservas.length; i++) {
        tablaReservas += "<tr>";
        //tablaReservas += "<td>" + respuestaReservas[i].idReservation + "</td>";
        tablaReservas += "<td>" + respuestaReservas[i].doctor.name + "</td>";
        tablaReservas += "<td>" + respuestaReservas[i].client.name + "</td>";
        tablaReservas += "<td>" + respuestaReservas[i].doctor.specialty.name + "</td>";
        tablaReservas += "<td>" + respuestaReservas[i].startDate.slice(0,10) + "</td>";
        tablaReservas += "<td>" + respuestaReservas[i].devolutionDate.slice(0,10) + "</td>";
        tablaReservas += "<td>" + respuestaReservas[i].status + "</td>";
        tablaReservas += "<td>" + respuestaReservas[i].score.stars + "</td>";
        tablaReservas += "<td>" + respuestaReservas[i].creationDate.slice(0,10) + "</td>";
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
        status: $("#ReservaEstado").val(),
        client: {idClient:+$("#ReservaCliente").val()},
        doctor: {id:+$("#ReservaDoctor").val()},
    };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(reserva),
        url: "http://129.151.122.81:8080/api/Reservation/save",
        success: function (response) {
            console.log(response);
            $("#ReservaStartDate").val("");
            $("#ReservaDevolutionDate").val("");
            $("#ReservaCliente").val("");
            $("#ReservaDoctor").val("");
            $("#ReservaEstado").val("");
            window.location.reload();
            alert("New reservation added");
            extraerInformacionReservas();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error saving. Try again.");
        },
    });
}

////Cargar información de una reserva en los campos para editar
function cargarInformacionReserva(idReservation) {
    $.ajax({
        url: "http://129.151.122.81:8080/api/Reservation/" + idReservation,
        type: "GET",
        data: idReservation,
        dataType: "JSON",
        success: function (respuestaReserva) {
            console.log(respuestaReserva);
            $("#ReservaId").val(respuestaReserva.id);
            $("#ReservaDoctor").val(respuestaReserva.doctor.id);
            $("#ReservaCliente").val(respuestaReserva.client.idClient);
            $("#ReservaStartDate").val(respuestaReserva.startDate.slice(0,10));
            $("#ReservaDevolutionDate").val(respuestaReserva.devolutionDate.slice(0,10));
            $("#ReservaEstado").val(respuestaReserva.status);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error loading for edition. Try again.");
        },
    });
}

//Actualiza una reserva en la base de datos
function actualizarInformacionReserva(idReservation) {
    let reserva = {
        idReservation: idReservation,
        startDate: $("#ReservaStartDate").val(),
        devolutionDate: $("#ReservaDevolutionDate").val(),
        status: $("#ReservaEstado").val(),
        client: {idClient:+$("#ReservaCliente").val()},
        doctor: {id:+$("#ReservaDoctor").val()},
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
            $("#ReservaId").val("");
            $("#ReservaDoctor").val("");
            $("#ReservaCliente").val("");
            $("#ReservaStartDate").val("");
            $("#ReservaDevolutionDate").val("");
            $("#ReservaEstado").val("");
            window.location.reload();
            alert("Reservation updated");
            extraerInformacionReservas();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error updating. Try again.");
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
            window.location.reload();
            alert("Reservation deleted");
            extraerInformacionReservas();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error deleting. Used reservations can't be deleted.");
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
    let tablaAdministradores = "<table><tr>";
        tablaAdministradores += "<p>Use '<b>Delete</b>' to erase a record from the database <br> Use '<b>Edit</b>' to populate fields for edition of a record <br> Use '<b>Update</b>' to save changes to record in database</p>";
        tablaAdministradores += "</tr>";
        tablaAdministradores += "<tr> <th>Name</th> <th>Email</th> <th>Password</th> </tr>";
    for (i = 0; i < respuestaAdministradores.length; i++) {
        tablaAdministradores += "<tr>";
        //tablaAdministradores += "<td>" + respuestaAdministradores[i].idAdmin + "</td>";
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
            $("#AdministradorId").val("");
            $("#AdministradorEmail").val("");
            $("#AdministradorPassword").val("");
            $("#AdministradorName").val("");
            window.location.reload();
            alert("New administrator added");
            extraerInformacionAdministradores();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error saving. Try again.");
        },
    });
}

////Cargar información de un administrador en los campos para editar
function cargarInformacionAdministrador(idAdmin) {
    $.ajax({
        url: "http://129.151.122.81:8080/api/Admin/" + idAdmin,
        type: "GET",
        data: idAdmin,
        dataType: "JSON",
        success: function (respuestaAdministrador) {
        console.log(respuestaAdministrador);
            $("#AdministradorId").val(respuestaAdministrador.id);
            $("#AdministradorName").val(respuestaAdministrador.name);
            $("#AdministradorEmail").val(respuestaAdministrador.email);
            $("#AdministradorPassword").val(respuestaAdministrador.password);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error loading for edition. Try again.");
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
            $("#AdministradorId").val("");
            $("#AdministradorEmail").val("");
            $("#AdministradorPassword").val("");
            $("#AdministradorName").val("");
            window.location.reload();
            alert("Administrator updated");
            extraerInformacionAdministradores();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error updating. Try again.");
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
            window.location.reload();
            alert("Administrator deleted");
            extraerInformacionAdministradores();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error deleting. Used administrators can't be deleted.");
        },
    });
}


//////////////////////BLOQUE CALIFICACIONES///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//Extrae todas las calificaciones de la base de datos
function extraerInformacionScore() {
    $.ajax({
        url: "http://129.151.122.81:8080/api/Score/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuestaScore) {
            console.log(respuestaScore);
            pintarRespuestaScore(respuestaScore);
        },
    });
}

//Presenta lista o tabla de calificaciones
function pintarRespuestaScore(respuestaScore) {
    let tablaScores = "<table><tr>";
        tablaScores += "<p>Use '<b>Delete</b>' to erase a record from the database <br> Use '<b>Edit</b>' to populate fields for edition of a record <br> Use '<b>Update</b>' to save changes to record in database</p>";
        tablaScores += "</tr>";
        tablaScores += "<tr> <th>Start Date</th> <th>End Date</th> <th>Doctor</th> <th>Client</th> <th>Score</th> <th>Mesaage Text</th> </tr>";
    for (i = 0; i < respuestaScore.length; i++) {
        tablaScores += "<tr>";
        //tablaScores += "<td>" + respuestaScore[i].idScores + "</td>";
        tablaScores += "<td>" + respuestaScore[i].reservation.startDate.slice(0,10) + "</td>";
        tablaScores += "<td>" + respuestaScore[i].reservation.devolutionDate.slice(0,10) + "</td>";
        tablaScores += "<td>" + respuestaScore[i].reservation.doctor.name + "</td>";
        tablaScores += "<td>" + respuestaScore[i].reservation.client.name + "</td>";
        tablaScores += "<td>" + respuestaScore[i].stars + "</td>";
        tablaScores += "<td>" + respuestaScore[i].messageText + "</td>";
        tablaScores += "<td> <button onclick = 'borrarInformacionScore(" + respuestaScore[i].idScore + ")'>Delete</button>";
        tablaScores += "<td> <button onclick = 'actualizarInformacionScore(" + respuestaScore[i].idScore + ")'>Update</button>";
        tablaScores += "<td> <button onclick = 'cargarInformacionScore(" + respuestaScore[i].idScore + ")'>Edit</button>";
        tablaScores += "</tr>";
    }
    tablaScores += "</table>";
    $("#resultadoScores").html(tablaScores);
}

//Guarda una nueva calificación en la base de datos
function guardarInformacionScore() {
    let score = {
            stars: $("#ScoreStars").val(),
            messageText: $("#ScoreMensaje").val(),
            reservation: {idReservation:+$("#ScoreReserva").val()},
        };
    console.log(score);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(score),
        url: "http://129.151.122.81:8080/api/Score/save",
        success: function (response) {
            $("#ScoreId").val("");
            $("#ScoreStars").val("");
            $("#ScoreMensaje").val("");
            $("#ScoreReserva").val("");
            window.location.reload();
            alert("New score added");
            extraerInformacionScore();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error saving. Try again.");
        },
    });
}

////Cargar información de una calificación en los campos para editar
function cargarInformacionScore(idScore) {
    $.ajax({
        url: "http://129.151.122.81:8080/api/Score/" + idScore,
        type: "GET",
        data: idScore,
        dataType: "JSON",
        success: function (respuestaScore) {
            console.log(respuestaScore);
            $("#ScoreId").val(respuestaScore.idScore);
            $("#ScoreStars").val(respuestaScore.stars);
            $("#ScoreMensaje").val(respuestaScore.messageText);
            $("#ScoreReserva").val(respuestaScore.reservation.idReservation);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(respuestaScore);
            alert("Error loading for edition. Try again.");
        },
    });
}

//Actualiza una calificaciones en la base de datos
function actualizarInformacionScore(idScore) {
    let score = {
        id: idScore,
        stars: $("#ScoreStars").val(),
        messageText: $("#ScoreMensaje").val(),
        reservation: {idReservation:+$("#ScoreReserva").val()},
    };
    console.log(score);
    let dataToSend = JSON.stringify(score);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Score/" + idScore,
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaScore) {
            $("#ScoreId").val("");
            $("#ScoreStars").val("");
            $("#ScoreMensaje").val("");
            $("#ScoreReserva").val("");
            window.location.reload();
            alert("Score updated");
            extraerInformacionScore();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error updating. Try again.");
        },
    });
}

//Elimina una calificaciones en la base de datos
function borrarInformacionScore(idScore) {
    let score = {
        id: idScore,
    };
    console.log(score);
    let dataToSend = JSON.stringify(score);
    $.ajax({
        url: "http://129.151.122.81:8080/api/Score/" + idScore,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuestaScore) {
            window.location.reload();
            alert("Score deleted");
            extraerInformacionScore();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error deleting. Used scores can't be deleted.");
        },
    });
}


//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////BLOQUE REPORTES/////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//Reporte de estado de reservas
function traerReporteStatus(){
    $.ajax({
        url:"http://129.151.122.81:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarReporteRespuestaStatus(respuesta);
        }
    });
}

function pintarReporteRespuestaStatus(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
       myTable+="<th>completadas</th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th>canceladas</th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoReporteStatus").html(myTable);
}

//Reporte de reservas entre rango de fechas
function traerReporteDate(){
    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    $.ajax({
        url:"http://129.151.122.81:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReporteDate(respuesta);
        }
    });
}

function pintarRespuestaReporteDate(respuesta){
    let myTable="<table>";
    myTable+="<tr>";
    for(i=0;i<respuesta.length;i++){
    myTable+="<th>total</th>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoReporteDate").html(myTable);
}


//Reporte de top clientes y número de reservas
function traerReporteClientes(){
    $.ajax({
        url:"http://129.151.122.81:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReporteClientes(respuesta);
        }
    });
}

function pintarRespuestaReporteClientes(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
    for(i=0;i<respuesta.length;i++){
    myTable+="<th>total</th>";
        myTable+="<td>"+respuesta[i].total+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td>"+respuesta[i].client.age+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoReporteClientes").html(myTable);
}
