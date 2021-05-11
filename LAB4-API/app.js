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
        let location = [this.lat, this.long];
        this.getWeather(location);
    }

    getWeather(location) {
        const baseUrl = "https://api.tomorrow.io/v4/timelines";
        const apiKey = "UCuDjOGkeJ11ItScQ18n8ZIQA7OtbdOC";
        const timestep = "current";
        const field = "temperature";
        const unit = "metric";
        const timezone = "Europe/Brussels";
        const url = `${baseUrl}?location=${location}&fields=${field}&timesteps=${timestep}&timezone=${timezone}&units=${unit}&apikey=${apiKey}`;
        
        fetch(url)
            .then(response => {
                console.log(response);
                response.json;
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    fetchLocationFailed(err) {
        console.log(err);
    }
}

let app = new App();