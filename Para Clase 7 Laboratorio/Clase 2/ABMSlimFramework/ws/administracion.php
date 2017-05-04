<?php

require_once "../Clases/AccesoDatos.php";
require_once "../Clases/Usuario.php";

use \Psr\Http\Message\ServerRequestInterface as Request; //alias
use \Psr\Http\Message\ResponseInterface as Response; //alias

require 'vendor/autoload.php'; //composer, referencia a slim framework

$app = new \Slim\App; //clase de slim framework

$app->post('/login', function (Request $request, Response $response)
{
    //$usuario = json_decode(json_encode($request->getParams('nombre')));

    $usuario = new stdclass();
    $usuario->email =  $request->getParams()["email"];
    $usuario->password =  $request->getParams()["password"];

    $usuarioLogin = Usuario::TraerUsuarioLogueado($usuario);

    if (!$usuarioLogin)
         $mensaje = "Error";
    else
    {
        $mensaje = "Ok";

        session_start();

		$_SESSION["Usuario"] = json_encode($usuarioLogin);
    }

    $response->getBody()->write("$mensaje");
    return $response;
});

$app->post('/logout', function (Request $request, Response $response)
{
    session_start();

    if (isset($_SESSION["Usuario"]))
    {
        session_unset();
        $mensaje = "Ok";
    }
     else
        $mensaje = "No Ok";

    $response->getBody()->write("$mensaje");
    return $response;    
});

$app->get('/usuario/{id}', function (Request $request, Response $response)
{
    $id = $request->getAttribute('id');

    $resultado = new stdclass();
    $resultado->usuario = Usuario::TraerUnUsuarioPorId($id);

    if (!$resultado->usuario)
        $resultado->exito = false;
    else                 
        $resultado->exito = true;

    $response->getBody()->write(json_encode($resultado));
    return $response;
});

$app->get('/usuarios', function (Request $request, Response $response)
{
    $resultado = new stdclass();
    $resultado->usuarios = Usuario::TraerTodosLosUsuarios();

    if (count($resultado->usuarios) < 1)
        $resultado->exito = false;
    else                 
        $resultado->exito = true;

    $response->getBody()->write(json_encode($resultado));
    return $response;
});

$app->post('/usuario', function (Request $request, Response $response)
{
    //$usuario = json_decode(json_encode($request->getParams('nombre')));

    $usuario = new stdclass();
    $usuario->nombre = $request->getParams()["nombre"];
    $usuario->email =  $request->getParams()["email"];
    $usuario->password = $request->getParams()["password"];

    $resultado = new stdclass();
    $resultado->exito = Usuario::Agregar($usuario);
    
    if (!$resultado->exito)
         $resultado->mensaje = "No se pudo dar de alta al usuario";
    else
         $resultado->mensaje = "Exito al realizar el alta";

    $response->getBody()->write(json_encode($resultado));

    return $response;
});

$app->put('/usuario/{id}', function (Request $request, Response $response)
{
    $usuarioModificar = new stdclass();
    $usuarioModificar->nombre = $request->getParams()["nombre"];
    $usuarioModificar->email = $request->getParams()["email"];
    $usuarioModificar->id = $request->getAttribute('id');

    $resultado = new stdclass();
    $resultado->exito = false;

    if (!Usuario::TraerUnUsuarioPorId($usuarioModificar->id))
        $resultado->mensaje = "No existe el usuario";
    else
    {
        $resultado->exito = Usuario::Modificar($usuarioModificar);

        if (!$resultado->exito)
            $resultado->mensaje = "No se pudo modificar al usuario";
        else
            $resultado->mensaje = "Exito al realizarla modicacion";
    }

    $response->getBody()->write(json_encode($resultado));
    return $response;
});

$app->post('/usuario/{id}', function (Request $request, Response $response)
{
    $usuarioModificar = new stdclass();
    $usuarioModificar->nombre = $request->getParams()["nombre"];
    $usuarioModificar->email = $request->getParams()["email"];
    $usuarioModificar->id = $request->getAttribute('id');

    $resultado = new stdclass();
    $resultado->exito = false;

    if (!Usuario::TraerUnUsuarioPorId($usuarioModificar->id))
        $resultado->mensaje = "No existe el usuario";
    else
    {
        $resultado->exito = Usuario::Modificar($usuarioModificar);

        if (!$resultado->exito)
            $resultado->mensaje = "No se pudo modificar al usuario";
        else
            $resultado->mensaje = "Exito al realizarla modicacion";
    }

    $response->getBody()->write(json_encode($resultado));
    return $response;
});

$app->delete('/usuario/{id}', function (Request $request, Response $response)
{
    $idEliminar = $request->getAttribute('id');

    $resultado = new stdclass();
    $resultado->exito = false;

    if (!Usuario::TraerUnUsuarioPorId($idEliminar))
        $resultado->mensaje = "No existe el usuario";
    else
    {
        $resultado->exito = Usuario::Borrar($idEliminar);

        if (!$resultado->exito)
            $resultado->mensaje = "No se pudo eliminar al usuario";
        else
            $resultado->mensaje = "Exito al eliminar al usuario";
    }

    $response->getBody()->write(json_encode($resultado));
    return $response;
});

$app->get('/hello[/]', function (Request $request, Response $response)
{ // Parametro opcional -> []
    $response->getBody()->write("hola mundo 2");
    return $response;
});

$app->run();