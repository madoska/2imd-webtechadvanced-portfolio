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
        console.log(result);
    }
    
    fetchLocationFailed(err) {
        console.log(err);
    }
}

let app = new App();