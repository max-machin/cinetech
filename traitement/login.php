<?php
require 'ressources/user.php';
$error = "";
if (isset($_POST['submit_login'])){
    if (!empty($_POST['login_login'])){
        if(!empty($_POST['password_login'])){

            $login = valid_data($_POST['login_login']);
            $password = valid_data($_POST['password_login']); 

            $user = new User();
            $data = $user->VerifDataUser($login);
            if(!empty($data)){
                if (password_verify($password, $data[0]['password'])){
                    $user->Connect($login);
                }
                else { 
                    $error = "Mot de passe ou login incorrect";
                }
            } else {
                $error = "Mot de passe ou login incorrect";
            }

        } else {
            $error = "Mot de passe vide";
        }
    } else {
        $error = "Login vide";
    }
}

?>