let score = 0;
let level = () =>   {   return  Math.floor(score / 5);  }

let interval_genRocket = null;
let velocity_genRocket = null;
const interval_genRocket_threshold = 200;

function GameStart(mode)    {
    rockets = Array.from(Array(10), () => []);
    score = 0;
    document.querySelector("#score").textContent = 0;
    isPaused = 0;
    exploded = false;
    
    console.log(mode)
    interval_genRocket = (mode == 'Classic') ? 2000 : 1500;
    velocity_genRocket = (mode == 'Classic') ? 40 : 60;
}

losingTimeoutId = null;
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
        
        if (replayed)
            return;

        losingTimeoutId = setTimeout(() =>    {
                explode(idx_explosion + 1);
        }, 75);
    }
    exploded = true;
    explode();

}
let time_elapsed = 0;
let time_mock = null;
let game_mode = ''

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
    else    {
        GameLose();
        updateLeaderboard(game_mode, score);
        leaderboard = LeaderboardElement(game_mode);

        let overlay = document.createElement("div")
        overlay.classList += "overlay"
        document.body.appendChild(overlay)
        
        let dashboard = document.createElement("div");
        dashboard.classList += "dashboard";
        
        dashboard.appendChild(leaderboard);
        dashboard.appendChild(replayButton);
        dashboard.appendChild(menuButton);
        document.body.appendChild(dashboard);

        replayed = false;
    }
}

function Game(mode) {
    //game_mode = mode;
    time_mock = Date.now() - 2000;

    GameStart(mode);
    gameRender();
}

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
game_mode = params.mode; // "some_value"
Game(game_mode)