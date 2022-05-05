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
    

    var content_movie_tv = document.querySelector('.movie_info')
    var trailer_container = document.querySelector('.trailer_container')
    var casting_content = document.querySelector('.casting')
    var similaire_content = document.querySelector('.recom')
    var reviews_container = document.querySelector('.reviews_container')


    var person_info = document.querySelector('.person_info')

    if (type == 'tv' || type == 'movie'){
        person_info.style.display = 'none'
        see_detail()
        casting()
        video()
        en_commun()
        commentaires()

    } else if (type == 'person'){
        content_movie_tv.style.display = 'none'
        trailer_container.style.display = 'none'
        casting_content.style.display = 'none'
        similaire_content.style.display = 'none'
        see_detail()
        apparitionMovie()
        apparitionTv()
        console.log('ok')
    }

    else {
        document.location.href = 'index.php'
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

                if (type == "movie" || type == "tv"){
                     setup_movie_info(result)
                } else if (type == "person"){
                    setup_person_info(result)
                } 
               
                
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

                    // var runrate = document.querySelector('.run_rate')

                    // runrate.style.display = 'inline'

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

            const setup_person_info = (data) => {
                const name = document.querySelector('.person_name');
                const biography = document.querySelector('.biography');
                const image_profil = document.querySelector('.image_profil');
                const birthday = document.querySelector('.birthday');
                const deathday = document.querySelector('.deathday');
                const place_birth = document.querySelector('.place_birth');
                const popularity = document.querySelector('.popularity');

                const know_for = document.querySelector('.know_for');

                image_profil.innerHTML = `<image src="${config.image_base_url + data.profile_path}">`

                name.textContent = data.name    

                if (data.biography.length > 600){
                    biography.innerHTML = "<span>Biographie</span> : " +   data.biography.substring(0, 650) + "..."
                } else if (data.biography.length < 600){
                    biography.innerHTML = "<span>Biographie</span> : " +   data.biography
                }
                
                if(data.birthday != null){
                    birthday.innerHTML = "<span>Date de naissance</span> : " + data.birthday
                } else {
                    birthday.innerHTML = "<span>Date de naissance</span> : Aucune information."
                }
               
                if(deathday == null){
                    deathday.innerHTML = "<span>Date de décès</span> : " + data.deathday
                } else {
                    deathday.innerHTML = ""
                }

                if(data.place_of_birth != null){
                    place_birth.innerHTML = "<span>Lieux de naissance</span> : " + data.place_of_birth
                } else {
                    place_birth.innerHTML = "<span>Lieux de naissance</span> : Aucune information."
                }
              

                popularity.innerHTML = "<span>Popularité</span> : " +  Math.round(data.popularity *100) / 100

                
            }
    }

    function apparitionMovie(){
        fetch(`${BASE_URL}${type}/${element_id}/movie_credits?api_key=${API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(result => {
                var apparition_movie = document.querySelector('.apparition_movie_content')

                var movie = result.cast
                for (var i = 0; i < movie.length; i++){
                    if(movie[i].poster_path != null){
                        apparition_movie.innerHTML += `<a href="detail.php?movie=${movie[i].id}"><div><img src="${config.image_base_url + movie[i].poster_path}"></div></a>`
                        // search_result_tv.style.borderBottom = '1px solid #464141'
                        apparition_movie.style.paddingBottom = '3vh'
                    } 
                    
                }
                
            })
    }

    function apparitionTv(){
        fetch(`${BASE_URL}${type}/${element_id}/tv_credits?api_key=${API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(result => {
                var apparition_tv = document.querySelector('.apparition_tv_content')
               
                var tv = result.cast

                for (var i = 0; i < tv.length; i++) {
                    if(tv[i].poster_path != null){
                        apparition_tv.innerHTML += `<a href="detail.php?tv=${tv[i].id}"><div><img src="${config.image_base_url + tv[i].poster_path}"></div></a>`
                        apparition_tv.style.paddingBottom = '5vh'
                    }
                }
            })
    }


    


   
    var arr_bdd = []
    var id_comms = document.querySelectorAll('.id_comm');

    function getBddCommentaires(){
        for (var i = 0; i < id_comms.length; i++) {
            var review = document.createElement('div');
            // console.log(id_comm[i])
            review.className = 'review'
            var id = id_comms[i].value
            arr_bdd.push(id)
                    
        }
    }
    var arr = []
  
    var arr_api = []
    async function commentaires(){
        fetch(`${BASE_URL}${type}/${element_id}/reviews?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                for (var i = 0; i < data.results.length ; i++) {
                    
                    var review = document.createElement('div');
                    // console.log(id_comm[i])
                    review.className = 'review'

                    var date = data.results[i].created_at.split('T')

                    
                    var id = data.results[i].id
                    arr_api.push(id)
                    
                    arr = arr_bdd.concat(arr_api)

                    review.innerHTML = `<p><span>Posté par : </span> ${data.results[i].author}</p>
                    <p><span>Le : </span>  ${date[0]}</p>
                    <p>${data.results[i].content.substr(data.results[i].content, 400) + '...'}</p>
                    <input type="hidden" class="id_comm" name="id_comment_rep" value="${arr[i]}">
                    `
                    reviews_container.appendChild(review)

                }
                var reply_comment = document.querySelectorAll('.review')
                
              
                var id_comm = document.querySelectorAll('.id_comm');
                for(let i = 0; i < reply_comment.length; i++) {
                    
                    
                    var reponse_button = document.createElement('a')

                    var cancel_button = document.createElement('a')

                    cancel_button.innerHTML = `<a class="cancel_reply_comment none"><i class="fa-solid fa-ban"></i> Annuler</a>`
                    
                
                    if (id_comm[i]){
                        reponse_button.className = 'button_reponse'
                        reponse_button.innerHTML = `<a class="reply_comment"><i class="fa-solid fa-reply"></i> Répondre</a>
                        <form method="post" class="form_reponse_comm none">
                        <input type="hidden" class="id_comment_rep" name="id_comment_rep" value="${id_comm[i].value}">
                        <textarea name="review_reponse" id="" cols="60" rows="5" placeholder="Votre réponse"></textarea><br/>
                        <input type="submit" value="Poster" name="submit_reponse_commentaire" class="submit_reponse_commentaire">
                        </form><div class="reponse_review"></div>`
                    }

                    var true_id_comm = document.querySelectorAll('.id_comment_rep')
                    
                  

                    reply_comment[i].appendChild(reponse_button)
                    
                    reply_comment[i].appendChild(cancel_button)

                    var form_reponse_comm = document.querySelectorAll('.form_reponse_comm')

                    var button_reply = document.querySelectorAll('.reply_comment')

                    var button_cancel = document.querySelectorAll('.cancel_reply_comment')


                    reponse_button.addEventListener('click', () => {
                        console.log(id_comm[i])
                        form_reponse_comm[i].classList.remove('none')
                        button_reply[i].classList.add('none')
                        button_cancel[i].classList.remove('none')
                        
                    })

                    cancel_button.addEventListener('click', () => {
                        form_reponse_comm[i].classList.add('none')
                        button_reply[i].classList.remove('none')
                        button_cancel[i].classList.add('none')
                    })
                }
            })
    }

    
    

    


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
                            if (data.cast[i].profile_path != null){
                                var cast = document.createElement('div')
        
                                cast.className = "scroll_card"
            
                                cast.innerHTML = `<a href="detail.php?person=${data.cast[i].id}"><img src="${config.image_base_url + data.cast[i].profile_path}" class="img-fluid" >
                                <p class="head_card">${data.cast[i].name}</p>
                                <p> Popularité : ${data.cast[i].popularity} </p></a>`
                                casting.appendChild(cast)
                            }
                            
                        }
                    } else {
                        for (let i = 0; i < 15; i++){
                            if (data.cast[i].profile_path != null){
                                var cast = document.createElement('div')
        
                                cast.className = "scroll_card"
            
                                cast.innerHTML = `<a href="detail.php?person=${data.cast[i].id}"><img src="${config.image_base_url + data.cast[i].profile_path}" class="img-fluid" >
                                <p class="head_card">${data.cast[i].name}</p>
                                <p> Popularité : ${data.cast[i].popularity} </p></a>`
                                casting.appendChild(cast)
                            }
                            
                        }
                    }
                    
                } else {
                    var cas = document.querySelector('.casting')
                    cas.style.display = "none"
                }
                
            })
    }
    


    function video(){
        
        fetch(`${BASE_URL}${type}/${element_id}/videos?api_key=${API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(data => {
                let trailer_container = document.querySelector('.trailer_container')

                let max_clips = (data.results.length > 7) ? 7 : data.results.length
                if (data.results.length > 0){
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

    

    function en_commun(){
        fetch(`${BASE_URL}${type}/${element_id}/similar?api_key=${API_KEY}&language=fr-FR`)
            .then(response => response.json())
            .then(data => {
                let container = document.querySelector('.recommendations')

                if (type == 'movie'){
                    for(let i = 0; i < 20; i++){
                        if (data.results[i].backdrop_path != null){
                            var film = document.createElement('div')
                            film.className = "scroll_card"
        
                            film.innerHTML = `<a href="detail.php?movie=${data.results[i].id}"><img src="${config.image_base_url + data.results[i].poster_path}" class="img-fluid" >
                            <p class="head_card">${data.results[i].release_date}</p><p>Avis : ${data.results[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`
        
                            container.appendChild(film)
                        }
                       
                    }
                } else if (type == "tv"){
                    for(let i = 0; i < 20; i++){
                        if (data.results[i].backdrop_path != null){
                            var film = document.createElement('div')
                            film.className = "scroll_card"
        
                            film.innerHTML = `<a href="detail.php?tv=${data.results[i].id}"><img src="${config.image_base_url + data.results[i].poster_path}" class="img-fluid" >
                            <p class="head_card">${data.results[i].first_air_date}</p><p>Avis : ${data.results[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`
        
                            container.appendChild(film)
                        }
                        
                    }
                }
                
            })
    }

})

    