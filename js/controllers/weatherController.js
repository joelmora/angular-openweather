app.controller('weatherController', ['$scope', '$http', 'weatherService', '$timeout', function($scope, $http, weatherService, $timeout) {

    $scope.disableCitySearch = true;
    $scope.errorShowing = false;
    $scope.placeholderCitySearch = 'Loading cities...';

    //default values
    $scope.weather = {
        'weather': [{
            'main': 'N/A',
            'description': 'N/A',
            'icon': 'N/A'
        }],
        'main': {
            'temp': 0,
            'temp_min': 0,
            'temp_max': 0
        },
        'wind': {
            'speed': 'N/A'
        },
        'rain': {
            '3h': 0
        },
        'sys': {
            'country': '',
            'sunrise': 0,
            'sunset': 0
        },
        'name': 'N/A'
    };

    //watch selected city
    $scope.$watch('selectedCity', function(citySelected)
    {
        $scope.selectedCity = citySelected;

        if (citySelected) {
            if (citySelected.originalObject.id) {
                weatherService.getWeatherByCityId(citySelected.originalObject.id)
                    .success(this.weatherSuccessCallback)
                    .error(this.weatherErrorCallback);
            } else {
                weatherService.getWeatherByQuery(citySelected.originalObject)
                    .success(this.weatherSuccessCallback)
                    .error(this.weatherErrorCallback);
            }
        }
    }.bind(this));

    $scope.getHour = function()
    {
        return moment().format('HH:mm');
    };

    //get the wind icon according to beaufort scale
    $scope.getBeaufortIcon = function()
    {
        if ($scope.weather.wind.speed == 'N/A') {
            return 'wi-na';
        }

        var beaufort = windToBeaufort($scope.weather.wind.speed);

        return 'wi-wind-beaufort-' + beaufort.force;
    };

    //get the coordinates from the browser
    this.getBrowserLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.locationFound);
        }
    };

    //if location from the browser was successful
    this.locationFound = function(position)
    {
        weatherService.getWeatherByCoordinates(position.coords.latitude, position.coords.longitude)
            .success(this.weatherSuccessCallback)
            .error(this.weatherErrorCallback);
    }.bind(this);

    this.weatherSuccessCallback = function(data)
    {
        if (data.cod != 200) {
            this.showMessage(data.message);
        } else {
            $scope.weather = data;
        }
    }.bind(this);

    //weatherError
    this.weatherErrorCallback = function(error)
    {
        this.showMessage(error.message);
    }.bind(this);

    //show message to the client
    this.showMessage = function(msg)
    {
        $scope.errorMessage = msg;
        $scope.errorShowing = true;

        $timeout(function () {
            $scope.errorShowing = false;
        }, 5000);
    };

    //load open weather city list on load
    $http.get('json/city.list.json').then(function(res)
    {
        $scope.cities = res.data;
        $scope.disableCitySearch = false;
        $scope.placeholderCitySearch = 'Search by City, Country or Zip Code';
    });

    //get browser location on load
    this.getBrowserLocation();
}]);


/**
 * Wind is Km/h to beaufort scale
 * @param wind
 * @returns {*}
 */
function windToBeaufort(wind)
{
    if (wind === null) {
        return {'force': 'X', 'description': 'N/A'}
    } else if (wind < 1) {
        return {'force': 0, 'description': 'Calm'}
    } else if (wind >= 1 && wind < 6) {
        return {'force': 1, 'description': 'Light Air'}
    } else if (wind >= 6 && wind < 12) {
        return {'force': 2, 'description': 'Light Breeze'}
    } else if (wind >= 12 && wind < 20) {
        return {'force': 3, 'description': 'Gentle Breeze'}
    } else if (wind >= 20 && wind < 29) {
        return {'force': 4, 'description': 'Moderate Breeze'}
    } else if (wind >= 29 && wind < 39) {
        return {'force': 5, 'description': 'Fresh Breeze'}
    } else if (wind >= 39 && wind < 50) {
        return {'force': 6, 'description': 'Strong Breeze'}
    } else if (wind >= 50 && wind < 62) {
        return {'force': 7, 'description': 'Near Gale'}
    } else if (wind >= 62 && wind < 75) {
        return {'force': 8, 'description': 'Gale'}
    } else if (wind >= 75 && wind < 89) {
        return {'force': 9, 'description': 'Strong Gale'}
    } else if (wind >= 89 && wind < 103) {
        return {'force': 10, 'description': 'Storm'}
    } else if (wind >= 103 && wind < 108) {
        return {'force': 11, 'description': 'Violent Storm'}
    } else if (wind >= 108) {
        return {'force': 12, 'description': 'Hurricane'}
    }
}