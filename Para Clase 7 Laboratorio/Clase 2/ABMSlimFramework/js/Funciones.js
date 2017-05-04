function Login() 
{
	var email = $("#email").val();
	var password = $("#password").val();

	if (!ValidarCampos(email, password))
		alert("No se han completado correctamente los campos.");
	else
	{
        var form = new FormData();

	    form.append("email", email);
	    form.append("password", password);

	    $.ajax({
            type: "POST",
            url: "ws/administracion.php/login",
            dataType: "text",
            data: form,
            contentType: false,
            processData: false,
            async: true
	    })
        .done(function (resultado) {
            if (resultado != "Ok")
                alert("Error!!!\nNo coincide e-mail y/o password!!!");
            else
                window.location.href = "principal.php";
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
        });
        }
}

function Logout() 
{
    $.ajax({
    type: "POST",
    url: "ws/administracion.php/logout",
    dataType: "text",
    contentType: false,
    processData: false,
    async: true
	})
    .done(function (resultado) {
        if (resultado != "Ok")
            alert("Ocurrio un error al querer cerrar la sesion. ");
        else
        {
            alert("Cerrando sesion...");
            window.location.href = "index.php";
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });
}

function Listar()
{
    $.ajax({
    type: "GET",
    url: "ws/administracion.php/usuarios",
    dataType: "text",
    contentType: false,
    processData: false,
    async: true
	})
    .done(function (resultado) {

        var obj = JSON.parse(resultado);

        if (!obj.exito)
            alert("Ocurrio un problema al querer listar los usuarios.");
        else
            $("#divMensaje").html(MostrarListado(obj.usuarios));
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });
}

function TraerUsuario(id, opcion)
{
    $.ajax({
    type: "GET",
    url: "ws/administracion.php/usuario/" + id,
    dataType: "text",
    contentType: false,
    processData: false,
    async: true
	})
    .done(function (resultado) {

        var obj = JSON.parse(resultado);

        if (!obj.exito)
            alert("Ocurrio un problema al querer mostrar al usuario.");
        else
            $("#divMensaje").html(MostrarForm(obj.usuario, opcion));
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });
}

function Eliminar(id)
{
    $.ajax({
    type: "DELETE",
    url: "ws/administracion.php/usuario/" + id,
    dataType: "text",
    contentType: false,
    processData: false,
    async: true
	})
    .done(function (resultado) {

        var obj = JSON.parse(resultado);

        alert(obj.mensaje);

        if (obj.exito)
            Listar();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });
}

function Modificar(id)
{
    var nombre = $("#txtNombre").val();
	var email = $("#txtEmail").val();
    var id = $("#idUsuario").val();

    var form = new FormData();

    form.append("nombre", nombre);
	form.append("email", email);

    $.ajax({
    type: "POST",
    url: "ws/administracion.php/usuario/" + id,
    dataType: "text",
    data: form,
    contentType: false,
    processData: false,
    async: true
	})
    .done(function (resultado) {
        
        var obj = JSON.parse(resultado);

        alert(obj.mensaje);

        if (obj.exito)
            Listar();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });
}

function Alta()
{
    var nombre = $("#txtNombre").val();
	var email = $("#txtEmail").val();
    var password = $("#txtPassword").val();

    var form = new FormData();

    form.append("nombre", nombre);
	form.append("email", email);
    form.append("password", password);

    $.ajax({
    type: "POST",
    url: "ws/administracion.php/usuario",
    dataType: "text",
    data: form,
    contentType: false,
    processData: false,
    async: true
	})
    .done(function (resultado) {
        
        var obj = JSON.parse(resultado);

        alert(obj.mensaje);

        if (obj.exito)
            Listar();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });
}

function MostrarListado(usuarios)
{
    var tabla = "<br><table align = 'center'>";
        tabla += "<thead>";
            tabla += "<tr>";
                tabla += "<th>Nombre</th>";
                tabla += "<th>Email</th>";
                tabla += "<th>Accion</th>";
            tabla += "</tr>";
        tabla += "</thead>";

	for (var i = 0; i < usuarios.length; i++)
    {
        tabla += "<tr>";
            tabla += "<td>" + usuarios[i].nombre + "</td>";
            tabla += "<td>" + usuarios[i].email + "</td>";
            tabla += "<td><input type = 'button' value = 'Modificar' onclick = 'TraerUsuario(" + usuarios[i].id + ", 1)'/>";
            tabla += "<input type = 'button' value = 'Eliminar' onclick = 'TraerUsuario(" + usuarios[i].id + ", 2)'/></td>";
        tabla += "</tr>";
    }

    tabla += "</table>";

    return tabla;
}

function MostrarForm(usuario, opcion)
{
    var texto = opcion == 1? "MODIFICAR USUARIO" : "ELIMINAR USUARIO";
    var funcion = (opcion == 1? "Modificar" : "Eliminar") + "(" + usuario.id + ")"; 

    var form = "<br>Nombre:<br><input type = 'text' value = " + usuario.nombre + " id = 'txtNombre'/>";
    form += "<br>Email:<br><input type = 'text' value = " + usuario.email + " id = 'txtEmail'/>";
    form += "<input type = 'hidden' value = " + usuario.id + " id = 'idUsuario'/>";
    form += "<br><br><input type = 'button' value = '" + texto + "' onclick = '" + funcion + "'/>";

    return form;
}

function MostrarFormAlta()
{
    var form = "<br>Nombre:<br><input type = 'text' id = 'txtNombre'/>";
    form += "<br>Email:<br><input type = 'text' id = 'txtEmail'/>";
    form += "<br>Password:<br><input type = 'password' id = 'txtPassword'/>";
    form += "<br><br><input type = 'button' value = 'Alta' onclick = 'Alta()'/>";

    $("#divMensaje").html(form);
}

function ValidarCampos(email, password, nombre = 0)
{
	if (email.length == 0 || password.length < 6 || (nombre != 0 && nombre.length == 0))
		return false;
	else if (email.length >= 50 || nombre.length >= 25 || password.length >= 16)
		return false;
	return true;
}