<?php
?>

<form action="" method="post" id="register_form">
    <div class="flex flex-col space-y-2">
        <div id="wapperForm" class="flex flex-col">
            <label for="login">Login</label>
            <input type="text" name="login" id="login" placeholder="Login"></div>
        <div id="wapperForm">
            <label for="password">Mot de passe</label>
            <input type="password" name="password" id="password" placeholder="Mot de passe"></div>
        <div id="wapperForm">
            <label for="password_confirm">Confirmation du mot de passe</label>
            <input type="password" name="password_confirm" id="password_confirm"
                   placeholder="Confirmation du mot de passe">
        </div>
        <div id="errorMsg"></div>
        <div id="wapperForm">
            <button type="submit" name="register" id="register">S'inscrire</button>
        </div>
    </div>
</form>
