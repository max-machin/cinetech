window.addEventListener("DOMContentLoaded", (event) => {  

    /*Configuration des URL de l'API */
    const config = {
        api_key: '7c30e92027c202407878367905bafe52',
        api_base_url: 'https://api.themoviedb.org/3/',
        image_base_url: 'https://image.tmdb.org/t/p/w1280'
    }

    const BASE_URL = config.api_base_url
    const API_KEY = config.api_key

     /*----------------------------- Lancement des méthodes ------------------------------- */

     function App(){
        movie_favoris()
        tv_favoris()
        person_favoris()
     }
     App()

    /*----------------------------- AFFICHAGE DES FAVORIS USER ------------------------------- */
    
    
    function movie_favoris(){
        var favoris_movie_user = document.querySelector('.favoris_movie_user')
        var content_movie = document.querySelectorAll('.movie_id')
        if (content_movie.length != 0){
            for (var i = 0; i < content_movie.length; i++){
                fetch(`${BASE_URL}movie/${content_movie[i].value}?api_key=${API_KEY}&language=fr-FR`)
                    .then(response => response.json())
                    .then(data => {
                        var film = document.createElement('div')
                        film.className = "scroll_card"
    
                        film.innerHTML = `<a href="detail.php?movie=${data.id}"><img src="${config.image_base_url + data.poster_path}" class="img-fluid" >
                        <p>${data.title}</p></a><form method="post"><button type="submit" name="delete_favoris_movie" class="delete_favoris_movie">
                        <i class="fa-solid fa-trash"></i> favoris</button><input type="hidden" name="id_movie_favoris" value="${data.id}">
                        </form>`
                        favoris_movie_user.appendChild(film)
                    })
            }
        } else {
            favoris_movie_user.innerHTML = "<h2 class='no_result'> Aucun film en favoris</h2>"
        }    
    }

    function tv_favoris(){
        var favoris_tv_user = document.querySelector('.favoris_tv_user')
        var content_tv = document.querySelectorAll('.tv_id')
        console.log(content_tv.length)
        if (content_tv.length != 0){
            for (var i = 0; i < content_tv.length; i++){
                fetch(`${BASE_URL}tv/${content_tv[i].value}?api_key=${API_KEY}&language=fr-FR`)
                    .then(response => response.json())
                    .then(data => {
                        var serie = document.createElement('div')
                        serie.className = "scroll_card"
    
                        serie.innerHTML = `<a href="detail.php?tv=${data.id}"><img src="${config.image_base_url + data.poster_path}" class="img-fluid" >
                        <p>${data.name}</p></a><form method="post"><button type="submit" name="delete_favoris_tv" class="delete_favoris_movie">
                        <i class="fa-solid fa-trash"></i> favoris</button><input type="hidden" name="id_tv_favoris" value="${data.id}">
                        </form>`
                        favoris_tv_user.appendChild(serie)
                    })
            }
        }  else {
            favoris_tv_user.innerHTML = "<h2 class='no_result'> Aucune séries en favoris</h2>"
        }
        
    }

    function person_favoris(){
        var favoris_person_user = document.querySelector('.favoris_person_user')
        
        var content_person = document.querySelectorAll('.person_id')
        console.log(content_person.length)
        if(content_person.length != 0){
            for (var i = 0; i < content_person.length; i++){
                fetch(`${BASE_URL}person/${content_person[i].value}?api_key=${API_KEY}&language=fr-FR`)
                    .then(response => response.json())
                    .then(data => {
                        var person = document.createElement('div')
                        person.className = "scroll_card"
                        console.log(data)
                        person.innerHTML = `<a href="detail.php?person=${data.id}"><img src="${config.image_base_url + data.profile_path}" class="img-fluid" >
                        <p>${data.name}</p></a><form method="post"><button type="submit" name="delete_favoris_person" class="delete_favoris_movie">
                        <i class="fa-solid fa-trash"></i> favoris</button><input type="hidden" name="id_person_favoris" value="${data.id}">
                        </form>`
                        favoris_person_user.appendChild(person)
                    })
            }
        } 
        else{
            favoris_person_user.innerHTML = "<h2 class='no_result'> Aucun artiste en favoris</h2>"
        }
    }
    
})