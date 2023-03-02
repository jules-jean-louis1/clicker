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
    <link rel="stylesheet" href="style/style.css">
    <!--Tailwinds-->
    <script src="https://cdn.tailwindcss.com"></script>
    <!--JavaScript-->
<!--    <script defer src="script/clicker.js"></script>-->
    <script defer src="script/clickerv3.js"></script>
    <script src="https://kit.fontawesome.com/8b26d30613.js" crossorigin="anonymous"></script>
    <title>Clicker</title>
</head>
<body>
<?php include 'import/header.php'; ?>
    <main>
        <article>
            <section class="flex justify-center lg:mx-8">
                <div class="container lg:pt-[4%]">
                    <div class="flex justify-center">
                        <h1>Clicker Game</h1>
                    </div>
                    <div class="flex flex-col justify-center space-y-3"><h2>
                            <span id="click-count" class="flex justify-center text-red-600 font-bold">0</span>
                        </h2>
                        <button id="clicker-btn" class="p-2 rounded-lg bg-purple-500 uppercase font-bold text-2xl text-[#fff]">Clicker Ici!</button>
                        <button id="reset-btn" class="p-2 rounded-lg bg-red-500">Reset</button>
                        <h2>
                            Clicks par secondes : <span id="click-rate">0</span>
                        </h2>
                    </div>
                    <div id="shop">
                        <h2>Level</h2>
                        <div id="levels-container"></div>
                    </div>
                </div>
            </section>
        </article>
    </main>
</body>
</html>

