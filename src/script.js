let explosions = null;
let score = null;

let interval_genRocket = null;
let velocity_genRocket = null;
const interval_genRocket_threshold = 200;

let no_frame_explosion_on_air = 6

function GameStart(mode)    {
    rockets = [];
    explosions = [];
    score = 0;

    for(let i = 0 ; i < 10 ; ++i)
        rockets.push([]);
    
    interval_genRocket = (mode == 'Classic') ? 2000 : 1500;
    velocity_genRocket = (mode == 'Classic') ? 40 : 60;
}
function level()    {
    return  Math.floor(score / 5);
}
let last_genRocket = null;

function gameRender()   {
    let cur_time = Date.now();
    if (cur_time - last_genRocket > Math.max(interval_genRocket - velocity_genRocket * level(), interval_genRocket_threshold))  {
        last_genRocket = cur_time;
        genRocket();
    }
    game_ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);

    if (prediction != null) {
        for(let R of rockets[prediction])
            R.explosion_level = 0;
        
        prediction = null;
    }
    for(let i = 0 ; i < 10 ; ++i)   {
        for(let j = 0 ; j < rockets[i].length ; ++j)    {
            rockets[i][j].y += 2;
            rockets[i][j].explosion_level++;
        }
        for(let j = 0 ; j < rockets[i].length ; ++j)    {
            let R = rockets[i][j];
            if (R.explosion_level > 6)  rockets[i].splice(j--, 1);
            if (R.y + 180 > game_canvas.height) {
                display_mushroom_explosion([R.x, R.y + 180]);
                return;
            }
            if (R.explosion_level < 0)  game_ctx.drawImage(rocket_images[i], R.x, R.y);
            else                        display_sprite_explosion([R.x, R.y], R.explosion_level);
        }
    }
    setTimeout(gameRender, 50);
}
function Game(mode) {
    last_genRocket = Date.now() - 2000;

    GameStart(mode);
    gameRender();
}
display_mushroom_explosion([400, 500]);
//Game('Classic');
//Game();