let score = 0;
let level = () =>   {   return  Math.floor(score / 5);  }

let interval_genRocket = null;
let velocity_genRocket = null;
const interval_genRocket_threshold = 200;

function GameStart(mode)    {
    rockets = [];
    score = 0;
    isPaused = 0;

    for(let i = 0 ; i < 10 ; ++i)
        rockets.push([]);
    
    interval_genRocket = (mode == 'Classic') ? 2000 : 1500;
    velocity_genRocket = (mode == 'Classic') ? 40 : 60;
}
function GameLose() {
    function explode(idx_explosion = 0) {
        if (idx_explosion > 19)
            return;
        
        game_ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);
        
        render_Sky();
        render_City();
        render_mushroom_explosion(idx_explosion);
        render_Grass();

        game_ctx.fillStyle = `rgba(255,0,0,${0.02 * idx_explosion})`;
        game_ctx.fillRect(0, 0, game_canvas.width, game_canvas.height);
        
        setTimeout(() =>    {
            window.requestAnimationFrame(() =>  {
                explode(idx_explosion + 1);
            });
        }, 75);

        // game_canvas_container = document.querySelector(".game-canvas.container")
        // game_canvas_c
        // setTimeout(() => {
        //     explode(idx_explosion + 1);
        // }, 75);
    }
    explode();
}
let time_elapsed = 0;
let time_mock = null;

function gameRender()   {
    if (isPaused)   return;
    game_canvas_setup();

    let cur_time = Date.now();
    let cur_interval = Math.max(interval_genRocket - velocity_genRocket * level(), interval_genRocket_threshold);

    time_elapsed += cur_time - time_mock;
    time_mock = cur_time;

    if (time_elapsed > cur_interval)    {
        time_elapsed = 0;
        genRocket();
    }
    game_ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);

    render_Sky();
    render_City();
    move_Rockets();


    if (render_Rockets())   {
        render_Grass();
        //window.requestAnimationFrame(gameRender);
        setTimeout(gameRender, 25);
    }
    else
        GameLose();
}
function Game(mode) {
    time_mock = Date.now() - 2000;

    GameStart(mode);
    gameRender();
}
Game('Classic');