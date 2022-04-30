<?php
require 'ressources/header.php';
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
                    
    <div class="scroll_bloc recom hover">
        <h2>Similaires <i class="fa-solid fa-link"></i></h2>
        <article class="scroll_container recommendations"></article>
    </div>

    
    </section>
</main>


<script src="js/detail.js" type="module"></script>
<?php
require 'ressources/footer.php'
?>