<?php
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style/style.css">
    <!--Tailwinds-->
    <script src="https://cdn.tailwindcss.com"></script>
    <!--JavaScript-->
    <script defer src="script/loginregister.js"></script>
    <script src="https://kit.fontawesome.com/8b26d30613.js" crossorigin="anonymous"></script>
    <title>Clicker</title>
</head>
<body>
<main>
    <?php include 'import/header.php' ?>
    <article>
        <section>
            <div id="containerFormBtn">
                <button id="RegisterBtn" class="bg-green-300 p-2">Inscription</button>
            </div>
            <div id="displayFrom"></div>
        </section>
    </article>
</main>
</body>
</html>