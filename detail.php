<?php
session_start();
require 'ressources/header.php';
require 'traitement/addFavorite.php';
require 'traitement/commentaire.php';

if (array_key_exists('movie', $_GET) || array_key_exists('tv', $_GET) || array_key_exists('person', $_GET)) {
?>
 
<main>
    <section class="container">
        <section class="movie_info">
            <div class="movie_detail">
                <h1 class="movie_name">movie name</h1>
                <div class="run_rate">
                    <p class="runtime"></p>
                    <p class="rate">
                        <?php
                            for ($i = 0; $i < 10; $i++){
                                echo '<i class="fa-solid fa-star icon"></i>';
                            }
                        ?>
                    </p>
                </div>
                
                <p class="genres">2021 | comedy</p> 
                <p class="des">Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor sit amet, consectetur adip</p>
                <p class="creator"></p>
                <p class="rea"><span>Réalisateurs : </span></p>
                
                <p class="country_prod"><span>Pays de production : </span></p>
                <p class="networks"></p>
                <?php
                if (isset($_SESSION['user_data'])){
                ?>
                <form method="post">
                    <?php 
                        if(array_key_exists('movie', $_GET)){
                            ?>
                                <input type="hidden" value="<?= $_GET['movie']?>" name="movie_id" >
                            <?php
                        } elseif(array_key_exists('tv', $_GET)){
                            ?>
                                <input type="hidden" value="<?= $_GET['tv']?>" name="tv_id" >
                            <?php
                        }
                    ?>
                    <button name="btn_favorite" class="btn_favorite <?= $class ?> movie_tv_favorite" type="submit"><i class="fa-solid fa-star"></i> Favoris</button>
                </form>
                <?php
                }   
                ?>

            </div>
        </section>
        
        <div class="scroll_bloc casting">
            <h2>Casting</h2>
            <article class="scroll_container casting_content"></article>
        </div>
        </section>

        <div class="trailer_container hover">
            <h2 class="heading">Vidéos</h2>
        </div>

        <?php
        if(key($_GET) == 'movie' || key($_GET) == 'tv'){
        ?>
        <section class="section_review">
            <h2 class="heading">Les avis</h2>
            <div class="reviews_container hover"> 
                <?php
                    foreach ($comms as $comm){
                        
                        // $display = "none";
                        ?>
                            <div class="review">
                                <input name="id_comm" class="id_comm" type="hidden" value="<?= $comm['id_comm'] ?>">
                                <?php
                                if(isset($_SESSION['user_data'])){
                                    
                                    if($comm['id_user'] == $_SESSION['user_data']['id']){
                                        ?>
                                        
                                        <p><span>Posté par : </span> <?= $comm['login'] ?> <b class="self_comment">you</b></p>
                                        <?php
                                    }
                                } else {
                                        ?>
                                        <p><span>Posté par : </span> <?= $comm['login'] ?></p>
                                        <?php
                                }
                                ?>
                                
                                <p><span>Le : </span><?= $comm['date']?> à <?= $comm['heure']?></p>
                                <p><?= $comm['commentaire'] ?></p>
                                <?php
                        foreach($findReponseComm as $reponse_com){

                            if ($comm['id_comm'] == $reponse_com['id_comm']){
                                ?>
                                <div class="reponse_comm">
                                    <input type="hidden" class="id_reponse_comment" name="id_reponse_comment" value="<?= $reponse_com['id_comm'] ?>">
                                    <p>Posté par : <?= $reponse_com['login'] ?></p>
                                    <p>Le : <?= $reponse_com['date'] ?> à <?= $reponse_com['heure'] ?></p>
                                    <p><?= $reponse_com['reponse'] ?></p>
                                    
                                </div>
                                <?php
                            }
                                
                            // if($comm['id_comm'] == $reponse_com['id_com']){
                            //     echo "wow";
                            // }
                        }
                        ?>
                            </div>
                       
                        <?php
                    }
                    
                ?>
            </div>
        </section>
        <form action="" method="post" class="review_form">
            <h2>Laisser votre avis</h2>
            <textarea name="review" id="" rows="7" placeholder="Votre commentaire"></textarea>
            <br/>
            <p><?= $error?></p>
            <input type="submit" value="Poster" name="submit_commentaire">
        </form>
        <?php
        }
        ?>     

        <div class="scroll_bloc recom hover">
            <h2>Similaires <i class="fa-solid fa-link"></i></h2>
            <article class="scroll_container recommendations"></article>
        </div>

        <section class="person_info">
            <article class="container_person">
                <div class="image_profil"></div>
                <div class="content_profil">
                    <?php
                    if(!isset($_SESSION['user_data'])){
                    ?>
                    <h2 class="person_name"></h2>
                    <?php
                    }
                    if (isset($_SESSION['user_data'])){
                    ?>
                    <form class="person_name_add" method="post">
                    <h2 class="person_name"></h2>
                        <?php 
                            if(array_key_exists('person', $_GET)){
                                ?>
                                    <input type="hidden" value="<?= $_GET['person']?>" name="person_id" >
                                <?php
                            } 
                        ?>
                        <button name="btn_favorite" class="btn_favorite <?= $class ?>" type="submit"><i class="fa-solid fa-star"></i> Favoris</button>
                    </form>
                    <?php
                    }   
                    ?>
                    <p class="popularity"></p>
                    <p class="biography"></p>
                    <p class="birthday birth"></p>                  
                    <p class="deathday birth"></p>
                    <p class="place_birth birth"></p>
                    
                </div>
            </article>
            <div class="role_person">
                <h2 class="appear">Apparitions</h2>
                <div class="apparition_movie">
                    <h2>Films</h2>
                    <div class="apparition_movie_content search_cat" id="movie_person"></div>
                </div>
                <div class="apparition_tv">
                    <h2>Séries</h2>
                    <div class="apparition_tv_content search_cat" id="series_person"></div>
                </div>
            </div>
        </section>
    </section>
</main>


<script src="js/detail.js" type="module"></script>

<?php
} else {
    header('location: index.php');
}
require 'ressources/footer.php'
?>