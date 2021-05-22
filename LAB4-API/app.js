class App {
    constructor() {
        var localStorage = window.localStorage.length;

        if (localStorage === 0) {
            this.getLocation();
        } else {
            this.generateAd();
        }
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
        const baseUrl = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?";
        const apiKey = "840cba60f6c94296f5869989ee855d97";
        const unit = "metric";
        const url = `${baseUrl}lat=${lat}&lon=${long}&APPID=${apiKey}&units=${unit}`;

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
    }

    saveWeatherToLocalstorage(temp) {
        localStorage.setItem('temp', JSON.stringify(temp));
    }

    generateAd() {
        let temp = JSON.parse(localStorage.getItem('temp'));
        console.log(temp);
    }

    fetchLocationFailed(err) {
        console.log(err);
    }
}

let app = new App();