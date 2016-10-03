app.directive('clock', function() {
    return {
        restrict: 'EAC',
        scope: {
            width: '=',
            height: '=',
            type: '='
        },
        templateUrl: 'view/directives/clock.html',
        link: function() {
            init();

            function init() {
                var stage = new createjs.Stage("canvasClock");
                var sec = 1000;
                var min = sec * 60;
                var hour = min * 60;
                var now = moment.duration(moment().format('H:m:s'));

                var clock = new createjs.Shape();
                clock.graphics.beginStroke("#2A3644").setStrokeStyle(5).drawCircle(75, 75, 70);

                var hourHand = new createjs.Shape();
                hourHand.graphics.beginFill("#2A3644").drawRoundRect(0, 0, 50, 4, 0);
                hourHand.regX = 12;
                hourHand.regY = 2;
                hourHand.x = 75;
                hourHand.y =  75;
                hourHand.rotation = timeToDegree(now.asHours(), true);

                var minuteHand = new createjs.Shape();
                minuteHand.graphics.beginFill("#38445C").drawRoundRect(0, 0, 65, 2, 0);
                minuteHand.regX = 11;
                minuteHand.regY = 1;
                minuteHand.x = 75;
                minuteHand.y = 75;
                minuteHand.rotation = timeToDegree(now.minutes());

                stage.addChild(clock);
                stage.addChild(hourHand);
                stage.addChild(minuteHand);

                createjs.Tween.get(hourHand, {loop: true})
                    .to({rotation: hourHand.rotation + 360}, 12 * hour)
                ;
                createjs.Tween.get(minuteHand, {loop: true})
                    .to({rotation: minuteHand.rotation + 360}, 60 * min)
                ;

                createjs.Ticker.setFPS(24);
                createjs.Ticker.addEventListener("tick", stage);
            }

            function timeToDegree(time, isHour)
            {
                var factor = (typeof isHour != 'undefined' && isHour == true) ? 30 : 6;
                var value = (time * factor) -90;
                return oneTo360(value);
            }

            function oneTo360(degree)
            {
                if (degree < 0) {
                    return 360 + degree;
                } else
                if (degree > 360) {
                    return degree - 360;
                } else
                    return degree;
            }
        }
    };
});