<?php
	
	session_start();

	if (isset($_SESSION["Usuario"]))
		header("location:principal.php");
	
?>

<html>

    <head>
	<title>Login</title>
	  
        <meta charset="UTF-8">
 		<script type="text/javascript" src = "js/AJAX/jquery.js"></script>
		<script type="text/javascript" src = "js/Funciones.js"></script>

    </head>

    Email: 
	<input type = "text" name = "txtEmail" id = "email"/>
	<br>Password: 
	<input type = "password" name = "txtPassword" id = "password"/>

    <input type = "button" value = "LOGIN" onclick = "Login()"/>

</html>      