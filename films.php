<?php
session_start();
require 'ressources/header.php'
?>
<main>
    
    <h1 class="gen_title">Les films</h1>

    <div class="categories">

    </div>
    
    <div class="grid_contain">
        <div class="search_cat">

        </div>
    </div>
    

    <section class="container">
        <div class="scroll_bloc hover">
            <h2>Les films populaires <i class="fa-solid fa-arrow-trend-up"></i></h2>
            <article class="scroll_container popular_movie"></article>
        </div>

        <div class="scroll_bloc hover">
            <h2>Les mieux notés <i class="fa-solid fa-star"></i></h2>
            <article class="scroll_container top_rated_movie"></article>
        </div>

        <div class="scroll_bloc hover">
            <h2>Les films du moment <i class="fa-solid fa-clock-rotate-left"></i></h2>
            <article class="scroll_container now_playing_movie"></article>
        </div>

        <div class="scroll_bloc hover">
            <h2>Les films à venir <i class="fa-solid fa-hourglass"></i></h2>
            <article class="scroll_container upcoming_movie"></article>
        </div>
    </section>
    
</main>

<script src="js/films.js" type="module"></script>
<?php
require 'ressources/footer.php'
?>