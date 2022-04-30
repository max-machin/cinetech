window.addEventListener("DOMContentLoaded", (event) => { 
    

    /*Configuration des URL de l'API */
    const config = {
        // Clef de connexion à l'API en developper
        api_key: '7c30e92027c202407878367905bafe52',
        // Url de base de l'API'
        api_base_url: 'https://api.themoviedb.org/3/',
        // Url de base des images de l'API en 1280p'
        image_base_url: 'https://image.tmdb.org/t/p/w1280',
        // Url de base des images de l'API en format original'
        original_image_base_url: 'https://image.tmdb.org/t/p/original'
    }

    // Const BASE_URL = url de base de l'API
    const BASE_URL = config.api_base_url
    // Const API_KEY = Clef de connexion à l'API en developper
    const API_KEY = config.api_key

    
    // Récupération de l'url $_GET
    let url = document.location.search
    // Séparation des paramètres de l'url à partir du caractère spécial "="
    var split = url.split('=')


    var type = split[0].replace('?', '')
    var element_id = split[1]

    const format_string = (current_id, max_id) => {
        return (current_id == max_id - 1) ? '' : ', ' + " ";
    }
    


    /**
     * 
     * @param {*} page 
     * @returns data = tableau de films populaires
     */
    function see_detail() {

        const format_string = (current_id, max_id) => {
            return (current_id == max_id - 1) ? ' ' : ', ';
        }
        
        
        

        fetch(`${BASE_URL}${type}/${element_id}?api_key=${API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setup_movie_info(result)
                
            })
            
            const setup_movie_info = (data) => {
                const movie_name = document.querySelector('.movie_name')
                const runtime = document.querySelector('.runtime')
                const genres = document.querySelector('.genres')
                const des = document.querySelector('.des')
                const title = document.querySelector('title')
                const backdrop = document.querySelector('.movie_info')
                const company = document.querySelector('.company_prod')
                const country = document.querySelector('.country_prod')
                
                if(type == 'movie'){

                    title.innerHTML = movie_name.innerHTML = data.title

                    genres.innerHTML = `${data.release_date.split('-')[0]}  |  `;

                    var time = data.runtime
                    var minutes = time%60
                    var heure = (time - minutes) / 60
    
                    
                    runtime.innerHTML = "<span>Durée : </span>" + heure + "h" + (minutes < 9 ? "0" + minutes : minutes);

                } else if (type == 'tv'){


                    title.innerHTML = movie_name.innerHTML = data.name

                    genres.innerHTML = `${data.first_air_date.split('-')[0]}  |  `;

                    var runrate = document.querySelector('.run_rate')

                    runrate.style.display = 'inline'

                    runtime.innerHTML = "<span>Nombre de saisons : </span>" +  data.number_of_seasons + " ( " + data.number_of_episodes + " épisodes )";

                    
                    var creator = document.querySelector('.creator')

                    if (data.created_by.length > 0) {
                        creator.innerHTML = "<span>Créateur : </span>"

                        for(let i = 0; i < data.created_by.length; i++) {
                            creator.style.marginBottom = "25px"
                            creator.innerHTML +=  data.created_by[i].name + format_string(i, data.created_by.length)
                        }
                    } else {
                        creator.style.display = "none"
                    }

                    var net = document.querySelector('.networks')

                    if (data.networks.length > 0) {
                        // net.innerHTML = "<span>Diffusion : </span>"

                        for(let i = 0; i < data.networks.length; i++){
                            var img = document.createElement('img')
                            img.setAttribute('src', config.image_base_url + data.networks[i].logo_path)
                            net.style.marginTop = "30px"
                            net.style.paddingBottom = "0px"
                            // net.innerHTML += data.networks[i].name + format_string(i, data)
                            net.appendChild(img)
                        }
                    }
                }


                var icon = document.querySelectorAll('.icon')
                for (let i = 0; i < Math.round(data.vote_average); i++){
                    icon[i].style.color = "#FDCC0D"
                    icon[i].style.opacity = "1";
                }

                
                

                for (let i = 0; i < data.genres.length; i++) {
                    genres.innerHTML += data.genres[i].name + format_string(i, data.genres.length)
                }

                if (data.adult == true) {
                    genres.innerHTML += ' | +18';
                }

                if (data.backdrop_path == null){
                    data.backdrop_path = data.poster_path
                }

                
                des.innerHTML = data.overview.substring(0, 400) + '...'

                backdrop.style.backgroundImage = `url(${config.original_image_base_url}${data.backdrop_path})` 

                if (data.production_countries.length > 0) {
                    for(let i = 0; i < data.production_countries.length; i++){
                        country.innerHTML += data.production_countries[i].name + format_string(i, data.production_countries.length);
                    }
                } else {
                    country.innerHTML += "Aucun résultat."
                }
                
            }
    }
    see_detail()


    function casting(){
        
        fetch(`${BASE_URL}${type}/${element_id}/credits?api_key=${API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(data => {
                const rea = document.querySelector('.rea')
                if (data.crew.length > 0){
                    if(data.crew.length < 6){
                        for(let i = 0; i < data.crew.length; i++){
                            rea.innerHTML += data.crew[i].name + format_string(i, data.crew.length)   
                        }
                    } else if (data.crew.length >= 6) {
                        
                        for(let i = 0; i < 6; i++){
                            rea.innerHTML += data.crew[i].name + format_string(i, 6)   
                        }
                    }
                } else {
                    rea.innerHTML += "Aucun résultat."
                }
                const casting = document.querySelector('.casting_content')
                if (data.cast.length > 0){
                   
                    if (data.cast.length < 10){
                        for (let i = 0; i < data.cast.length; i++){
                            if (data.cast[i].profile_path == null){
                                i++
                            }
                            var cast = document.createElement('div')
        
                            cast.className = "scroll_card"
        
                            cast.innerHTML = `<img src="${config.image_base_url + data.cast[i].profile_path}" class="img-fluid" >
                            <p class="head_card">${data.cast[i].name}</p>
                            <p> Popularité : ${data.cast[i].popularity} </p>`
                            casting.appendChild(cast)
                        }
                    } else {
                        for (let i = 0; i < 15; i++){
                            if (data.cast[i].profile_path == null){
                                i++
                            }
                            var cast = document.createElement('div')
        
                            cast.className = "scroll_card"
        
                            cast.innerHTML = `<img src="${config.image_base_url + data.cast[i].profile_path}" class="img-fluid" >
                            <p class="head_card">${data.cast[i].name}</p>
                            <p> Popularité : ${data.cast[i].popularity} </p>`
                            casting.appendChild(cast)
                        }
                    }
                    
                } else {
                    var cas = document.querySelector('.casting')
                    cas.style.display = "none"
                }
                
            })
    }
    casting()


    function video(){
        
        fetch(`${BASE_URL}${type}/${element_id}/videos?api_key=${API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(data => {
                let trailer_container = document.querySelector('.trailer_container')

                let max_clips = (data.results.length > 7) ? 7 : data.results.length
                if (data.results.length > 0){
                    console.log(data.results)
                    for (let i = 0; i < max_clips; i++) {
                        trailer_container.innerHTML += 
                        `<iframe src="http://www.youtube.com/embed/${data.results[i].key}" title="${data.results[i].name}"
                            frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>`
                    }
                } else {
                    trailer_container.style.display = 'none'
                }
                
            })
    }

    video()

    function en_commun(){
        fetch(`${BASE_URL}${type}/${element_id}/similar?api_key=${API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(data => {
                let container = document.querySelector('.recommendations')

                if (type == 'movie'){
                    for(let i = 0; i < 20; i++){
                        if (data.results[i].backdrop_path == null){
                            i++
                        }
                        var film = document.createElement('div')
                        film.className = "scroll_card"
    
                        film.innerHTML = `<a href="detail.php?movie=${data.results[i].id}"><img src="${config.image_base_url + data.results[i].poster_path}" class="img-fluid" >
                        <p class="head_card">${data.results[i].release_date}</p><p>Avis : ${data.results[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`
    
                        container.appendChild(film)
                    }
                } else if (type == "tv"){
                    for(let i = 0; i < 20; i++){
                        if (data.results[i].backdrop_path == null){
                            i++
                        }
                        var film = document.createElement('div')
                        film.className = "scroll_card"
    
                        film.innerHTML = `<a href="detail.php?tv=${data.results[i].id}"><img src="${config.image_base_url + data.results[i].poster_path}" class="img-fluid" >
                        <p class="head_card">${data.results[i].first_air_date}</p><p>Avis : ${data.results[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`
    
                        container.appendChild(film)
                    }
                }
                
            })
    }

    en_commun()
})

    