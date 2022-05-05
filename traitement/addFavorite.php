<?php
require_once 'ressources/user.php';
if (isset ($_SESSION['user_data'])){


$favoris = new User();
if(key($_GET) === "movie"){
    $find_favoris = $favoris->findFavorite($_SESSION['user_data']['id'], $_GET['movie']);
} else if  (key($_GET) === "tv"){
    $find_favoris = $favoris->findFavorite($_SESSION['user_data']['id'], $_GET['tv']);
} else if (key($_GET) === "person"){
    $find_favoris = $favoris->findFavorite($_SESSION['user_data']['id'], $_GET['person']);
}


if ($find_favoris[0] == 0){
    $class = "out";
    if (isset($_POST['btn_favorite'])){
        $class = "in";
        $favoris = new User();
    
        if (isset($_GET['movie'])){
            $favoris->addFavorite($_SESSION['user_data']['id'], $_GET['movie'], key($_GET));  
        } else if (isset($_GET['tv'])){
            $favoris->addFavorite($_SESSION['user_data']['id'], $_GET['tv'], key($_GET));
        } else if (isset($_GET['person'])){
            $favoris->addFavorite($_SESSION['user_data']['id'], $_GET['person'], key($_GET));
            
        }
    }   
} else if ($find_favoris[0] == 1){
    $class = "in";
    if (isset($_POST['btn_favorite'])){
        $class = "out";
        $favoris = new User();
        if (isset($_GET['movie'])){
            $favoris->deleteFavorite($_SESSION['user_data']['id'], $_GET['movie'], key($_GET));  
        } else if (isset($_GET['tv'])){
            $favoris->deleteFavorite($_SESSION['user_data']['id'], $_GET['tv'], key($_GET));
        } else if (isset($_GET['person'])){
            $favoris->deleteFavorite($_SESSION['user_data']['id'], $_GET['person'], key($_GET));
        }
    }
}
}
?>