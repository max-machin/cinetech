<?php
require 'ressources/header.php';
?>
<main>
    <section class="section_user">
        <div class="wrapper">
            <div class="title_text">
                <div class="title login">Connexion</div>
                <div class="title signup">Inscription</div>
            </div>
           
            <div class="form_container">
                <div class="slide_control">
                    <input type="radio" name="slider" id="login" checked>
                    <input type="radio" name="slider" id="signup" >
                    <label for="login" class="slide login">Connexion</label>
                    <label for="signup" class="slide signup">Inscription</label>
                    <div class="slide_tab"></div>
                </div>
                <div class="form_inner">
                    <form action="traitement/traitement.php" class="login" method="post">
                        <div class="field">
                            <input type="text" placeholder="Login" name="login_login">
                        </div>
                        <div class="field">
                            <input type="password" placeholder="Mot de passe" name="password_login">
                        </div>
                        <div class="field">
                            <input type="submit" value="login" name="submit_login">
                        </div>
                        <div class="signup_link">Pas inscrit ? <a href="#">S'inscrire</a></div>
                    </form>
                    <form action="traitement/traitement.php" class="signup" method="post">
                        <div class="field">
                            <input type="text" placeholder="Login" name="login_signup">
                        </div>
                        <div class="field">
                            <input type="password" placeholder="Mot de passe" name="password_signup">
                        </div>
                        <div class="field">
                            <input type="password" placeholder="Confirmez mot de passe" name="confirm_password_signup">
                        </div>
                        <div class="field">
                            <input type="submit" value="signup" name="submit_signup">
                        </div>
                        <!-- <div class="signup_link">Pas inscrit ? <a href="#">S'inscrire</a></div> -->
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