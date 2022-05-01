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

        popular_movie()
        popular_series()
        top_rated_movie()
        top_rated_series()
        popular_person()

    }
    App()

    /*----------------------- les films populaires  ------------------------- */

    /*Récupération du container d'affichage des films populaires */
    var popular_movie_container = document.querySelector('.popular_movie')

    /**
     * 
     * @param {*} page 
     * @returns data = tableau de films populaires
     */
    async function popular_movie(){
        let data = []

        try {
            fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=fr-FR`)
            .then(response =>  response.json())
            .then(result => {

                var movies = result.results
               
                for (let i = 0; i < 20; i++) {
                    var film = document.createElement('div')
                    film.className = "scroll_card"

                    film.innerHTML = `<a href="detail.php?movie=${movies[i].id}"><img src="${config.image_base_url + movies[i].poster_path}" class="img-fluid" >
                    <p class="head_card">${movies[i].release_date}</p><p>Avis : ${movies[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`

                    popular_movie_container.appendChild(film)
                }
            })
               
            
        } catch (error) {

        }
        return data
    } 
    


    /*----------------------- les séries populaires  ------------------------- */

    /*Récupération du container d'affichage des séries populaires */
    var popular_tv_container = document.querySelector('.popular_tv')

    /**
     * 
     * @param {*} page 
     * @returns data = tableau de séries populaires
     */
    async function popular_series(){

        let data = []

        try {
            fetch(`${BASE_URL}tv/popular?api_key=${API_KEY}&language=fr-FR`)
            .then(response =>  response.json())
            .then(result => {

                var tv = result.results
                for (let i = 0; i < 20; i++) {
                    var serie = document.createElement('div')
                    serie.className = "scroll_card"

                    serie.innerHTML = `<a href="detail.php?tv=${tv[i].id}"><img src="${config.image_base_url + tv[i].poster_path}" class="img-fluid" >
                    <p class="head_card">${tv[i].first_air_date}</p><p>Avis : ${tv[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`
                    

                    popular_tv_container.appendChild(serie)
                }
            })
               
        } catch (error) {

        }
        return data
    }
    popular_series()


    /*----------------------- les films les mieux notés  ------------------------- */

    var top_rated_movie_container = document.querySelector('.top_rated_movie')

    async function top_rated_movie(){
        let data = []

        try {
            fetch(`${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=fr-FR`)
            .then(response =>  response.json())
            .then(result => {

                var top_movie = result.results
                for (let i = 0; i < 20; i++) {
                    var top_rated_movie = document.createElement('div')

                    top_rated_movie.className = "scroll_card"

                    top_rated_movie.innerHTML = `<a href="detail.php?movie=${top_movie[i].id}"><img src="${config.image_base_url + top_movie[i].poster_path}" class="img-fluid" >
                    <p class="head_card">${top_movie[i].release_date}</p><p>Avis : ${top_movie[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`

                    top_rated_movie_container.appendChild(top_rated_movie)
                }
            })
               
        } catch (error) {

        }
        return data
    }
    top_rated_movie()


    /*----------------------- les séries les mieux notés  ------------------------- */
    
    var top_rated_series_container = document.querySelector('.top_rated_series')

    async function top_rated_series(){
        let data = []

        try {
            fetch(`${BASE_URL}tv/top_rated?api_key=${API_KEY}&language=fr-FR`)
            .then(response =>  response.json())
            .then(result => {

                var top_serie = result.results
                console.log(top_serie)
                for (let i = 0; i < 20; i++) {

                    var top_rated_serie = document.createElement('div')

                    top_rated_serie.className = "scroll_card"

                    top_rated_serie.innerHTML = `<a href="detail.php?tv=${top_serie[i].id}"><img src="${config.image_base_url + top_serie[i].poster_path}" class="img-fluid" >
                    <p class="head_card">${top_serie[i].first_air_date}</p><p>Avis : ${top_serie[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`

                    top_rated_series_container.appendChild(top_rated_serie)
                }
            })
               
        } catch (error) {

        }
        return data 
    }
    top_rated_series()


    /*----------------------- les artistes du moment  ------------------------- */
    
    /*Récupération du container d'affichage des artistes populaires */
    var popular_person_container = document.querySelector('.popular_person')

    async function popular_person(){

        let data = []

        try {
            fetch(`${BASE_URL}person/popular?api_key=${API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(result => {

                var person = result.results
                for (let i = 0; i < 20; i++){

                    var popular_person = document.createElement('div')

                    popular_person.className = "scroll_card"

                    popular_person.innerHTML = `<a href="detail.php?person=${person[i].id}"><img src="${config.image_base_url + person[i].profile_path}" class="img-fluid" >
                    <p class="head_card">${person[i].name}</p>
                    <p> Popularité : ${person[i].popularity} </p>`

                    popular_person_container.appendChild(popular_person)
                }
            })
        } catch (error) {

        }
        return data 

    }

    popular_person()
})