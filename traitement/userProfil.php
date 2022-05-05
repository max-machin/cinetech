<?php
require 'ressources/user.php';

$favoris = new User();

$movie = "movie";

$user_favoris_movie =  $favoris->findFavorites($_SESSION['user_data']['id'], $movie);

if (isset ($_POST['delete_favoris_movie'])){
    $delete_favoris = new User();
    $delete_user_favoris_movie = $delete_favoris->deleteFavorite($_SESSION['user_data']['id'], $_POST['id_movie_favoris']);
    header("refresh: 0");
}

$tv = "tv";

$user_favoris_tv =  $favoris->findFavorites($_SESSION['user_data']['id'], $tv);

if (isset ($_POST['delete_favoris_tv'])){
    $delete_favoris = new User();
    $delete_user_favoris_tv = $delete_favoris->deleteFavorite($_SESSION['user_data']['id'], $_POST['id_tv_favoris']);
    header("refresh: 0");
}

$person = "person";

$user_favoris_person =  $favoris->findFavorites($_SESSION['user_data']['id'], $person);

if (isset ($_POST['delete_favoris_person'])){
    $delete_favoris = new User();
    $delete_user_favoris_person = $delete_favoris->deleteFavorite($_SESSION['user_data']['id'], $_POST['id_person_favoris']);
    header("refresh: 0");
}


?>