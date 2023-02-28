<?php
?>

<header>
    <div id="containerNav" class="flex justify-between mx-8 p-3">
        <div id="logohere">
            <a href="index.php"><img src="" alt="logo"></a>
        </div>
        <div id="navhere">
            <?php if (isset($_SESSION['login']) != null) : ?>
            <nav>
                <ul class="flex space-x-2">
                    <li>
                        <a href="clicker.php">Clicker</a>
                    </li>
                    <li>
                        <a href="contact.php"><?= $_SESSION['login']?></a>
                    </li>
                    <li>
                        <a href="disconnect.php">Deconnexion</a>
                    </li>
                </ul>
            </nav>
            <?php else : ?>
            <nav>
                <ul class="flex space-x-2">
                    <li>
                        <a href="clicker.php">Clicker</a>
                    </li>
                    <li>
                        <a href="login.php">Connexion</a>
                    </li>
                    <li>
                        <a href="register.php">Inscription</a>
                    </li>
                </ul>
            </nav>
            <?php endif; ?>
        </div>
    </div>
</header>
