<?php
require 'ressources/header.php'
?>
<main>
    
    <h1 class="gen_title">Les séries</h1>

    
    <div class="categories">

    </div>
    
    <div class="grid_contain">
        <div class="search_cat">

        </div>
    </div>

    <section class="container">
        <div class="scroll_bloc hover">
            <h2>Les séries populaires <i class="fa-solid fa-arrow-trend-up"></i></h2>
            <article class="scroll_container popular_serie"></article>
        </div>

        <div class="scroll_bloc hover">
            <h2>Les mieux notées <i class="fa-solid fa-star"></i></h2>
            <article class="scroll_container top_rated_serie"></article>
        </div>

        <div class="scroll_bloc hover">
            <h2>Les séries en cours de diffusion <i class="fa-solid fa-tv"></i></h2>
            <article class="scroll_container now_playing_serie"></article>
        </div>

        <div class="scroll_bloc hover">
            <h2>Les séries diffusées aujourd'hui <i class="fa-solid fa-calendar-day"></i></h2>
            <article class="scroll_container upcoming_serie"></article>
        </div>
    </section>
    
</main>

<script src="js/series.js" type="module"></script>
<?php
require 'ressources/footer.php'
?>