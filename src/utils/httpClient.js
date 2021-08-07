const API = "https://api.themoviedb.org/3";

export function get(path, secondaryParam, page, location){
    let queryString = API;

    if(path == "/discover/movie/"){
        page = "?page=" + page;
        queryString = queryString + path + page;
        if(location == "/" || secondaryParam == 0){
            secondaryParam = null;
        }
        if(secondaryParam != null){
            //Filter for genre.
            secondaryParam = "&with_genres=" + secondaryParam;
            queryString = queryString + secondaryParam
        }
    }

    //Movie.
    if(path == "/movie/"){
        queryString = queryString + path + secondaryParam
    }

    //Search.
    if(path == "/search/movie?query="){
        path = path + secondaryParam;
        page = "&page=" + page;
        queryString = queryString + path + page;
    }

    //List of genres.
    if(path == "/genre/movie/list"){
        queryString = queryString + path
    }

    //Query.
    return fetch(queryString, {
        headers: {
            Authorization: 
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmMzNjMyOWJmOTJlMWYwMTIyNzllODBjZGIzOWIyNyIsInN1YiI6IjYwZjE5NTE0YTliOWE0MDA3ZmExYjNhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x2FZP5olxEpIgEMqchlMi7eviXatE70cUs2LCtpIxU8",
            "Content-Type": 
                "application/json;charset=utf-8",
        },
    }).then(result => result.json())
}