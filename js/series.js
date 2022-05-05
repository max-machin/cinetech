window.addEventListener("DOMContentLoaded", (event) => {


    /*Configuration des URL de l'API */
    const config = {
        api_key: '7c30e92027c202407878367905bafe52',
        api_base_url: 'https://api.themoviedb.org/3/',
        image_base_url: 'https://image.tmdb.org/t/p/w1280'
    }

    const BASE_URL = config.api_base_url
    const API_KEY = config.api_key

    var cat = document.querySelector('.categories')
    var search_cat = document.querySelector('.search_cat')

    var cat_select = []

    async function categories(){
        fetch(`${BASE_URL}genre/tv/list?api_key=${API_KEY}&language=fr-FR`)
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
                            fetch(BASE_URL + "discover/tv?api_key=" + config.api_key + "&with_genres=" + encodeURI(cat_select.join(',')) )
                                .then(response => response.json())
                                .then(result => {
                                   
                                    var tv = result
                                    console.log(tv  )
                                    if(tv.total_results > 18) {
                                        for(let i = 0; i < 18; i++){
                                            if(tv.results[i].poster_path == null){
                                                i++
                                            }
                                            search_cat.innerHTML += `<a href="detail.php?tv=${tv.results[i].id}"><div><img src="${config.image_base_url + tv.results[i].poster_path}"></div></a>`
                                            search_cat.style.borderBottom = '1px solid #464141'
                                            search_cat.style.paddingBottom = '3vh'
                                        }
                                    } else if (tv.total_results < 18 && tv.total_results != 0) {
                                       
                                        for(let i = 0; i < tv.results.length; i++){
                                            if(tv.results[i].poster_path == null){
                                                i++
                                            }
                                            search_cat.innerHTML += `<a href="detail.php?tv=${tv.results[i].id}"><div><img src="${config.image_base_url + tv.results[i].poster_path}"></div></a>`
                                            search_cat.style.borderBottom = '1px solid #464141'
                                            search_cat.style.paddingBottom = '3vh'
                                        }
                                    } else if (tv.total_results == 0) {
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
    var popular_serie_container = document.querySelector('.popular_serie')

    /**
     * 
     * @param {*} page 
     * @returns data = tableau de films populaires
     */
    async function popular_serie() {
        let data = []

        try {
            fetch(`${BASE_URL}tv/popular?api_key=${API_KEY}&language=fr-FR`)
                .then(response => response.json())
                .then(result => {

                    var series = result.results

                    for (let i = 0; i < 20; i++) {
                        if(series[i].poster_path == null){
                            i++
                        }
                        var serie = document.createElement('div')
                        serie.className = "scroll_card"

                        serie.innerHTML = `<a href="detail.php?tv=${series[i].id}"><img src="${config.image_base_url + series[i].poster_path}" class="img-fluid" >
                        <p class="head_card">${series[i].first_air_date}</p><p>Avis : ${series[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`

                        popular_serie_container.appendChild(serie)
                    }
                })


        } catch (error) {

        }
        return data
    }

    popular_serie()

    /*----------------------- les films les mieux notés  ------------------------- */

    var top_rated_serie_container = document.querySelector('.top_rated_serie')

    async function top_rated_serie(){
        let data = []

        try {
            fetch(`${BASE_URL}tv/top_rated?api_key=${API_KEY}&language=fr-FR`)
            .then(response =>  response.json())
            .then(result => {

                var top_serie = result.results
                for (let i = 0; i < 20; i++) {
                    if(top_serie[i].poster_path == null){
                        i++
                    }
                    var top_rated_serie = document.createElement('div')

                    top_rated_serie.className = "scroll_card"

                    top_rated_serie.innerHTML = `<a href="detail.php?tv=${top_serie[i].id}"><img src="${config.image_base_url + top_serie[i].poster_path}" class="img-fluid" >
                    <p class="head_card">${top_serie[i].first_air_date}</p><p>Avis : ${top_serie[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`

                    top_rated_serie_container.appendChild(top_rated_serie)
                }
            })
               
        } catch (error) {

        }
        return data
    }
    top_rated_serie()


     /*----------------------- les films en cours de diffusion ------------------------- */

    var now_playing_serie_container = document.querySelector('.now_playing_serie') 

    async function now_playing_serie(){
        let data = []

        try {
            fetch(`${BASE_URL}tv/on_the_air?api_key=${API_KEY}&language=fr-FR`)
            .then(response =>  response.json())
            .then(result => {

                var on_the_air = result.results
                for (let i = 0; i < 20; i++) {
                    if (on_the_air[i].poster_path == null){
                        i++
                    }
                    var now_playing_serie = document.createElement('div')

                    now_playing_serie.className = "scroll_card"

                    now_playing_serie.innerHTML = `<a href="detail.php?tv=${on_the_air[i].id}"><img src="${config.image_base_url + on_the_air[i].poster_path}" class="img-fluid" >
                    <p class="head_card">${on_the_air[i].first_air_date}</p><p>Avis : ${on_the_air[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`

                    now_playing_serie_container.appendChild(now_playing_serie)
                }
            })
               
        } catch (error) {

        }
        return data
    }
    now_playing_serie()

    
     /*----------------------- les films diffusés aujourd'hui ------------------------- */

     var airing_today_serie_container = document.querySelector('.upcoming_serie')

     async function airing_today_serie(){
         let data = []
 
         try {
             fetch(`${BASE_URL}tv/airing_today?api_key=${API_KEY}&language=fr-FR`)
             .then(response =>  response.json())
             .then(result => {
                console.log(result)
                 var airing_today = result.results
                 for (let i = 0; i < 50; i++) {
                     if(airing_today[i].poster_path == null){
                         i++
                     }
                     var airing_today_serie = document.createElement('div')
 
                     airing_today_serie.className = "scroll_card"
 
                     airing_today_serie.innerHTML = `<a href="detail.php?tv=${airing_today[i].id}"><img src="${config.image_base_url + airing_today[i].poster_path}" class="img-fluid" >
                     <p class="head_card">${airing_today[i].first_air_date}</p><p>Avis : ${airing_today[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`
 
                     airing_today_serie_container.appendChild(airing_today_serie)
                 }
             })
                
         } catch (error) {
 
         }
         return data
     }
     airing_today_serie()
})