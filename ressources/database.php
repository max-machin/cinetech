<?php

class Database {

    public function __construct(){
        
    //On effectue un try/catch pour la connexion à la base de données. si cette derniére échoue alors on capture l'exception avant de l'afficher.
        try 
        {
            //@var $bdd contient la connexion à la bdd 
            $bdd = new PDO ('mysql:host=localhost; dbname=cinetech;charset=utf8', 'root', '');
            $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $bdd;
        }
        //Capture des exceptions et affichage de ses derniéres.
        catch (PDOException $e)
        {
            die("Erreur !: " . $e->getMessage() . "<br/>");
            
        }
    }
}   

?>