<?php
    class Resultado 
    {
        public $idJugador;
        public $fecha;
        public $puntaje;

        public function __construct()
        {
        }

        public static function TraerResultados()
        {
            $resultados = array();

            $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT j.nombre AS nombre, j.imagen AS imagen , r.puntaje AS puntaje , r.fecha AS fecha 
                                                              FROM resultados AS r, jugadores AS j 
                                                              WHERE j.idJugador = r.idJugador 
                                                              ORDER BY fecha DESC LIMIT 10;");

            $consulta->execute();

            $consulta->setFetchMode(PDO::FETCH_ASSOC|PDO::FETCH_PROPS_LATE);

            foreach ($consulta as $resultado)
                array_push($resultados, $resultado);

            return $resultados;
        }

        public static function TraerUltimoResultadoDeJugador($idJugador)
        {
            $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();

            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT * FROM resultados WHERE idJugador = :IdJugador ORDER BY fecha DESC LIMIT 1;");

            $consulta->bindValue(':IdJugador', $idJugador, PDO::PARAM_INT);

            $consulta->execute();

            if ($consulta->rowCount() != 1)
                return false;

            return $consulta->fetchObject('Resultado');
        }

        public static function AgregarResultado($obj)
        {
            try
            {
                $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();

                $consulta = $objetoAccesoDatos->RetornarConsulta("INSERT INTO resultados (idJugador, puntaje, fecha) 
                                                 VALUES (:IdJugador, :Puntaje, :Fecha)");

                //$consulta->bindValue(':Id', $obj->id, PDO::PARAM_INT);
                $consulta->bindValue(':IdJugador', $obj->idJugador, PDO::PARAM_STR);
                $consulta->bindValue(':Puntaje', $obj->puntaje, PDO::PARAM_INT);
                $consulta->bindValue(':Fecha', $obj->fecha, PDO::PARAM_STR);

                $consulta->execute();
            }
            catch (Exception $e) 
            {
                return FALSE;
            }

            return true;
        }
    }

?>