<?php
require_once '../Classes/Users.php';

if (isset($_POST['login'])) {
    $login = htmlspecialchars($_POST['login']);
    $password = htmlspecialchars($_POST['password']);
    $password_confirm = htmlspecialchars($_POST['password_confirm']);

    if (!empty($login) && !empty($password) && !empty($password_confirm)) {
        $user = new Users();
        if ($user->checkLogin($login)) {
            header('Content-Type: application/json');
            echo json_encode(['status' => 'loginExist']);
        } else {
            if ($password === $password_confirm) {
                $password = password_hash($password, PASSWORD_DEFAULT);
                $user->addUser($login, $password);
                header('Content-Type: application/json');
                echo json_encode(['status' => 'success']);
            } else {
                header('Content-Type: application/json');
                echo json_encode(['status' => 'passwordNotMatch']);
            }
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'empty']);
    }
    // Ajouter un die() pour éviter que le script continue de s'exécuter
    die();
}
?>

<form action="" method="post" id="register_form">
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
        <div id="wapperForm" class="flex flex-col">
            <label for="password_confirm">Confirmation du mot de passe</label>
            <input type="password" name="password_confirm" id="password_confirm"
                   placeholder="Confirmation du mot de passe" class="p-2 bg-slate-200">
        </div>
        <div id="errorMsg"></div>
        <div id="wapperForm">
            <button type="submit" name="register" id="register"
                    class="bg-green-300 border-2 border-green-400 p-2">
                S'inscrire
            </button>
        </div>
    </div>
</form>
