<?php
session_start();
require "traitement/userProfil.php";
require 'ressources/header.php';

?>

<main>
    <section class="user_profil_favoris">
        <div class="scroll_bloc hover">
            <h2>Vos films favoris <i class="fa-solid fa-star"></i></h2>
            <article class="scroll_container favoris_movie_user">
                <?php
                foreach($user_favoris_movie as $movie){
                    ?>
                        <div>
                            <input type="hidden" value="<?= $movie['id_favoris'] ?>" name="movie_id" class="movie_id">
                        </div>
                    <?php
                }
                ?>
            </article>
        </div>
        <div class="scroll_bloc hover">
            <h2>Vos séries favoris <i class="fa-solid fa-star"></i></h2>
            <article class="scroll_container favoris_tv_user">
                <?php
                foreach($user_favoris_tv as $tv){
                    ?>
                        <div>
                            <input type="hidden" value="<?= $tv['id_favoris'] ?>" name="tv_id" class="tv_id">
                        </div>
                    <?php
                }
                ?>
            </article>
        </div>
        <div class="scroll_bloc hover">
            <h2>Vos artistes favoris <i class="fa-solid fa-star"></i></h2>
            <article class="scroll_container favoris_person_user">
                <?php
                foreach($user_favoris_person as $person){
                    ?>
                        <div>
                            <input type="hidden" value="<?= $person['id_favoris'] ?>" name="person_id" class="person_id">
                        </div>
                    <?php
                }
                ?>
            </article>
        </div>
    </section>
    
</main>

<script src="js/profil.js" type="text/javascript"></script>
<?php
require 'ressources/footer.php';
?>