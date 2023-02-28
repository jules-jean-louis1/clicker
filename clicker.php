<?php
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <!--Tailwinds-->
    <script src="https://cdn.tailwindcss.com"></script>
    <!--JavaScript-->
    <script defer src="script/clicker.js"></script>
    <script src="https://kit.fontawesome.com/8b26d30613.js" crossorigin="anonymous"></script>
    <title>Clicker</title>
</head>
<body>
    <main>
        <article>
            <section>
                <button id="clickButton" class="p-2 bg-red-100">Cliquer ici</button>
                <div id="score">0</div>
                <div id="levelButtonsContainer"></div>
            </section>
        </article>
    </main>
</body>
</html>

