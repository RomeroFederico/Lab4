<?php

require_once "../Clases/AccesoDatos.php";
require_once "../Clases/Usuario.php";

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

$app = new \Slim\App;

$app->post('/login', function (Request $request, Response $response)
{
    $usuario = new stdclass();
    $usuario->nombre =  $request->getParams()["nombre"];

    $usuarioLogin = Usuario::TraerUsuarioLogueado($usuario);

    if (!$usuarioLogin)
        $exito = false;
    else
        $exito = true;

        $resultado = new stdClass();
    $resultado->exito = false;

    if ($usuarioLogin == false)
        $resultado->mensaje = "No se encontro el usuario ingresado.";
    else
    {
        $resultado->exito = true;
        $resultado->usuario = $usuarioLogin;
    }

    $response = $response->withJson($resultado);
    return $response->withHeader('Content-type', 'application/json');
});

$app->post('/registro', function (Request $request, Response $response)
{
    $usuario = new stdclass();
    $usuario->nombre =  $request->getParams()["nombre"];

    $usuarioLogin = Usuario::TraerUsuarioLogueado($usuario);

    $resultado = new stdclass();
    $resultado->exito = false;

    if (!$usuarioLogin)
    {
        $usuarioAlta = new stdclass();
        $usuarioAlta->nombre =  $request->getParams()["nombre"];
        $usuarioAlta->puntaje = 0;
        $usuarioAlta->partidasJugadas = 0;
        $usuarioAlta->respCorrectas = 0;
        $usuarioAlta->respIncorrectas = 0;
        $usuarioAlta->imagen = null;
        
        if (!Usuario::Agregar($usuarioAlta))
            $resultado->mensaje = "Error en el alta de usuario.";
        else
        {
            $resultado->exito = true;
            $resultado->mensaje = "Usuario registrado con exito";
        }
    }
    else
        $resultado->mensaje = "Ya se ha ingresado un usuario con el nombre indicado.";

    $response = $response->withJson($resultado);
    return $response->withHeader('Content-type', 'application/json');
});

$app->get('/usuario/{id}', function (Request $request, Response $response)
{
    $id = $request->getAttribute('id');

    $usuario = Usuario::TraerUnUsuarioPorId($id);

    $response = $response->withJson($usuario);
    return $response->withHeader('Content-type', 'application/json');
});

$app->get('/usuarios', function (Request $request, Response $response)
{
    $usuarios = Usuario::TraerTodosLosUsuarios();

    if (count($usuarios) < 1)
        $usuarios = false;

    $response = $response->withJson($usuarios);

     return $response->withHeader('Content-type', 'application/json');
});

$app->post('/usuario', function (Request $request, Response $response)
{
    $usuario = new stdclass();
    $usuario->nombre = $request->getParams()["nombre"];

    $exito = Usuario::Agregar($usuario);

    $response = $response->withJson($exito);
    return $response->withHeader('Content-type', 'application/json');
});

$app->put('/usuario/{id}', function (Request $request, Response $response)
{
    $usuarioModificar = new stdclass();
    $usuarioModificar->nombre = $request->getParams()["nombre"];
    $usuarioModificar->puntaje = $request->getParams()["puntaje"];
    $usuarioModificar->partidasJugadas = $request->getParams()["partidas_jugadas"];
    $usuarioModificar->respCorrectas = $request->getParams()["resp_correctas"];
    $usuarioModificar->respIncorrectas = $request->getParams()["resp_incorrectas"];
    $usuarioModificar->imagen = $request->getParams()["imagen"];
    $usuarioModificar->idJugador = $request->getAttribute('id');

    if (!Usuario::TraerUnUsuarioPorId($usuarioModificar->idJugador))
        $exito = false;
    else
        $exito = Usuario::Modificar($usuarioModificar);

    $response = $response->withJson($exito);
    return $response->withHeader('Content-type', 'application/json');
});

$app->run();