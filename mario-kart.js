(function () {
    'use strict';
    //12
    function LoadImage() {
        return new Promise(function (Resolve, Reject) {
            var image = new Image(384, 240);
            image.addEventListener("load", function (evt) {
                if (image.complete) {
                    Resolve(image);
                }
            })
            image.src = "toad.png";
        });
    }
    var img;
    var rotation = 0;
    var position = {
        x: 0,
        y: 0
    };
    var speed = {
        x: 0,
        y: 0
    };
    var maxSpeed = {
        x: 100 / 60,
        y: 100 / 60
    };
    var acceleration = {
        x: 100 / (60 * 5),
        y: 100 / (60 * 5)
    };
    LoadImage().then(function (image) {
        img = image;
        frameId = window.requestAnimationFrame(FrameStep);

        console.log(image);
    });




    var container = document.getElementById('canvas-container');
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    container.appendChild(canvas);

    var accelMult = {
        x: 0,
        y: 0
    };
    document.body.addEventListener('keydown', function (evt) {
        evt.preventDefault(true);
        var keyCode = evt.keyCode;
        console.log(keyCode);
        switch (keyCode) {
        case 37:
            accelMult.x = -1;
            break;
        case 38:
            accelMult.y = -1;
            break;
        case 39:
            accelMult.x = 1;
            break;
        case 40:
            accelMult.y = 1;
            break;
        }
    });
    document.body.addEventListener('keyup', function (evt) {
        evt.preventDefault(true);
        var keyCode = evt.keyCode;
        switch (keyCode) {
        case 37:
            accelMult.x = 0;
            break;
        case 38:
            accelMult.y = 0;
            break;
        case 39:
            accelMult.x = 0;
            break;
        case 40:
            accelMult.y = 0;
            break;
        }
    });

    function CalculateNumbers(timestep) {
        var accelerationX = acceleration.x * accelMult.x;
        var accelerationY = acceleration.y * accelMult.y;
        speed.x += accelerationX;
        speed.y += accelerationY;

        if (speed.x < -maxSpeed.x)
            speed.x = -maxSpeed.x;
        else if (speed.x > maxSpeed.x)
            speed.x = maxSpeed.x;

        if (speed.y < -maxSpeed.y)
            speed.y = -maxSpeed.y;
        else if (speed.y > maxSpeed.y)
            speed.y = maxSpeed.y;

        position.x += speed.x;
        position.y += speed.y;
    }
    var frameId;

    function FrameStep(timestep) {
        frameId = window.requestAnimationFrame(FrameStep);
        --canvas.height;
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        CalculateNumbers(timestep);
        ctx.drawImage(img, 32 * rotation, 31, 32, 32, position.x, position.y, 32, 32);
    }


}());