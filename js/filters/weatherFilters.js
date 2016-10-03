/**
 * Transform the wind to beaufort scale
 */
app.filter('windBeaufort', function() {
    return function(value, field) {
        var beaufort;

        if (value == 'N/A') {
            beaufort = windToBeaufort(null);
            return beaufort[field];
        }

        if (typeof value != 'undefined') {
            var kph = value * 1.60934;
            beaufort = windToBeaufort(kph);
            return beaufort[field];
        }
    }
});

/**
 * Transform the icon from openWeatherMap to wi icons
 */
app.filter('toWiIcon', function() {
    return function(icon) {
        if (icon) {

            switch(icon) {
                case '01d':
                    return 'wi-day-sunny';
                    break;
                case '02d':
                    return 'wi-day-sunny-overcast';
                    break;
                case '03d':
                    return 'wi-cloudy';
                    break;
                case '04d':
                    return 'wi-cloudy';
                    break;
                case '09d':
                    return 'wi-day-showers';
                    break;
                case '10d':
                    return 'wi-rain';
                    break;
                case '11d':
                    return 'wi-thunderstorm';
                    break;
                case '13d':
                    return 'wi-day-snow';
                    break;
                case '50d':
                    return 'wi-day-fog';
                    break;
                case 'N/A':
                    return 'wi-na';
                    break;
            }

            switch(icon) {
                case '01n':
                    return 'wi-night-clear';
                    break;
                case '02n':
                    return 'wi-night-alt-partly-cloudy';
                    break;
                case '03n':
                    return 'wi-cloudy';
                    break;
                case '04n':
                    return 'wi-cloudy';
                    break;
                case '09n':
                    return 'wi-night-alt-showers';
                    break;
                case '10n':
                    return 'wi-rain';
                    break;
                case '11n':
                    return 'wi-thunderstorm';
                    break;
                case '13n':
                    return 'wi-night-alt-snow';
                    break;
                case '50n':
                    return 'wi-night-fog';
                    break;
                case 'N/A':
                    return 'wi-na';
                    break;
            }
        }
    }
});

/**
 * To kilometers per hour
 */
app.filter('toKph', function($filter) {
    return function(value) {
        if (value) {
            var kph = value * 1.60934;
            return $filter('number')(kph, 2);
        }
    }
});

/**
 * Unix to Date
 */
app.filter('toDate', function() {
    return function(value, format) {
        if (value == 0) {
            return 'N/A';
        }

        if (value) {
            var m = moment.unix(value);

            if (!format) {
                format = 'HH:mm'
            }
            
            return m.format(format);
        }
    }
});