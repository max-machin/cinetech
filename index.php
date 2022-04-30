<?php
require 'ressources/header.php'
?>

<main>
    <section class="banner_section">
        <a href="films.php">
        <div class="banner-container">
            <div class="banner ban_mov">
                <h1 class="banner-title">Le côté film, <br>ne manquez rien du cinéma</h1>
                <div class="image-block_movie"></div>
            </div>
        </div>
        </a>
        <a href="series.php">
        <div class="banner-container">
            <div class="banner ban_tv">
                <h1 class="banner-title">Le côté série,<br>toute vos séries TV</h1>
                <div class="image-block_tv"></div>
            </div>
        </div>
        </a>
    </section>
    
  
  

    <section class="container">

        <div class="scroll_bloc hover">
            <h2>Les films populaires <i class="fa-solid fa-arrow-trend-up"></i></h2>
            <article class="scroll_container popular_movie"></article>
        </div>

        <div class="scroll_bloc hover">
            <h2>Les Séries populaires <i class="fa-solid fa-arrow-trend-up"></i></h2>
            <article class="scroll_container popular_tv"></article>
        </div>

        <div class="scroll_bloc hover">
            <h2>Les films les mieux notés <i class="fa-solid fa-star"></i></h2>
            <article class="scroll_container top_rated_movie"></article>
        </div>

        <div class="scroll_bloc hover">
            <h2>Les Séries les mieux notées <i class="fa-solid fa-star"></i></h2>
            <article class="scroll_container top_rated_series"></article>
        </div>

        <div class="scroll_bloc hover">
            <h2>Les artistes du moment <i class="fa-solid fa-fire"></i></h2>
            <article class="scroll_container popular_person"></article>
        </div>

        
    </section>
</main>



<script src="js/index.js" type="module"></script>
<?php
require 'ressources/footer.php'
?>