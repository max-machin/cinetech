<?php
require 'ressources/header.php';
if($_GET['search'] == ""){
    header('location: index.php');
}
?>
<main>
    <section class="search_section">
        <input type="hidden" value="<?=  $_GET['search']?>" id="searchTerm">
        <div class="res_search">
            <h1 class="number_result">Résulats pour : <?= $_GET['search']?></h1>
        </div>
        <h2 class="title_div">Les films</h2>
        <div class="grid_contain">
            <div class="search_cat_movie">
            </div>
        </div>

        <div class="pagination">
            <div class="prev disabled pr"><i class="fa-solid fa-angle-left"></i></div>
            <div class="current cu"></div>
            <div class="next ne"><i class="fa-solid fa-angle-right"></i></div>
        </div>


        <h2 class="title_div">Les séries</h2>
        <div class="grid_contain">
            <div class="search_cat_tv">
            </div>
        </div>

        <div class="pagination">
            <div class="prev_tv disabled_tv pr"><i class="fa-solid fa-angle-left"></i></div>
            <div class="current_tv cu"></div>
            <div class="next_tv ne"><i class="fa-solid fa-angle-right"></i></div>
        </div>
    </section>
</main>
<script src="js/search.js"></script>
<?php
require 'ressources/footer.php'
?>