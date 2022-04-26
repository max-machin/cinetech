window.addEventListener("DOMContentLoaded", (event) => { 
    const config = {
        api_key: '7c30e92027c202407878367905bafe52',
        api_base_url: 'https://api.themoviedb.org/3/',
        image_base_url: 'https://image.tmdb.org/t/p/w1280'
    }

    const BASE_URL = config.api_base_url
    const API_KEY = config.api_key

    async function getPopularMovies(page = 1) {
        let data = []
        try {
            const response = await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`)
            const responseData = await response.json()
            data = responseData?.results
        } catch (error) {
            
        }
        return data
    }
})