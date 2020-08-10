<?php 

require "db.php";

R::setup( 'mysql:host=localhost;dbname=analytictables', 'admin', 'gaepeY7Mu8ee');

if ( !R::testConnection() )
{
        exit ('Нет соединения с базой данных');
}
?>