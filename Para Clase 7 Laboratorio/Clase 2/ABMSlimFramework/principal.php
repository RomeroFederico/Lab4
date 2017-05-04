<?php
	
	session_start();

	if (!isset($_SESSION["Usuario"]))
		header("location:index.php");

    $usuario = json_decode($_SESSION["Usuario"]);

    echo "<h3 align = 'center'>Bienvenido " . $usuario->nombre . "</h3>";
	
?>

<html>

    <head>
	<title>Principal</title>
	  
        <meta charset="UTF-8">
 		<script type="text/javascript" src = "js/AJAX/jquery.js"></script>
		<script type="text/javascript" src = "js/Funciones.js"></script>

    </head>
    <body align = 'center'>
        <br>
        <input type = "button" value = "ALTA" onclick = "MostrarFormAlta()"/>
        <input type = "button" value = "LISTADO" onclick = "Listar()"/>
        <input type = "button" value = "MODIFICAR" onclick = "TraerUsuario(<?php echo $usuario->id?>, 1)"/>

        <br>
        <div id = "divMensaje">
        </div>

        <br>
        <br>
        <input type = "button" value = "SALIR" onclick = "Logout()"/>
    </body>
</html>