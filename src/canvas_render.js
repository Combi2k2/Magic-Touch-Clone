const game_canvas = document.getElementById('game-canvas');
const game_ctx = game_canvas.getContext('2d');

function game_canvas_setup()    {
    game_canvas.width  = window.innerWidth  * 0.75;
    game_canvas.height = window.innerHeight * 0.95;
}
game_canvas_setup();
