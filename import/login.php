<?php
session_start();
require_once '../Classes/Users.php';

if (isset($_POST['login'])) {
    $login = htmlspecialchars($_POST['login']);
    $password = htmlspecialchars($_POST['password']);

    if (!empty($login) && !empty($password)) {
        $user = new Users();
        if ($user->connectUser($login, $password)) {
            header('Content-Type: application/json');
            echo json_encode(['status' => 'success']);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['status' => 'error']);
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'empty']);
    }
    // Ajouter un die() pour éviter que le script continue de s'exécuter
    die();
}
?>

<form action="" method="post" id="login_form">
    <div class="flex flex-col space-y-2">
        <div id="wapperForm" class="flex flex-col">
            <label for="login">Login</label>
            <input type="text" name="login" id="login"
                   placeholder="Login" class="p-2 bg-slate-200">
        </div>
        <div id="wapperForm" class="flex flex-col">
            <label for="password">Mot de passe</label>
            <input type="password" name="password" id="password"
                   placeholder="Mot de passe" class="p-2 bg-slate-200">
        </div>
        <div id="errorMsg"></div>
        <div id="wapperForm">
            <button type="submit" name="login" id="login"
                    class="bg-purple-300 border-2 border-purple-400 p-2">
                Se connecter
            </button>
        </div>
    </div>
