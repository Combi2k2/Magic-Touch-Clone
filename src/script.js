let rockets = null;
let score = null;

let interval_genRocket = null;
let velocity_genRocket = null;
const interval_genRocket_threshold = 200;

let interval_render = null;
let velocity_render = null;
const interval_render_threshold = 40;

function GameStart(mode)    {
    rockets = [];
    score = 0;

    for(let i = 0 ; i < 10 ; ++i)
        rockets.push([]);
    
    interval_genRocket = (mode == 'Classic') ? 2000 : 1500;
    velocity_genRocket = (mode == 'Classic') ? 40 : 60;

    interval_render = (mode == 'Classic') ? 100 : 70;
    velocity_render = (mode == 'Classic') ? 4 : 6;
}
function level()    {
    return  Math.function(score / 5);
}

function Game() {
    function genRocket()    {
        var R = new Rocket();
        var i = Math.floor(Math.random() * 10);

        rockets[i].push(R);
    }
    function gameRender()   {
        game_ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);

        for(let i = 0 ; i < 10 ; ++i)
        for(let j = 0 ; j < rockets[i].length ; ++j)    {
            let R = rockets[i][j];
            game_ctx.drawImage(rocket_image[i], R.x, R.y);
            rockets[i][j].y += speed_rocket;

            if (rockets[i][j].y >= game_canvas.height)  {
                rockets[i].splice(j, 1);
                j--;
            }
        }
    }
    let last_genRocket  = Date.now();
    let last_gameRender = Date.now();

    while (1)   {
        let cur_time = Date.now();
        if (cur_time - last_genRocket  >= Math.max(interval_genRocket - velocity_genRocket * level(), interval_genRocket_threshold))    {
            last_genRocket = cur_time;
            genRocket();
        }
        if (cur_time - last_gameRender >= Math.max(interval_render - velocity_render * level(), interval_render_threshold)) {
            last_gameRender = cur_time;
            gameRender();
        }
    }
}
GameStart('Classic');
console.log("Combi");
console.log(rocket_image.length);
//Game();