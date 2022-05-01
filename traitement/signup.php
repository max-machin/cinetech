<?php
require 'ressources/user.php';

$errorLogin = "";
$errorPassword = "";
$errorConfirmPassword = "";
if (isset($_POST['submit_signup'])){
    if(!empty($_POST['login_signup'])){

        if (strlen($_POST['login_signup']) >= 5){
            
            if (!empty($_POST['password_signup'])){

                if (strlen($_POST['password_signup']) >= 6){

                    if (!empty($_POST['confirm_password_signup'])){
                        if ($_POST['confirm_password_signup'] == $_POST['password_signup']){

                            $login = valid_data($_POST['login_signup']);
                        
                            $user = new User();
                            $data = $user->GetLoginDb($login);
                        
                            if($data[0] == 1){
                                $errorLogin = "Le login est déjà utilisé";
                            } 
                            else {

                                $password = valid_data($_POST['password_signup']);
                                $hash = password_hash($password, PASSWORD_DEFAULT); 
                                $user = new User();
                                $user->Register($login, $hash);
                                header('location: connexion.php');
                            }

                        } else {
                            $errorConfirmPassword = "Mot de passes différents";
                        }
                    } else {
                        $errorConfirmPassword = "Veuillez confirmez votre password";
                    }
                } else {
                    $errorPassword = "Votre mot de passe doit contenir 6 caractères";
                }
            } else {
                $errorPassword = "Veuillez insérer un password";
            }

        } else {
            $errorLogin = "Votre login doit contenir 5 caractères";
        }
    } else {
        $errorLogin = "Veuillez insérer un login";
    }
}
?>