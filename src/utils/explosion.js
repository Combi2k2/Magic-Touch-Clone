const img_explosion = new Image();
img_explosion.src = "images/explode_in_sky.png";
img_explosion.onload = console.log("Explosion Loaded");

function display_sprite_explosion_in_sky(explosion_position, idx_explosion = 0) {
    let pos_x = explosion_position[0];
    let pos_y = explosion_position[1];
    
    // there is 7 explosion images - return after

    if (idx_explosion > 2)  game_ctx.clearRect(pos_x, pos_y, 200, 200);
    if (idx_explosion > 6)  return;
    
    // the (x,y)-offset of the current image
    const offset_x = idx_explosion%5;
    const offset_y = Math.floor(idx_explosion/5);

    const w = 192; // width
    const h = 192; // height

    game_ctx.drawImage(img_explosion, 
        offset_x*w, offset_y*h, w, h, // source
        pos_x, pos_y, 180, 180        // destination
    ); 

    // Display animation
    setTimeout(() => {
        display_sprite_explosion_in_sky(explosion_position, idx_explosion + 1);
    }, 200);
}

//display_sprite_explosion([50, 50]);