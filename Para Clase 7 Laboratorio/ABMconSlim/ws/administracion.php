<?php

require_once "../Clases/AccesoDatos.php";
require_once "../Clases/Usuario.php";

use \Psr\Http\Message\ServerRequestInterface as Request; //alias
use \Psr\Http\Message\ResponseInterface as Response; //alias

require 'vendor/autoload.php'; //composer, referencia a slim framework

$app = new \Slim\App; //clase de slim framework

//Evitar Problema con CORS
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:8100') //La pagina donde este alojado.
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
//Fin Evitar Problemas Con CORS

$app->post('/login', function (Request $request, Response $response)
{
    $usuario = new stdclass();
    $usuario->email =  $request->getParams()["email"];
    $usuario->password =  $request->getParams()["password"];

    $usuarioLogin = Usuario::TraerUsuarioLogueado($usuario);

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

$app->get('/login/{obj}', function (Request $request, Response $response)
{

    $datos = json_decode($request->getAttribute('obj'));

    $usuario = new stdclass();
    $usuario->email =  $datos->email;
    $usuario->password =  $datos->password;

    $usuarioLogin = Usuario::TraerUsuarioLogueado($usuario);

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

$app->post('/registro', function (Request $request, Response $response)
{
    $usuario = new stdclass();
    $usuario->nombre = $request->getParams()["nombre"];
    $usuario->email =  $request->getParams()["email"];
    $usuario->password = $request->getParams()["password"];

    $resultado = new stdclass();
    $resultado->exito = false;

    $exito = Usuario::Agregar($usuario);

    if ($exito === false)
        $resultado->mensaje = "Error en el alta de usuario.";
    else
    {
        $resultado->exito = true;
        $resultado->mensaje = "Usuario registrado con exito";
        $usuario->idJugador = $exito;
        $resultado->usuario = $usuario;
    }

    $response = $response->withJson($resultado);
    return $response->withHeader('Content-type', 'application/json');
});

$app->get('/registro/{obj}', function (Request $request, Response $response)
{
    $datos = json_decode($request->getAttribute('obj'));

    $usuario = new stdclass();
    $usuario->nombre = $datos->nombre;
    $usuario->email =  $datos->email;
    $usuario->password = $datos->password;

    $resultado = new stdclass();
    $resultado->exito = false;

    $exito = Usuario::Agregar($usuario);

    if ($exito === false)
        $resultado->mensaje = "Error en el alta de usuario.";
    else
    {
        $resultado->exito = true;
        $resultado->mensaje = "Usuario registrado con exito";
        $usuario->idJugador = $exito;
        $resultado->usuario = $usuario;
    }

    $response = $response->withJson($resultado);
    return $response->withHeader('Content-type', 'application/json');
});

$app->put('/usuario/{id}', function (Request $request, Response $response)
{
    $usuarioModificar = new stdclass();
    $usuarioModificar->nombre = $request->getParams()["nombre"];
    $usuarioModificar->email = $request->getParams()["email"];
    $usuarioModificar->password = $request->getParams()["password"];
    $usuarioModificar->id = $request->getAttribute('id');

    if (!Usuario::TraerUnUsuarioPorId($usuarioModificar->id))
        $exito = false;
    else
        $exito = Usuario::Modificar($usuarioModificar);

    $response = $response->withJson($exito);
    return $response->withHeader('Content-type', 'application/json');
});

$app->get('/usuario/modificar/{obj}', function (Request $request, Response $response)
{
    $datos = json_decode($request->getAttribute('obj'));

    $usuarioModificar = new stdclass();
    $usuarioModificar->nombre = $datos->nombre;
    $usuarioModificar->email = $datos->email;
    $usuarioModificar->password = $datos->password;
    $usuarioModificar->id = $datos->id;

    if (!Usuario::TraerUnUsuarioPorId($usuarioModificar->id))
        $exito = false;
    else
        $exito = Usuario::Modificar($usuarioModificar);

    $response = $response->withJson($exito);
    return $response->withHeader('Content-type', 'application/json');
});

$app->delete('/usuario/{id}', function (Request $request, Response $response)
{
    $idEliminar = $request->getAttribute('id');

    if (!Usuario::TraerUnUsuarioPorId($idEliminar))
        $exito = false;
    else
        $exito = Usuario::Borrar($idEliminar);

    $response = $response->withJson($exito);
    return $response->withHeader('Content-type', 'application/json');
});

$app->get('/usuario/eliminar/{id}', function (Request $request, Response $response)
{
    $idEliminar = $request->getAttribute('id');

    if (!Usuario::TraerUnUsuarioPorId($idEliminar))
        $exito = false;
    else
        $exito = Usuario::Borrar($idEliminar);

    $response = $response->withJson($exito);
    return $response->withHeader('Content-type', 'application/json');
});

$app->run();