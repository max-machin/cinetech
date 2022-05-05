window.addEventListener("DOMContentLoaded", (event) => {
    /*Configuration des URL de l'API */
    const config = {
        api_key: '7c30e92027c202407878367905bafe52',
        api_base_url: 'https://api.themoviedb.org/3/',
        image_base_url: 'https://image.tmdb.org/t/p/w1280'
    }

    const BASE_URL = config.api_base_url
    const API_KEY = config.api_key

    /*----------------------- les catégories de film  ------------------------- */

    var cat = document.querySelector('.categories')
    var search_cat = document.querySelector('.search_cat')

    var cat_select = []

    async function categories(){
        fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=fr-FR`)
                .then(response => response.json())
                .then(result => { 
                   
                    result.genres.forEach(genre =>{
                        var li = document.createElement('p')

                        li.className = "cate"

                        li.innerHTML = genre.name

                        li.id = genre.id

                        li.addEventListener('click', () => {
                            
                           search_cat.innerHTML = ""

                            if (cat_select.length == 0){
                                
                                cat_select.push(genre.id)
                               
                            } else {
                                
                                if(cat_select.includes(genre.id)){
                                    cat_select.forEach((id, idx) => {
                                        if (id == genre.id){
                                            cat_select.splice(idx, 1)
                                        }
                                    })
                                } else {
                                    cat_select.push(genre.id)
                                }
                            }
                            fetch(BASE_URL + "discover/movie?api_key=" + config.api_key + "&with_genres=" + encodeURI(cat_select.join(',')) )
                                .then(response => response.json())
                                .then(result => {
                                   
                                    var movies = result

                                    if(movies.total_results > 18) {
                                        for(let i = 0; i < 18; i++){
                                            if(movies.results[i].poster_path != null){
                                                search_cat.innerHTML += `<a href="detail.php?movie=${movies.results[i].id}"><div><img src="${config.image_base_url + movies.results[i].poster_path}"></div></a>`
                                                search_cat.style.borderBottom = '1px solid #464141'
                                                search_cat.style.paddingBottom = '3vh'
                                            }
                                            
                                        }
                                    } else if (movies.total_results < 18 && movies.total_results != 0) {
                                       
                                        for(let i = 0; i < movies.results.length; i++){
                                            if(movies.results[i].poster_path != null){
                                                search_cat.innerHTML += `<a href="detail.php?movie=${movies.results[i].id}"><div><img src="${config.image_base_url + movies.results[i].poster_path}"></div></a>`
                                                search_cat.style.borderBottom = '1px solid #464141'
                                                search_cat.style.paddingBottom = '3vh'
                                            }
                                            
                                        }
                                    } else if (movies.total_results == 0) {
                                        search_cat.innerHTML = '<h2 class="no_result">Aucun résultat.</h2>'
                                        search_cat.style.borderBottom = 'none'
                                        search_cat.style.paddingBottom = '0'
                                    }

                                    if (cat_select.length == 0) {
                                        search_cat.innerHTML = ""
                                        search_cat.style.borderBottom = 'none'
                                        search_cat.style.paddingBottom = '0'
                                    }
                                    
                                })
                            highlightSelect()

                            
                            
                        })

                        cat.appendChild(li)
                    })
                })
    }

    categories()
    
    function highlightSelect(){
        const cates = document.querySelectorAll('.cate')
        cates.forEach(tag => {
            tag.classList.remove('highlight')
        })
        clearSelect(cates)
        if(cat_select.length != 0){
            cat_select.forEach(id => {
                const highlight = document.getElementById(id);
                highlight.classList.add('highlight') 

                let button = document.getElementById('clear')
                button.style.display = 'block'
            })
        } 

        if (cat_select.length == 0){
            let button = document.getElementById('clear')
            button.style.display = 'none'
        } 
        
    }

    function clearSelect(cats){
        let button = document.getElementById('clear')
        if(button){
            button.classList.add('highlight')
        } else {
            let clear = document.createElement('p')
            clear.classList.add('cate','highlight')
            clear.id = 'clear'
            clear.innerHTML = '<i class="fa-solid fa-delete-left"></i>'

            clear.addEventListener('click', () => {

                cats.forEach(clean => {
                    clean.classList.remove('highlight')
                })
                
                cat_select.length = 0;
                search_cat.innerHTML = ""
                search_cat.style.borderBottom = 'none'
                search_cat.style.paddingBottom = '0'
      
            })
           
            cat.append(clear)
        }    
    }


    /*----------------------- les films populaires  ------------------------- */

    /*Récupération du container d'affichage des films populaires */
    var popular_movie_container = document.querySelector('.popular_movie')

    /**
     * 
     * @param {*} page 
     * @returns data = tableau de films populaires
     */
    async function popular_movie() {

        try {
            fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=fr-FR`)
                .then(response => response.json())
                .then(result => {

                    var movies = result.results
                    for (let i = 0; i < 20; i++) {
                        if(movies[i].poster_path != null){
                            var film = document.createElement('div')
                            film.className = "scroll_card"
    
                            film.innerHTML = `<a href="detail.php?movie=${movies[i].id}"><img src="${config.image_base_url + movies[i].poster_path}" class="img-fluid" >
                            <p class="head_card">${movies[i].release_date}</p><p>Avis : ${movies[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`
    
                            popular_movie_container.appendChild(film)
                        }
                    }
                })


        } catch (error) {

        }
    }

    popular_movie()

    /*----------------------- les films les mieux notés  ------------------------- */

    var top_rated_movie_container = document.querySelector('.top_rated_movie')

    async function top_rated_movie(){

        try {
            fetch(`${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=fr-FR`)
            .then(response =>  response.json())
            .then(result => {

                var top_movie = result.results
                for (let i = 0; i < 20; i++) {
                    if(top_movie[i].poster_path != null){
                        var top_rated_movie = document.createElement('div')

                        top_rated_movie.className = "scroll_card"

                        top_rated_movie.innerHTML = `<a href="detail.php?movie=${top_movie[i].id}"><img src="${config.image_base_url + top_movie[i].poster_path}" class="img-fluid" >
                        <p class="head_card">${top_movie[i].release_date}</p><p>Avis : ${top_movie[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`

                        top_rated_movie_container.appendChild(top_rated_movie)
                    }
                    
                }
            })
               
        } catch (error) {

        }
    }
    top_rated_movie()


     /*----------------------- les films du moment ------------------------- */

    var now_playing_movie_container = document.querySelector('.now_playing_movie')

    async function now_playing_movie(){

        try {
            fetch(`${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=fr-FR`)
            .then(response =>  response.json())
            .then(result => {

                var now_playing = result.results
                for (let i = 0; i < 20; i++) {
                    if(now_playing[i].poster_path != null){
                        var now_playing_movie = document.createElement('div')

                        now_playing_movie.className = "scroll_card"
    
                        now_playing_movie.innerHTML = `<a href="detail.php?movie=${now_playing[i].id}"><img src="${config.image_base_url + now_playing[i].poster_path}" class="img-fluid" >
                        <p class="head_card">${now_playing[i].release_date}</p><p>Avis : ${now_playing[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`
    
                        now_playing_movie_container.appendChild(now_playing_movie)
                    }
                }
            })
               
        } catch (error) {

        }
    }
    now_playing_movie()

    
     /*----------------------- les films à venir ------------------------- */

     var upcoming_movie_container = document.querySelector('.upcoming_movie')

    async function upcoming_movie(){

        try {
            fetch(`${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=fr-FR`)
            .then(response =>  response.json())
            .then(result => {

                var upcoming = result.results 
                for (let i = 0; i < 50; i++) {
                    if (upcoming[i].poster_path != null){
                        var upcoming_movie = document.createElement('div')

                        upcoming_movie.className = "scroll_card"

                        upcoming_movie.innerHTML = `<a href="detail.php?movie=${upcoming[i].id}"><img src="${config.image_base_url + upcoming[i].poster_path}" class="img-fluid" >
                        <p class="head_card">${upcoming[i].release_date}</p></a>`

                        upcoming_movie_container.appendChild(upcoming_movie)
                    }
                }
            })
            
        } catch (error) {

        }
    //      
    }
    upcoming_movie()

})