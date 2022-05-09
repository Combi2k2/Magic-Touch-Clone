const grass_layer = new Image();
grass_layer.src = "images/grass.png";
grass_layer.onload = function() {
    console.log("Grass Loaded");
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

const sky_layer = new Image();
sky_layer.onload = function()   {
    console.log("Sky loaded");
}
sky_layer.src = "images/sky.png"

const sky_insane_layer = new Image();
sky_insane_layer.onload = function()   {
    console.log("Sky loaded");
}
sky_insane_layer.src = "images/sky_insane.png"

function render_Sky()   {
    if (game_mode == 'Classic') {
        game_ctx.drawImage(sky_layer,
            0, 0,
            game_canvas.width,
            game_canvas.height);
    } else {
        
    game_ctx.drawImage(sky_insane_layer,
        0, 0,
        game_canvas.width,
        game_canvas.height);
    }
}

const city_layer = new Image();
city_layer.src = "images/city.png";
city_layer.onload = function()  {
    console.log("City loaded");
}

function render_City()  {
    if (game_mode == 'Insane')
        return;
    
    const w = 1150;
    const h = 340;

    const h_city = game_canvas.height * 0.2;
    const w_city = h_city / h * w;

    for(let i = 0 ; i * w_city < game_canvas.width ; ++i)
        game_ctx.drawImage(city_layer,
            25, 400, w, h,                                          //  source
            i * w_city, game_canvas.height - h_city, w_city, h_city //  destination
        );
}