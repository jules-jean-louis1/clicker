<?php
session_start();
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
<!--    <script defer src="script/clicker.js"></script>-->
    <script defer src="script/clickerv2.js"></script>
    <script src="https://kit.fontawesome.com/8b26d30613.js" crossorigin="anonymous"></script>
    <title>Clicker</title>
</head>
<body>
<?php include 'import/header.php'; ?>
    <main>
        <article>
            <section>
                <div class="container">
                    <h1>Clicker Game</h1>
                    <h2>Click : <span id="click-count">0</span></h2>
                    <button id="clicker-btn">Clicker</button>
                    <div id="shop">
                        <h2>Shop</h2>
                        <div id="levels-container"></div>
                    </div>
                    <h2>Clicks per second : <span id="click-rate">0</span></h2>
                </div>
            </section>
        </article>
    </main>
</body>
</html>

