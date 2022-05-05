<?php
require_once 'ressources/user.php';
$error = "";
$error_reponse = "";

if (key($_GET) == "movie"){
    $type = "movie";
} else if (key($_GET) == "tv"){
    $type = "tv";
} else if (key($_GET) == "person"){
    $type = "person";
}

if (isset($_POST['submit_commentaire'])){
    if (strlen($_POST['review']) > 40){
        $commentaire = valid_data($_POST['review']);
        $user = new User();
        $user->addCommentaire($_SESSION['user_data']['id'], $_GET[$type], $commentaire, $type );

        $_POST['review'] = "";
        
    } else {
        $error = "Votre commentaire doit contenir au minimum 40 caractères";
    }
}

$comm = new User();
$comms = $comm->findCommentaire($_GET[$type], $type);


if (isset($_POST['submit_reponse_commentaire'])){
    if (!empty($_POST['review_reponse'])){
        if(isset($_SESSION['user_data'])){
            $reponse = valid_data($_POST['review_reponse']);
            $reponse_user = new User();
            $reponse_user->addReponseCommentaire( $_GET[$type], $_POST['id_comment_rep'], $_SESSION['user_data']['id'], $reponse, $type);
            $_POST['review_reponse'] = "";
            $reponse = "";
        } else {
            header('location: connexion.php');
        }
        
    }
}

$findReponse = new User();
$findReponseComm = $findReponse->findReponseCommentaire($_GET[$type] ,$type);





