class App {
    constructor() {
        this.getLocation();
        this.lat;
        this.long;
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
        const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
        const apiKey = "840cba60f6c94296f5869989ee855d97";
        const unit = "metric";
        const url = `${baseUrl}lat=${lat}&lon=${long}&APPID=${apiKey}&units=${unit}`;
        
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(json => {
                let temp = json.main['temp'];
                console.log(temp);
            })
            .catch(err => {
                console.log(err);
            });
    }

    saveWeatherToLocalstorage(data){
        let storeWeather = [];
        storeWeather = JSON.parse(localStorage.getItem('weather')) || [];
        storeWeather.push(data);
        localStorage.setItem('weather', JSON.stringify(storeWeather));
    }

    fetchLocationFailed(err) {
        console.log(err);
    }
}

let app = new App();