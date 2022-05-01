<?php
require 'ressources/header.php';
require 'traitement/signup.php';

?>
<main>
    <section class="section_user">
            <div class="wrapper">
                <div class="title_text">
                    <div class="title login">Inscription</div>
                </div>
                <div class="form_container">
                    <div class="form_inner">
                        <form action="" class="signup" method="post" onsubmit="return verifForm()">
                            <div class="field">
                                <input type="text" placeholder="Login" name="login_signup" class="login_signup">
                                <p class="error error_login"><?= $errorLogin; ?></p>
                            </div>
                            <div class="field">
                                <input type="password" placeholder="Mot de passe" name="password_signup" class="password_signup" autocomplete="password">
                                <p class="error error_password"><?= $errorPassword; ?></p>
                            </div>
                            <div class="field">
                                <input type="password" placeholder="Confirmez mot de passe" name="confirm_password_signup" class="confirm_password_signup" autocomplete="valid_password">
                                <p class="error error_confirm_password"><?= $errorConfirmPassword; ?></p>
                            </div>
                            <div class="regex_signup">
                                <label class="password-check" for="">6 caractères</label>
                                <label class="password-check" for="">1 numéro</label>
                                <label class="password-check" for="">1 majuscule</label>
                                <label class="password-check" for="">1 minuscule</label>
                            </div>
                            <div class="error"></div>
                            <div class="field">
                                <input type="submit" value="signup" name="submit_signup" class="submit_signup">
                                
                            </div>
                            <div class="signup_link">Déjà inscrit ? <a href="connexion.php">Se connecter</a></div>
                        </form>
                    </div>
                </div>          
            </div>
    </section>
</main>
<script src="js/user.js"></script>
<?php
require 'ressources/footer.php';
?>