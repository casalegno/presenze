<?php
if (session_status() !== PHP_SESSION_ACTIVE)
session_start();
// Includi il file wp-load.php per avere accesso alle funzionalità di WordPress
require_once('../wp-load.php');

//bypasso il controllo di login per la fase di test
$_SESSION["loggedIn"] = true;


// Verifica se l'utente è autenticato in WordPress
if (!is_user_logged_in()) {    
    header('Location:https://realkombatsystem.it/wp-login.php?redirect_to=presenze');
}
if( !current_user_can('editor') && !current_user_can('administrator')){
    //header('Location:https://realkombatsystem.it/');
    die('Accesso non consentito!');
}

$_SESSION["loggedIn"] = true;

    // setcookie('lg', 'ro');
    // $_COOKIE['lg'] = 'ro';
