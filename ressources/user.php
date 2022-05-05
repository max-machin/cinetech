<?php
require 'database.php';

function valid_data($données)
{
    //trim permet de supprimer les espaces inutiles
    $données = trim($données);
    //stripslashes supprimes les antishlashs
    $données = stripslashes($données);
    //htmlspecialchars permet d'échapper certains caractéres spéciaux et les transforment en entité HTML
    $données = htmlspecialchars($données);
    return $données;
}

class User extends Database{
    private $id;
    //@var string public $login login de l'utilisateur
    public $login;
    //@var string public $email email de l'utilisateur
    public $password;

    public $bdd;

    public function __construct(){
        $this->login;
        $this->password;
        $this->bdd = parent::__construct();
    }

    //Inscription utilisateur
    
    public function Register($login, $password){

        $insert = "INSERT INTO utilisateurs (login, password) VALUES (:login, :password)";
        $exec_insert = $this->bdd->prepare($insert);
        $exec_insert->bindValue(':login' , $login, PDO::PARAM_STR);
        $exec_insert->bindValue(':password' , $password, PDO::PARAM_STR);
        $exec_insert->execute();
    }

    public function GetLoginDb($login){
        $select = "SELECT * FROM utilisateurs WHERE `login` = ? ";
        $exec_select = $this->bdd->prepare($select);
        $exec_select->execute([$login]);
        $count = $exec_select->rowCount();
        return array($count);
        //return count et si count = 1 ou 0 en fonction dans le controller on enregistre l'user ou pas
    }

    //Connexion utilisateur

    public function Connect($login){
        $select = "SELECT * FROM utilisateurs WHERE `login` = ?";
        $exec_select = $this->bdd->prepare($select);
        $exec_select->execute(array($login));

        $user_data = $exec_select->fetchAll(PDO::FETCH_ASSOC);

        foreach($user_data as $data){
            $_SESSION['user_data'] = array(
                'id' => $data['id'],
                'login' => $data['login']
            );
        }
        header ('location: index.php');
    }

    public function VerifDataUser($login){
        $select = "SELECT * FROM utilisateurs WHERE `login` = ? ";
        $exec_select = $this->bdd->prepare($select);
        $exec_select->execute([$login]);
        $resultat = $exec_select->fetchAll(PDO::FETCH_ASSOC);
        
        return $resultat;
    }

     //Ajout favoris utilisateur
     public function AddFavorite($id_utilisateur, $id_favoris, $type){
        $insert = "INSERT INTO favoris (id_utilisateur, id_favoris, type) VALUES (:id_utilisateur, :id_favoris, :type)";
        $exec_insert = $this->bdd->prepare($insert);
        $exec_insert->bindValue(':id_utilisateur' , $id_utilisateur, PDO::PARAM_INT);
        $exec_insert->bindValue(':id_favoris' , $id_favoris, PDO::PARAM_INT);
        $exec_insert->bindValue(':type' , $type, PDO::PARAM_STR);
        $exec_insert->execute();
    }

    public function findFavorite($id_utilisateur, $id_favoris){
        $select = "SELECT * FROM favoris WHERE `id_utilisateur` = ? AND id_favoris = ?";
        $exec_select = $this->bdd->prepare($select);
        $exec_select->execute([$id_utilisateur, $id_favoris]);
        $count = $exec_select->rowCount();
        return array($count);
    }

    public function findFavorites($id_utilisateur, $type){
        $select = "SELECT * FROM favoris WHERE `id_utilisateur` = ? AND `type` = ?";
        $exec_select = $this->bdd->prepare($select);
        $exec_select->execute([$id_utilisateur, $type]);
        $resultat = $exec_select->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    public function deleteFavorite($id_utilisateur, $id_favoris){
        $delete = "DELETE FROM favoris WHERE `id_utilisateur` = ? AND id_favoris = ?";
        $exec_delete = $this->bdd->prepare($delete);
        $exec_delete->execute([$id_utilisateur, $id_favoris]);
    }

    public function addCommentaire($id_utilisateur, $id_element, $commentaire, $type){
        $insert = "INSERT INTO commentaires (id_utilisateur, id_element,commentaire, `type`) VALUES (:id_utilisateur, :id_element, :commentaire ,:type)";
        $exec_insert = $this->bdd->prepare($insert);
        $exec_insert->bindValue(':id_utilisateur' , $id_utilisateur, PDO::PARAM_INT);
        $exec_insert->bindValue(':id_element' , $id_element, PDO::PARAM_INT);
        $exec_insert->bindValue(':commentaire' , $commentaire, PDO::PARAM_STR);
        $exec_insert->bindValue(':type' , $type, PDO::PARAM_STR);
        $exec_insert->execute();
    }

    public function findCommentaire($id_element, $type){
        $select = 'SELECT commentaires.id as id_comm, utilisateurs.id as id_user,  utilisateurs.login, DATE_FORMAT(commentaires.date, "%Y-%m-%d") as date, DATE_FORMAT(commentaires.date, "%Hh%i") as heure,commentaires.commentaire FROM commentaires INNER JOIN utilisateurs ON commentaires.id_utilisateur = utilisateurs.id WHERE `id_element` = ? AND `type` = ? ORDER BY commentaires.date DESC';
        $exec_select = $this->bdd->prepare($select);
        $exec_select->execute([$id_element, $type]);
        $resultat = $exec_select->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    public function addReponseCommentaire( $id_element, $id_commentaire, $id_user , $reponse, $type ){
        $insert = "INSERT INTO reponse_commentaire (id_element,id_commentaire, id_user, reponse, `type`) VALUES (:id_element,:id_commentaire, :id_user, :reponse ,:type)";
        $exec_insert = $this->bdd->prepare($insert);
        $exec_insert->bindValue(':id_element' , $id_element, PDO::PARAM_STR);
        $exec_insert->bindValue(':id_commentaire' , $id_commentaire, PDO::PARAM_STR);
        $exec_insert->bindValue(':id_user' , $id_user, PDO::PARAM_INT);
        $exec_insert->bindValue(':reponse' , $reponse, PDO::PARAM_STR);
        $exec_insert->bindValue(':type' , $type, PDO::PARAM_STR);
        $exec_insert->execute();
    }

    public function findReponseCommentaire($id_element, $type){
        $select = 'SELECT reponse_commentaire.id_element as id_element, reponse_commentaire.id_commentaire as id_comm, utilisateurs.id as id_user,  utilisateurs.login, DATE_FORMAT(reponse_commentaire.date, "%Y-%m-%d") as date, DATE_FORMAT(reponse_commentaire.date, "%Hh%i") as heure, reponse_commentaire.reponse FROM reponse_commentaire INNER JOIN utilisateurs ON reponse_commentaire.id_user = utilisateurs.id WHERE `id_element` = ? AND `type` = ? ORDER BY reponse_commentaire.date DESC';
        $exec_select = $this->bdd->prepare($select);
        $exec_select->execute([$id_element, $type]);
        $resultat = $exec_select->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }
}

?>