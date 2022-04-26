let rockets = [];
let score = 0;

function Game(mode) {
    let interval = null;
    let velocity = null;
    let interval_threshold = 300;
    
    if (mode == 'Classic')  {
        interval = 2000;
        speed_rocket = 3;
    }
    if (mode == 'Insane')   {
        interval = 1500;
        velocity = 60;
        interval_threshold = 200;
        speed_rocket = 5;
    }

    function genRocket()    {
        let x = Math.floor(Math.random() * game_canvas.width);
        let y = 0;
        let No = Math.floor(Math.random() * 10);
        
        var R = new rocket(x, y, No);
        rockets.push(R);
        R.display_rocket();
        
        setTimeout(genRocket, Math.max(interval_threshold, interval - Math.floor(score / 3) * velocity));
    }
    genRocket();
}

Game('Classic')