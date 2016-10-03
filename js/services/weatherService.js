app.factory('weatherService', ['$http', function($http) {
    this.apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
    this.apiKey = 'd287eb252e3085324c4ff2a0e461d983';

    this.serialize = function(obj) {
        var str = [];
        for(var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };

    return {
        getWeatherByCoordinates: function(latitude, longitude) {

            var queryString = {
                appid: this.apiKey,
                lat: latitude,
                log: longitude,
                units: 'metric'
            };

            return $http.get(this.apiUrl + '?' + this.serialize(queryString))
                .success(function(result) {
                    return result;
                })
                .error(function(err) {
                    return err;
                });
        }.bind(this),

        getWeatherByQuery: function(query) {

            var queryString = {
                appid: this.apiKey,
                q: query,
                units: 'metric'
            };

            return $http.get(this.apiUrl + '?' + this.serialize(queryString))
                .success(function(result) {
                    return result;
                })
                .error(function(err) {
                    return err;
                });
        }.bind(this),

        getWeatherByCityId: function(cityId) {

            var queryString = {
                appid: this.apiKey,
                id: cityId,
                units: 'metric'
            };

            return $http.get(this.apiUrl + '?' + this.serialize(queryString))
                .success(function(result) {
                    return result;
                })
                .error(function(err) {
                    return err;
                });
        }.bind(this)
    };
}]);