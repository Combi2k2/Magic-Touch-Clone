const grass_layer = new Image();
grass_layer.src = "images/grass.png";
grass_layer.onload = function() {
    console.log("Grassed Loaded");
};

function render_Grass() {
    const w = 1918;
    const h = 300;

    const h_grass = game_canvas.height * 0.03;
    const w_grass = h_grass / h * w;

    for(let i = 0 ; i * w_grass < game_canvas.width ; ++i)
        game_ctx.drawImage(grass_layer,
            0, 315, w, h,                                               //  source
            i * w_grass, game_canvas.height - h_grass, w_grass, h_grass //  destination
        );

}