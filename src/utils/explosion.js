const img_explosion = new Image();
img_explosion.src = "images/explode_in_sky.png";
img_explosion.onload = console.log("Explosion Loaded");

function display_sprite_explosion(explosion_position, idx_explosion = 0)    {
    let pos_x = explosion_position[0];
    let pos_y = explosion_position[1];
    
    // there is 7 explosion images - return after
    if (idx_explosion > 6)
        return;

    const w = 192; // width
    const h = 192; // height
    
    // the (x,y)-offset of the current image
    const offset_x = (idx_explosion % 5) * w;
    const offset_y = Math.floor(idx_explosion / 5) * h;

    game_ctx.drawImage(img_explosion, 
        offset_x, offset_y, w, h,   // source
        pos_x, pos_y,
        missle_width,
        missle_height   // destination
    );
    // setTimeout(() => {
    //     display_sprite_explosion(explosion_position, idx_explosion + 1);
    // }, 16);
}

//  when the missile hits the ground, you lose and a mushroom explosion will happen.
const img_mushroom_explosion = new Image();

img_mushroom_explosion.src = "images/explode_on_ground.png";
img_mushroom_explosion.onload = console.log("Mushroom Explosion Loaded");

//  console.log(img_mushroom_explosion.naturalWidth);   //  1556
//  console.log(img_mushroom_explosion.naturalHeight);  //  971

function display_mushroom_explosion(idx_explosion = 0)  {   // display mushroom explosion at the middle bottom of the canvas
    let w = 318;    // width
    let h = 224;    // height

    if (idx_explosion < 5)  h = 75;
    if (idx_explosion > 24) return; // there is 25 explosion images - return after

    //  scale of explosion depend on the window
    const explosion_width  = game_canvas.width * 0.5;
    const explosion_height = explosion_width / w * h;
    
    //  position of the explosion is away at the bottom middle
    const pos_x = game_canvas.width / 2 - explosion_width / 2;
    const pos_y = game_canvas.height - explosion_height;
    
    game_ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);
    
    // the (x,y)-offset of the current image
    const offset_x = (idx_explosion % 5) * w;
    const offset_y = Math.max(Math.floor(idx_explosion / 5) * 224 - 224 + 75, 0);

    game_ctx.drawImage(img_mushroom_explosion,
        offset_x, offset_y, w, h,   // source
        pos_x, pos_y,
        explosion_width,
        explosion_height    // destination
    );
    setTimeout(function()   {
        display_mushroom_explosion(idx_explosion + 1);
    }, 100);
}
//  display_mushroom_explosion([100, 400], 0);