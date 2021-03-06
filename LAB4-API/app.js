class App {
    constructor() {
        this.getLocation();
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(this.fetchLocationSuccess.bind(this), this.fetchLocationFailed.bind(this));
    }

    fetchLocationSuccess(result) {
        this.lat = result.coords.latitude;
        this.long = result.coords.longitude;
        this.getWeather(this.lat, this.long);
    }

    getWeather(lat, long) {
        const baseUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?";
        const apiKey = "840cba60f6c94296f5869989ee855d97";
        const unit = "metric";
        const url = `${baseUrl}lat=${lat}&lon=${long}&APPID=${apiKey}&units=${unit}`;

        var localStorage = window.localStorage.length;

        if (localStorage === 0) {
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    let temp = json.main['temp'];
                    this.saveWeatherToLocalstorage(temp);
                    this.generateAd();
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            this.generateAd();
        }

    }

    saveWeatherToLocalstorage(temp) {
        localStorage.setItem('temp', JSON.stringify(temp));
    }

    generateAd() {
        let temp = JSON.parse(localStorage.getItem('temp'));
        document.getElementById('temp').innerHTML = temp;

        if(temp < 20){
            document.getElementById('desc').innerHTML = "Get your blood pumping with";
        } else {
            document.getElementById('desc').innerHTML = "Catch the summer vibes with";
        }

        this.getMovie(temp);
    }

    getMovie(temp){
        const omdbUrl = "https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?";
        const omdbKey = "5f42cc82";
        let movie;

        if(temp < 20){
            movie = "hereditary";
        } else {
            movie = "kings+of+summer";
        }

        let url = `${omdbUrl}apikey=${omdbKey}&t=${movie}`;
        
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json => {
            let title = json.Title;
            let poster = json.Poster;
            
            this.saveMovieToLocalStorage(title, poster);
            this.addPosterToAd();
        })
        .catch(err => {
            console.log(err);
        });
    }

    saveMovieToLocalStorage(title, poster){
        localStorage.setItem('movieTitle', JSON.stringify(title));
        localStorage.setItem('moviePoster', JSON.stringify(poster));
    }

    addPosterToAd(){
        let title = JSON.parse(localStorage.getItem('movieTitle'));
        let poster = JSON.parse(localStorage.getItem('moviePoster'));
        document.getElementById('movie').innerHTML = title;
        document.getElementById('poster').innerHTML = `<img src="${poster}">`;
    }

    fetchLocationFailed(err) {
        console.log(err);
    }
}

let app = new App();