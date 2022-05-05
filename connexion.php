<?php
session_start();
require 'ressources/header.php';
require 'traitement/login.php';
?>
<main>
    <section class="section_user">
        <div class="wrapper">
            
            <div class="title login">Connexion</div>

            <div class="form_container">

                <div class="form_inner">
                    <form action="" class="login" method="post">
                        <div class="field">
                            <input type="text" placeholder="Login" name="login_login" class="login_login">
                        </div>
                        <div class="field">
                            <input type="password" placeholder="Mot de passe" name="password_login" class="password_login">
                        </div>
                        <p class="error"><?= $error ?></p>
                        <div class="field">
                            <input type="submit" value="login" name="submit_login">
                        </div>
                        <div class="signup_link">Pas inscrit ? <a href="inscription.php">S'inscrire</a></div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</main>

<?php
require 'ressources/footer.php';
?>